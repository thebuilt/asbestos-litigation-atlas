"use strict";

const { get, put } = require("@vercel/blob");

const SEARCH_PAGE_SIZE = 100;
const MAX_PAGES_PER_QUERY = 20;
const SHARED_CACHE_TTL_HOURS = 24;

const asbestosQuery =
  '(asbestos OR mesothelioma OR asbestosis OR chrysotile OR amosite OR crocidolite OR tremolite OR actinolite OR anthophyllite)';
const mesotheliomaQuery =
  '("mesothelioma" OR "pleural mesothelioma" OR "peritoneal mesothelioma" OR "malignant mesothelioma")';
const intentQuery =
  '((asbestos OR mesothelioma OR asbestosis) AND (exposure OR occupational OR workplace OR product OR premises OR "failure to warn" OR "wrongful death" OR "personal injury" OR "take-home" OR talc OR vermiculite OR brake OR insulation))';

const exposureTypeRules = [
  { label: "occupational exposure", patterns: [/occupational/i, /workplace/i, /on the job/i, /personal injury/i] },
  { label: "take-home / secondary exposure", patterns: [/take-home/i, /secondary exposure/i, /household/i, /laundering/i, /spouse/i, /family member/i] },
  { label: "consumer exposure", patterns: [/consumer/i, /talc/i, /cosmetic/i, /household product/i] },
  { label: "environmental / community exposure", patterns: [/community/i, /environmental/i, /vermiculite/i, /processing facility/i, /contamination/i] },
  { label: "maritime / naval exposure", patterns: [/shipyard/i, /navy/i, /engine room/i, /boiler room/i, /shipboard/i] },
  { label: "construction / renovation exposure", patterns: [/construction/i, /renovation/i, /demolition/i, /abatement/i, /school/i] },
  { label: "automotive friction exposure", patterns: [/brake/i, /friction/i, /garage/i, /mechanic/i] },
  { label: "industrial maintenance exposure", patterns: [/refinery/i, /maintenance/i, /chemical plant/i, /boiler/i, /turnaround/i] },
  { label: "mining / milling exposure", patterns: [/miner/i, /mining/i, /milling/i] }
];

const materialCategoryRules = [
  { label: "thermal insulation", patterns: [/thermal insulation/i, /block insulation/i, /\binsulation\b/i] },
  { label: "pipe insulation / covering", patterns: [/pipe insulation/i, /pipe covering/i] },
  { label: "boiler and turbine insulation", patterns: [/boiler insulation/i, /turbine insulation/i, /boiler room/i] },
  { label: "gaskets and packing", patterns: [/\bgaskets?\b/i, /\bpacking\b/i, /valve packing/i] },
  { label: "joint compound and drywall", patterns: [/joint compound/i, /drywall/i] },
  { label: "flooring and ceiling materials", patterns: [/floor tiles?/i, /ceiling panels?/i, /ceiling tiles?/i] },
  { label: "sprayed fireproofing", patterns: [/sprayed fireproofing/i, /fireproofing/i] },
  { label: "friction products", patterns: [/brake linings/i, /brake shoes/i, /friction products?/i, /\bbrake\b/i, /\bclutch\b/i] },
  { label: "talc products", patterns: [/\btalc\b/i] },
  { label: "vermiculite products", patterns: [/\bvermiculite\b/i] },
  { label: "refractory and cement products", patterns: [/refractory/i, /cement siding/i, /cement pipe/i] },
  { label: "roofing and siding products", patterns: [/roofing shingles/i, /siding/i] }
];

const occupationRules = [
  { label: "insulator", patterns: [/\binsulator\b/i] },
  { label: "pipefitter / steamfitter", patterns: [/\bpipefitter\b/i, /\bsteamfitter\b/i] },
  { label: "boilermaker", patterns: [/\bboilermaker\b/i] },
  { label: "electrician", patterns: [/\belectrician\b/i, /electrician apprentice/i] },
  { label: "mechanic / machinist", patterns: [/\bmechanic\b/i, /\bmachinist\b/i, /machinist mate/i, /auto mechanic/i, /rail mechanic/i] },
  { label: "miner", patterns: [/\bminer\b/i, /\bmining\b/i] },
  { label: "millwright", patterns: [/\bmillwright\b/i] },
  { label: "laborer", patterns: [/\blaborer\b/i] },
  { label: "welder", patterns: [/\bwelder\b/i] },
  { label: "plumber", patterns: [/\bplumber\b/i] },
  { label: "carpenter / roofer", patterns: [/\bcarpenter\b/i, /\broofer\b/i] },
  { label: "construction worker", patterns: [/construction worker/i] },
  { label: "shipyard worker", patterns: [/shipyard worker/i] },
  { label: "refinery worker", patterns: [/refinery worker/i] },
  { label: "abatement worker", patterns: [/abatement worker/i] },
  { label: "custodian / maintenance", patterns: [/\bcustodian\b/i, /maintenance worker/i, /maintenance mechanic/i] },
  { label: "teacher", patterns: [/\bteacher\b/i] }
];

const industryRules = [
  { label: "construction and building products", patterns: [/construction/i, /drywall/i, /joint compound/i, /roofing/i, /siding/i, /floor tiles?/i] },
  { label: "maritime and shipbuilding", patterns: [/shipyard/i, /shipboard/i, /navy/i, /maritime/i, /engine room/i] },
  { label: "automotive and friction products", patterns: [/brake/i, /friction/i, /automotive/i, /garage/i, /clutch/i] },
  { label: "mining and minerals", patterns: [/mining/i, /miner/i, /vermiculite/i, /talc/i, /milling/i] },
  { label: "oil, gas, and refining", patterns: [/refinery/i, /chemical plant/i, /turnaround/i, /boiler/i] },
  { label: "consumer products", patterns: [/consumer/i, /cosmetic/i, /talc/i, /household product/i] },
  { label: "industrial manufacturing", patterns: [/manufacturing/i, /industrial/i, /plant/i, /processing facility/i] },
  { label: "schools and public buildings", patterns: [/school/i, /teacher/i, /custodian/i, /public housing/i] }
];

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-courtlistener-token, x-admin-resync-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
}

function makeCacheKey(extraQuery) {
  if (!extraQuery) return "default";
  return extraQuery.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "default";
}

async function loadSharedCache(cacheKey) {
  try {
    const pathname = `cache/${cacheKey}.json`;
    const blob = await get(pathname, { access: "public" });
    if (!blob) return null;
    const text = await new Response(blob.stream()).text();
    const payload = JSON.parse(text);
    if (!payload?.syncedAt) return null;
    const ageHours = (Date.now() - new Date(payload.syncedAt).getTime()) / (1000 * 60 * 60);
    if (ageHours > SHARED_CACHE_TTL_HOURS) return null;
    return payload;
  } catch {
    return null;
  }
}

async function saveSharedCache(cacheKey, payload) {
  await put(`cache/${cacheKey}.json`, JSON.stringify(payload), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json"
  });
}

async function fetchCourtListenerCases(token, extraQuery) {
  const queryPlans = buildSearchPlans(extraQuery);
  const progress = [];
  const responses = [];
  for (let index = 0; index < queryPlans.length; index += 1) {
    const plan = queryPlans[index];
    const items = await fetchSearchPages(token, plan);
    progress.push({ label: plan.label, type: plan.type, pagesFetched: Math.ceil(items.length / SEARCH_PAGE_SIZE), rawHits: items.length });
    responses.push(items.map((item, itemIndex) => normalizeCourtListenerResult(item, plan.type, itemIndex)));
  }
  return { cases: dedupeCases(responses.flat()).filter((item) => item.caseName), progress };
}

function buildSearchPlans(extraQuery) {
  return [
    { type: "o", q: buildOpinionQuery(extraQuery), label: "opinion corpus" },
    { type: "o", q: buildMesotheliomaOpinionQuery(extraQuery), label: "mesothelioma-focused opinions" },
    { type: "o", q: buildIntentOpinionQuery(extraQuery), label: "intent-focused opinions" },
    { type: "r", q: buildRecapQuery(extraQuery), label: "federal recap dockets" },
    { type: "rd", q: buildRecapDocumentQuery(extraQuery), label: "recap filing documents" },
    { type: "d", q: buildDocketQuery(extraQuery), label: "docket search" }
  ];
}

async function fetchSearchPages(token, plan) {
  const results = [];
  let nextUrl = new URL("https://www.courtlistener.com/api/rest/v4/search/");
  nextUrl.searchParams.set("q", plan.q);
  nextUrl.searchParams.set("type", plan.type);
  nextUrl.searchParams.set("highlight", "on");
  nextUrl.searchParams.set("page_size", String(SEARCH_PAGE_SIZE));
  let page = 0;
  while (nextUrl && page < MAX_PAGES_PER_QUERY) {
    const response = await fetch(nextUrl.toString(), {
      headers: { Authorization: `Token ${token}`, Accept: "application/json" }
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`CourtListener request failed with status ${response.status}: ${errorBody.slice(0, 200)}`);
    }
    const payload = await response.json();
    if (Array.isArray(payload.results)) results.push(...payload.results);
    nextUrl = payload.next ? new URL(payload.next) : null;
    page += 1;
  }
  return results;
}

function buildOpinionQuery(extraQuery) {
  const base = `${asbestosQuery} AND status:(Published OR Unpublished OR Errata OR Separate OR Unknown)`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}
function buildMesotheliomaOpinionQuery(extraQuery) {
  const base = `${mesotheliomaQuery} AND (asbestos OR exposure OR occupational OR product OR premises OR talc OR vermiculite)`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}
function buildIntentOpinionQuery(extraQuery) {
  const base = `${intentQuery} AND status:(Published OR Unpublished OR Errata OR Separate OR Unknown)`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}
function buildRecapQuery(extraQuery) {
  const base = asbestosQuery;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}
function buildRecapDocumentQuery(extraQuery) {
  const base = `(${mesotheliomaQuery} OR ${intentQuery})`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}
function buildDocketQuery(extraQuery) {
  const base = `(${mesotheliomaQuery} OR ${intentQuery} OR ${asbestosQuery}) AND (complaint OR petition OR lawsuit OR claimant OR plaintiff OR decedent)`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}

function normalizeCourtListenerResult(item, type, index) {
  const opinionSnippet = Array.isArray(item.opinions) ? item.opinions.map((opinion) => opinion.snippet || "").join(" ") : "";
  const recapSnippet = Array.isArray(item.recap_documents) ? item.recap_documents.map((document) => document.snippet || document.description || "").join(" ") : "";
  const directSnippet = [item.snippet, item.text, item.caseNameFull, item.caseNameShort, item.docketEntryDescription].filter(Boolean).join(" ");
  const snippet = [opinionSnippet, recapSnippet, directSnippet].filter(Boolean).join(" ");
  const summary = stripHtml(snippet) || item.syllabus || item.posture || "Asbestos-related result pulled from CourtListener search.";
  const textBlob = [item.caseName, item.caseNameFull, item.caseNameShort, summary, item.court, item.suitNature, item.docketNumber, item.docketEntryDescription].filter(Boolean).join(" ");
  const companies = extractCompanyNames([item.caseName, item.caseNameFull, summary].filter(Boolean).join(" "));
  return {
    id: `${type}-${item.cluster_id || item.docket_id || index}`,
    source: "courtlistener",
    caseName: item.caseName || item.caseNameFull || "Untitled asbestos matter",
    court: item.court || "Unknown court",
    courtType: inferCourtType(item.court || "", type),
    state: guessStateFromCourt(item.court || "", item.court_id || ""),
    dateFiled: item.dateFiled || "Unknown",
    outcome: inferOutcome(textBlob),
    classAction: /class action|rule 23|certif|mdl|multidistrict/i.test(textBlob),
    exposures: detectLabels(textBlob, exposureTypeRules),
    materials: detectLabels(textBlob, materialCategoryRules),
    occupations: detectLabels(textBlob, occupationRules),
    industries: detectLabels(textBlob, industryRules),
    companies,
    defendantCompanies: companies.filter((name) => !isTrustOrFund(name)),
    trustFunds: companies.filter((name) => isTrustOrFund(name)),
    snapshot: buildCaseSnapshot(textBlob),
    summary,
    absolute_url: item.absolute_url ? `https://www.courtlistener.com${item.absolute_url}` : "https://www.courtlistener.com/"
  };
}

function inferCourtType(courtName, type) {
  const lower = courtName.toLowerCase();
  if (type === "r" || type === "d" || lower.includes("district court")) return "Federal District";
  if (lower.includes("bankruptcy")) return "Bankruptcy";
  if (lower.includes("court of appeals") || lower.includes("supreme court of the united states")) return "Federal Appellate";
  if (lower.includes("supreme court")) return "State Supreme";
  if (lower.includes("appellate") || lower.includes("court of appeal")) return "State Appellate";
  return "Special";
}
function inferOutcome(text) {
  const lower = text.toLowerCase();
  if (/settled|settlement/.test(lower)) return "settled";
  if (/affirmed.*defen|summary judgment for defen|dismissed|denied certification|plaintiff.*los|loss/.test(lower)) return "plaintiff_lost";
  if (/verdict for plaintiff|plaintiff prevailed|reversed|vacated and remanded|liability found|damages awarded/.test(lower)) return "plaintiff_won";
  if (/affirmed in part|mixed|partially/.test(lower)) return "mixed";
  return "unknown";
}

function guessStateFromCourt(courtName, courtId) {
  const upperId = String(courtId).toUpperCase();
  const directMap = { SCOTUS: "DC", CA1: "MA", CA2: "NY", CA3: "PA", CA4: "VA", CA5: "LA", CA6: "OH", CA7: "IL", CA8: "MO", CA9: "CA", CA10: "CO", CA11: "GA", CADC: "DC", CAFC: "DC" };
  if (directMap[upperId]) return directMap[upperId];
  const statePatterns = {
    AL: /alabama/i, AK: /alaska/i, AZ: /arizona/i, AR: /arkansas/i, CA: /california/i, CO: /colorado/i, CT: /connecticut/i, DE: /delaware/i, DC: /district of columbia|d\.c\./i,
    FL: /florida/i, GA: /georgia/i, HI: /hawaii/i, ID: /idaho/i, IL: /illinois/i, IN: /indiana/i, IA: /iowa/i, KS: /kansas/i, KY: /kentucky/i, LA: /louisiana/i,
    ME: /maine/i, MD: /maryland/i, MA: /massachusetts/i, MI: /michigan/i, MN: /minnesota/i, MS: /mississippi/i, MO: /missouri/i, MT: /montana/i, NE: /nebraska/i, NV: /nevada/i,
    NH: /new hampshire/i, NJ: /new jersey/i, NM: /new mexico/i, NY: /new york/i, NC: /north carolina/i, ND: /north dakota/i, OH: /ohio/i, OK: /oklahoma/i, OR: /oregon/i,
    PA: /pennsylvania/i, RI: /rhode island/i, SC: /south carolina/i, SD: /south dakota/i, TN: /tennessee/i, TX: /texas/i, UT: /utah/i, VT: /vermont/i, VA: /virginia/i,
    WA: /washington/i, WV: /west virginia/i, WI: /wisconsin/i, WY: /wyoming/i
  };
  for (const [abbr, pattern] of Object.entries(statePatterns)) {
    if (pattern.test(courtName)) return abbr;
  }
  if (upperId.startsWith("D")) {
    const districtCode = upperId.slice(1, 3);
    if (districtCode.length === 2) return districtCode;
  }
  return "Unknown";
}

function detectLabels(text, rules) {
  return rules.filter((rule) => rule.patterns.some((pattern) => pattern.test(text))).map((rule) => rule.label);
}
function extractCompanyNames(text) {
  const matches = text.match(/\b([A-Z][A-Za-z&.,'/-]*(?:\s+[A-Z][A-Za-z&.,'/-]*){0,5}\s(?:Inc\.|Corp\.|Corporation|LLC|Ltd\.|Co\.|Company|Trust|Fund|PLC|LP|L\.P\.))\b/g) || [];
  return [...new Set(matches.map((value) => value.trim()))];
}
function isTrustOrFund(name) {
  return /\b(Trust|Fund)\b/i.test(name);
}
function buildCaseSnapshot(text) {
  const fragments = [];
  if (/mesothelioma/i.test(text)) fragments.push("mesothelioma claim");
  else if (/asbestosis/i.test(text)) fragments.push("asbestosis-related claim");
  else fragments.push("asbestos exposure claim");
  if (/wrongful death/i.test(text)) fragments.push("wrongful-death allegations");
  else if (/personal injury/i.test(text)) fragments.push("personal-injury allegations");
  if (/class action|rule 23|mdl|multidistrict/i.test(text)) fragments.push("class or mass-action context");
  if (/brake|friction/i.test(text)) fragments.push("friction-product exposure");
  if (/shipyard|navy|shipboard/i.test(text)) fragments.push("maritime or naval exposure");
  if (/talc/i.test(text)) fragments.push("talc-related allegations");
  if (/vermiculite/i.test(text)) fragments.push("vermiculite-related allegations");
  return fragments.length ? fragments.join(" · ") : "asbestos litigation matter";
}
function dedupeCases(items) {
  const seen = new Map();
  for (const item of items) {
    const key = `${item.caseName}|${item.court}|${item.dateFiled}`;
    if (!seen.has(key)) seen.set(key, item);
  }
  return Array.from(seen.values());
}
function stripHtml(value) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

module.exports = {
  setCors,
  makeCacheKey,
  loadSharedCache,
  saveSharedCache,
  fetchCourtListenerCases
};
