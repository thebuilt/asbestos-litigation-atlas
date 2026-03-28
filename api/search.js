"use strict";

const SEARCH_PAGE_SIZE = 100;
const MAX_PAGES_PER_QUERY = 20;

const asbestosQuery =
  '(asbestos OR mesothelioma OR asbestosis OR chrysotile OR amosite OR crocidolite OR tremolite OR actinolite OR anthophyllite)';
const mesotheliomaQuery =
  '("mesothelioma" OR "pleural mesothelioma" OR "peritoneal mesothelioma" OR "malignant mesothelioma")';
const intentQuery =
  '((asbestos OR mesothelioma OR asbestosis) AND (exposure OR occupational OR workplace OR product OR premises OR "failure to warn" OR "wrongful death" OR "personal injury" OR "take-home" OR talc OR vermiculite OR brake OR insulation))';

const exposureDictionary = [
  "mesothelioma",
  "pleural mesothelioma",
  "peritoneal mesothelioma",
  "malignant mesothelioma",
  "asbestosis",
  "pleural plaques",
  "lung cancer",
  "occupational insulation handling",
  "shipyard and industrial insulation work",
  "mixed occupational exposure",
  "future-claimant exposure",
  "construction and maintenance exposure",
  "take-home exposure",
  "household laundering",
  "secondary household exposure",
  "school renovation disturbance",
  "community contamination",
  "processing facility exposure",
  "automotive brake work",
  "garage dust exposure",
  "refinery maintenance shutdown",
  "confined-space insulation removal",
  "engine room maintenance",
  "shipboard boiler overhaul",
  "tenant renovation exposure",
  "dust during remediation failures",
  "consumer talc use",
  "brake",
  "shipyard",
  "construction",
  "renovation",
  "maintenance",
  "refinery",
  "talc",
  "vermiculite",
  "laundering",
  "boiler",
  "engine room",
  "premises liability",
  "failure to warn",
  "wrongful death",
  "personal injury",
  "household exposure",
  "secondary exposure"
];

const materialDictionary = [
  "asbestos fibers",
  "asbestos dust",
  "friable asbestos",
  "thermal insulation",
  "pipe covering",
  "block insulation",
  "insulation",
  "gaskets",
  "packing",
  "boiler insulation",
  "joint compound",
  "floor tiles",
  "ceiling panels",
  "sprayed fireproofing",
  "pipe insulation",
  "drywall products",
  "talc",
  "vermiculite",
  "brake linings",
  "friction products",
  "brake shoes",
  "cement siding",
  "roofing shingles",
  "refractory products",
  "valve packing",
  "turbine insulation"
];

const occupationDictionary = [
  "insulator",
  "industrial worker",
  "construction worker",
  "pipefitter",
  "electrician",
  "maintenance worker",
  "family member",
  "drywall finisher",
  "shipyard worker",
  "machinist",
  "Navy veteran",
  "auto mechanic",
  "garage worker",
  "processing plant worker",
  "community resident",
  "boilermaker",
  "refinery worker",
  "spouse",
  "consumer",
  "abatement worker",
  "custodian",
  "teacher",
  "maintenance mechanic",
  "roofer",
  "carpenter",
  "machinist mate",
  "rail mechanic",
  "tenant",
  "welder",
  "plumber",
  "laborer",
  "miner",
  "millwright",
  "steamfitter",
  "electrician apprentice"
];

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const extraQuery = typeof req.query.extraQuery === "string" ? req.query.extraQuery.trim() : "";
  const suppliedToken = req.headers["x-courtlistener-token"];
  const token = suppliedToken || process.env.COURTLISTENER_API_TOKEN;

  if (!token) {
    res.status(400).json({
      error:
        "Missing CourtListener token. Set COURTLISTENER_API_TOKEN in Vercel project settings or send x-courtlistener-token."
    });
    return;
  }

  try {
    const { cases, progress } = await fetchCourtListenerCases(token, extraQuery);
    res.status(200).json({
      ok: true,
      count: cases.length,
      progress,
      cases
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown server error"
    });
  }
};

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-courtlistener-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
}

async function fetchCourtListenerCases(token, extraQuery) {
  const queryPlans = buildSearchPlans(extraQuery);
  const progress = [];
  const responses = [];

  for (let index = 0; index < queryPlans.length; index += 1) {
    const plan = queryPlans[index];
    const items = await fetchSearchPages(token, plan);
    progress.push({
      label: plan.label,
      type: plan.type,
      pagesFetched: Math.ceil(items.length / SEARCH_PAGE_SIZE),
      rawHits: items.length
    });
    responses.push(items.map((item, itemIndex) => normalizeCourtListenerResult(item, plan.type, itemIndex)));
  }

  return {
    cases: dedupeCases(responses.flat()).filter((item) => item.caseName),
    progress
  };
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
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`CourtListener request failed with status ${response.status}: ${errorBody.slice(0, 200)}`);
    }

    const payload = await response.json();
    if (Array.isArray(payload.results)) {
      results.push(...payload.results);
    }

    nextUrl = payload.next ? new URL(payload.next) : null;
    page += 1;
  }

  return results;
}

function buildOpinionQuery(extraQuery) {
  const base =
    `${asbestosQuery} AND status:(Published OR Unpublished OR Errata OR Separate OR Unknown)`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}

function buildMesotheliomaOpinionQuery(extraQuery) {
  const base =
    `${mesotheliomaQuery} AND (asbestos OR exposure OR occupational OR product OR premises OR talc OR vermiculite)`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}

function buildIntentOpinionQuery(extraQuery) {
  const base =
    `${intentQuery} AND status:(Published OR Unpublished OR Errata OR Separate OR Unknown)`;
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
  const base =
    `(${mesotheliomaQuery} OR ${intentQuery} OR ${asbestosQuery}) AND (complaint OR petition OR lawsuit OR claimant OR plaintiff OR decedent)`;
  return extraQuery ? `${base} AND (${extraQuery})` : base;
}

function normalizeCourtListenerResult(item, type, index) {
  const opinionSnippet = Array.isArray(item.opinions)
    ? item.opinions.map((opinion) => opinion.snippet || "").join(" ")
    : "";
  const recapSnippet = Array.isArray(item.recap_documents)
    ? item.recap_documents.map((document) => document.snippet || document.description || "").join(" ")
    : "";
  const directSnippet = [
    item.snippet,
    item.text,
    item.caseNameFull,
    item.caseNameShort,
    item.docketEntryDescription
  ]
    .filter(Boolean)
    .join(" ");
  const snippet = [opinionSnippet, recapSnippet, directSnippet].filter(Boolean).join(" ");
  const summary = stripHtml(snippet) || item.syllabus || item.posture || "Asbestos-related result pulled from CourtListener search.";
  const textBlob = [
    item.caseName,
    item.caseNameFull,
    item.caseNameShort,
    summary,
    item.court,
    item.suitNature,
    item.docketNumber,
    item.docketEntryDescription
  ]
    .filter(Boolean)
    .join(" ");

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
    exposures: detectTerms(textBlob, exposureDictionary),
    materials: detectTerms(textBlob, materialDictionary),
    occupations: detectTerms(textBlob, occupationDictionary),
    summary,
    absolute_url: item.absolute_url
      ? `https://www.courtlistener.com${item.absolute_url}`
      : "https://www.courtlistener.com/"
  };
}

function inferCourtType(courtName, type) {
  const lower = courtName.toLowerCase();
  if (type === "r" || type === "d" || lower.includes("district court")) return "Federal District";
  if (lower.includes("bankruptcy")) return "Bankruptcy";
  if (lower.includes("court of appeals") || lower.includes("supreme court of the united states")) {
    return "Federal Appellate";
  }
  if (lower.includes("supreme court")) return "State Supreme";
  if (lower.includes("appellate") || lower.includes("court of appeal")) return "State Appellate";
  return "Special";
}

function inferOutcome(text) {
  const lower = text.toLowerCase();
  if (/settled|settlement/.test(lower)) return "settled";
  if (/affirmed.*defen|summary judgment for defen|dismissed|denied certification|plaintiff.*los|loss/.test(lower)) {
    return "plaintiff_lost";
  }
  if (/verdict for plaintiff|plaintiff prevailed|reversed|vacated and remanded|liability found|damages awarded/.test(lower)) {
    return "plaintiff_won";
  }
  if (/affirmed in part|mixed|partially/.test(lower)) return "mixed";
  return "unknown";
}

function guessStateFromCourt(courtName, courtId) {
  const upperId = String(courtId).toUpperCase();
  const directMap = {
    SCOTUS: "DC",
    CA1: "MA", CA2: "NY", CA3: "PA", CA4: "VA", CA5: "LA", CA6: "OH",
    CA7: "IL", CA8: "MO", CA9: "CA", CA10: "CO", CA11: "GA", CADC: "DC", CAFC: "DC"
  };
  if (directMap[upperId]) return directMap[upperId];

  const statePatterns = {
    AL: /alabama/i, AK: /alaska/i, AZ: /arizona/i, AR: /arkansas/i, CA: /california/i,
    CO: /colorado/i, CT: /connecticut/i, DE: /delaware/i, DC: /district of columbia|d\.c\./i,
    FL: /florida/i, GA: /georgia/i, HI: /hawaii/i, ID: /idaho/i, IL: /illinois/i,
    IN: /indiana/i, IA: /iowa/i, KS: /kansas/i, KY: /kentucky/i, LA: /louisiana/i,
    ME: /maine/i, MD: /maryland/i, MA: /massachusetts/i, MI: /michigan/i, MN: /minnesota/i,
    MS: /mississippi/i, MO: /missouri/i, MT: /montana/i, NE: /nebraska/i, NV: /nevada/i,
    NH: /new hampshire/i, NJ: /new jersey/i, NM: /new mexico/i, NY: /new york/i,
    NC: /north carolina/i, ND: /north dakota/i, OH: /ohio/i, OK: /oklahoma/i, OR: /oregon/i,
    PA: /pennsylvania/i, RI: /rhode island/i, SC: /south carolina/i, SD: /south dakota/i,
    TN: /tennessee/i, TX: /texas/i, UT: /utah/i, VT: /vermont/i, VA: /virginia/i,
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

function detectTerms(text, dictionary) {
  const lower = text.toLowerCase();
  return dictionary.filter((term) => lower.includes(term.toLowerCase()));
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
