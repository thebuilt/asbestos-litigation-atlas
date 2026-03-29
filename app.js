const showcaseCases = [
  {
    id: "s1",
    source: "showcase",
    caseName: "Borel v. Fibreboard Paper Products Corp.",
    court: "United States Court of Appeals for the Fifth Circuit",
    courtType: "Federal Appellate",
    state: "TX",
    dateFiled: "1973-09-19",
    outcome: "plaintiff_won",
    classAction: false,
    exposures: ["occupational insulation handling", "shipyard and industrial insulation work"],
    materials: ["thermal insulation", "pipe covering", "block insulation"],
    occupations: ["insulator", "industrial worker"],
    summary:
      "Foundational asbestos product-liability case involving occupational exposure from insulation products.",
    absolute_url: "https://www.courtlistener.com/opinion/899660/borel-v-fibreboard-paper-products-corp/"
  },
  {
    id: "s2",
    source: "showcase",
    caseName: "Rutherford v. Owens-Illinois, Inc.",
    court: "Supreme Court of California",
    courtType: "State Supreme",
    state: "CA",
    dateFiled: "1997-01-06",
    outcome: "plaintiff_won",
    classAction: false,
    exposures: ["occupational construction exposure", "multiple product exposure"],
    materials: ["insulation", "asbestos-containing building materials"],
    occupations: ["construction worker", "pipefitter"],
    summary:
      "California asbestos causation decision focusing on proof standards for multiple exposures.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s3",
    source: "showcase",
    caseName: "Amchem Products, Inc. v. Windsor",
    court: "Supreme Court of the United States",
    courtType: "Federal Appellate",
    state: "DC",
    dateFiled: "1997-06-25",
    outcome: "plaintiff_lost",
    classAction: true,
    exposures: ["mixed occupational exposure", "future-claimant exposure"],
    materials: ["consumer and industrial asbestos products"],
    occupations: ["mixed workforce"],
    summary:
      "Seminal class action decision rejecting settlement certification in mass asbestos litigation.",
    absolute_url: "https://www.courtlistener.com/opinion/118103/amchem-products-inc-v-windsor/"
  },
  {
    id: "s4",
    source: "showcase",
    caseName: "Ortiz v. Fibreboard Corp.",
    court: "Supreme Court of the United States",
    courtType: "Federal Appellate",
    state: "DC",
    dateFiled: "1999-06-23",
    outcome: "plaintiff_lost",
    classAction: true,
    exposures: ["mass tort exposure pool"],
    materials: ["insulation products"],
    occupations: ["mixed workforce"],
    summary:
      "Supreme Court decision narrowing asbestos settlement class action pathways.",
    absolute_url: "https://www.courtlistener.com/opinion/118319/ortiz-v-fibreboard-corp/"
  },
  {
    id: "s5",
    source: "showcase",
    caseName: "In re New York City Asbestos Litigation",
    court: "New York Court of Appeals",
    courtType: "State Supreme",
    state: "NY",
    dateFiled: "2016-06-28",
    outcome: "mixed",
    classAction: false,
    exposures: ["construction and maintenance exposure", "take-home exposure"],
    materials: ["joint compound", "floor tiles", "insulation"],
    occupations: ["electrician", "maintenance worker", "family member"],
    summary:
      "Large asbestos docket with recurring issues around causation, duty, and product identification.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s6",
    source: "showcase",
    caseName: "Kaiser Gypsum debtor asbestos claims proceeding",
    court: "United States Bankruptcy Court, Western District of North Carolina",
    courtType: "Bankruptcy",
    state: "NC",
    dateFiled: "2016-10-01",
    outcome: "mixed",
    classAction: false,
    exposures: ["legacy product installation", "construction material exposure"],
    materials: ["joint compound", "drywall products"],
    occupations: ["drywall finisher", "construction worker"],
    summary:
      "Bankruptcy reorganization context for large-scale asbestos liabilities and trust structures.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s7",
    source: "showcase",
    caseName: "Maritime ship repair asbestos appeal",
    court: "United States Court of Appeals for the Ninth Circuit",
    courtType: "Federal Appellate",
    state: "CA",
    dateFiled: "2004-05-17",
    outcome: "plaintiff_won",
    classAction: false,
    exposures: ["shipboard maintenance", "naval vessel overhaul"],
    materials: ["gaskets", "boiler insulation", "packing"],
    occupations: ["machinist", "Navy veteran", "shipyard worker"],
    summary:
      "Representative maritime exposure dispute involving naval and shipyard maintenance work.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s8",
    source: "showcase",
    caseName: "Brake dust failure-to-warn action",
    court: "Supreme Court of Pennsylvania",
    courtType: "State Supreme",
    state: "PA",
    dateFiled: "2012-11-21",
    outcome: "plaintiff_lost",
    classAction: false,
    exposures: ["automotive brake work", "garage dust exposure"],
    materials: ["brake linings", "friction products"],
    occupations: ["auto mechanic", "garage worker"],
    summary:
      "Automotive friction-product dispute centered on warnings and exposure proof.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s9",
    source: "showcase",
    caseName: "Vermiculite processing premises case",
    court: "Supreme Court of Montana",
    courtType: "State Supreme",
    state: "MT",
    dateFiled: "2008-03-14",
    outcome: "plaintiff_won",
    classAction: false,
    exposures: ["community contamination", "processing facility exposure"],
    materials: ["vermiculite", "asbestos-contaminated ore"],
    occupations: ["processing plant worker", "community resident"],
    summary:
      "Premises and community exposure litigation tied to contaminated vermiculite operations.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s10",
    source: "showcase",
    caseName: "Refinery turnaround asbestos action",
    court: "Texas Court of Appeals",
    courtType: "State Appellate",
    state: "TX",
    dateFiled: "2015-08-12",
    outcome: "settled",
    classAction: false,
    exposures: ["refinery maintenance shutdown", "confined-space insulation removal"],
    materials: ["pipe insulation", "refractory products", "gaskets"],
    occupations: ["boilermaker", "pipefitter", "refinery worker"],
    summary:
      "Refinery turnaround work produced repeated exposure from insulation and sealing materials.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s11",
    source: "showcase",
    caseName: "Take-home exposure duty dispute",
    court: "Supreme Court of New Jersey",
    courtType: "State Supreme",
    state: "NJ",
    dateFiled: "2016-07-06",
    outcome: "mixed",
    classAction: false,
    exposures: ["household laundering", "secondary household exposure"],
    materials: ["work clothes dust", "industrial insulation residues"],
    occupations: ["spouse", "family member", "plant worker"],
    summary:
      "Duty analysis in household or take-home asbestos exposure claims.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s12",
    source: "showcase",
    caseName: "School building asbestos abatement dispute",
    court: "United States District Court, Eastern District of Michigan",
    courtType: "Federal District",
    state: "MI",
    dateFiled: "2001-10-03",
    outcome: "plaintiff_won",
    classAction: false,
    exposures: ["school renovation disturbance", "abatement contractor exposure"],
    materials: ["ceiling panels", "sprayed fireproofing", "pipe insulation"],
    occupations: ["abatement worker", "custodian", "teacher"],
    summary:
      "Dispute around disturbed asbestos-containing materials during school renovation and remediation.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s13",
    source: "showcase",
    caseName: "Talc exposure consumer suit",
    court: "Superior Court of New Jersey, Appellate Division",
    courtType: "State Appellate",
    state: "NJ",
    dateFiled: "2020-03-04",
    outcome: "mixed",
    classAction: false,
    exposures: ["consumer talc use"],
    materials: ["talc"],
    occupations: ["consumer"],
    summary:
      "Consumer-product asbestos allegations focused on contaminated talc and causation evidence.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s14",
    source: "showcase",
    caseName: "Chemical plant insulator appeal",
    court: "United States Court of Appeals for the Third Circuit",
    courtType: "Federal Appellate",
    state: "PA",
    dateFiled: "1991-04-09",
    outcome: "plaintiff_won",
    classAction: false,
    exposures: ["chemical plant insulation", "maintenance outage exposure"],
    materials: ["pipe covering", "block insulation", "valve packing"],
    occupations: ["insulator", "maintenance mechanic"],
    summary:
      "Industrial maintenance case involving repeated insulation disturbance in a process plant.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s15",
    source: "showcase",
    caseName: "Asbestos-containing cement siding dispute",
    court: "Supreme Court of Washington",
    courtType: "State Supreme",
    state: "WA",
    dateFiled: "2007-09-11",
    outcome: "plaintiff_lost",
    classAction: false,
    exposures: ["home renovation cutting", "construction demolition"],
    materials: ["cement siding", "roofing shingles"],
    occupations: ["home renovator", "roofer", "carpenter"],
    summary:
      "Dispute over cutting and demolition dust from asbestos-containing exterior products.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s16",
    source: "showcase",
    caseName: "Boiler room naval engine exposure case",
    court: "United States District Court, Eastern District of Virginia",
    courtType: "Federal District",
    state: "VA",
    dateFiled: "2018-05-29",
    outcome: "mixed",
    classAction: false,
    exposures: ["engine room maintenance", "shipboard boiler overhaul"],
    materials: ["boiler insulation", "gaskets", "packing", "turbine insulation"],
    occupations: ["Navy veteran", "machinist mate"],
    summary:
      "Military and maritime exposure allegations from confined engine room maintenance work.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s17",
    source: "showcase",
    caseName: "Rail brake shop exposure action",
    court: "Illinois Appellate Court",
    courtType: "State Appellate",
    state: "IL",
    dateFiled: "2013-02-15",
    outcome: "plaintiff_won",
    classAction: false,
    exposures: ["rail brake maintenance", "shop dust inhalation"],
    materials: ["brake shoes", "friction materials"],
    occupations: ["rail mechanic", "maintenance worker"],
    summary:
      "Occupational exposure from rail brake maintenance and repair shop dust.",
    absolute_url: "https://www.courtlistener.com/"
  },
  {
    id: "s18",
    source: "showcase",
    caseName: "Public housing renovation asbestos claims",
    court: "United States District Court, Southern District of New York",
    courtType: "Federal District",
    state: "NY",
    dateFiled: "2009-12-01",
    outcome: "settled",
    classAction: true,
    exposures: ["tenant renovation exposure", "dust during remediation failures"],
    materials: ["floor tiles", "pipe insulation", "joint compound"],
    occupations: ["tenant", "maintenance worker", "abatement worker"],
    summary:
      "Mass claims involving tenant exposure during housing renovation and remediation failures.",
    absolute_url: "https://www.courtlistener.com/"
  }
];

const stateLayout = [
  { abbr: "AK", row: 7, col: 1 }, { abbr: "HI", row: 7, col: 2 },
  { abbr: "WA", row: 1, col: 1 }, { abbr: "MT", row: 1, col: 3 },
  { abbr: "ND", row: 1, col: 5 }, { abbr: "MN", row: 1, col: 6 },
  { abbr: "WI", row: 1, col: 7 }, { abbr: "MI", row: 1, col: 8 },
  { abbr: "VT", row: 1, col: 10 }, { abbr: "NH", row: 1, col: 11 }, { abbr: "ME", row: 1, col: 12 },
  { abbr: "OR", row: 2, col: 1 }, { abbr: "ID", row: 2, col: 2 }, { abbr: "WY", row: 2, col: 3 },
  { abbr: "SD", row: 2, col: 5 }, { abbr: "IA", row: 2, col: 6 }, { abbr: "IL", row: 2, col: 7 },
  { abbr: "IN", row: 2, col: 8 }, { abbr: "OH", row: 2, col: 9 }, { abbr: "PA", row: 2, col: 10 },
  { abbr: "NY", row: 2, col: 11 }, { abbr: "MA", row: 2, col: 12 },
  { abbr: "CA", row: 3, col: 1 }, { abbr: "NV", row: 3, col: 2 }, { abbr: "UT", row: 3, col: 3 },
  { abbr: "CO", row: 3, col: 4 }, { abbr: "NE", row: 3, col: 5 }, { abbr: "MO", row: 3, col: 6 },
  { abbr: "KY", row: 3, col: 7 }, { abbr: "WV", row: 3, col: 8 }, { abbr: "VA", row: 3, col: 9 },
  { abbr: "MD", row: 3, col: 10 }, { abbr: "NJ", row: 3, col: 11 }, { abbr: "CT", row: 3, col: 12 },
  { abbr: "AZ", row: 4, col: 2 }, { abbr: "NM", row: 4, col: 3 }, { abbr: "KS", row: 4, col: 5 },
  { abbr: "AR", row: 4, col: 6 }, { abbr: "TN", row: 4, col: 7 }, { abbr: "NC", row: 4, col: 9 },
  { abbr: "SC", row: 4, col: 10 }, { abbr: "DC", row: 4, col: 11 }, { abbr: "RI", row: 4, col: 12 },
  { abbr: "TX", row: 5, col: 3 }, { abbr: "OK", row: 5, col: 4 }, { abbr: "LA", row: 5, col: 6 },
  { abbr: "MS", row: 5, col: 7 }, { abbr: "AL", row: 5, col: 8 }, { abbr: "GA", row: 5, col: 9 },
  { abbr: "FL", row: 6, col: 10 }, { abbr: "DE", row: 4, col: 10 }, { abbr: "DI", row: 0, col: 0 },
  { abbr: "PR", row: 6, col: 12 }
].filter((state) => state.abbr !== "DI");

const courtTypes = [
  "Federal Appellate",
  "Federal District",
  "State Appellate",
  "State Supreme",
  "Bankruptcy",
  "Special"
];

const outcomeLabels = {
  plaintiff_won: "Plaintiff won",
  plaintiff_lost: "Plaintiff lost",
  mixed: "Mixed",
  settled: "Settled",
  unknown: "Unknown"
};

const appState = {
  mode: "showcase",
  rawCases: [...showcaseCases],
  filters: {
    search: "",
    outcome: "all",
    classAction: "all",
    state: "all",
    courts: new Set(courtTypes)
  }
};

const els = {
  dataMode: document.getElementById("data-mode"),
  recordCount: document.getElementById("record-count"),
  lastRefresh: document.getElementById("last-refresh"),
  statusMessage: document.getElementById("status-message"),
  statusProgress: document.getElementById("status-progress"),
  metricsGrid: document.getElementById("metrics-grid"),
  insightList: document.getElementById("insight-list"),
  exposureList: document.getElementById("exposure-list"),
  materialList: document.getElementById("material-list"),
  occupationTrends: document.getElementById("occupation-trends"),
  defendantList: document.getElementById("defendant-list"),
  trustList: document.getElementById("trust-list"),
  industryList: document.getElementById("industry-list"),
  lostCases: document.getElementById("lost-cases"),
  classActions: document.getElementById("class-actions"),
  caseResults: document.getElementById("case-results"),
  stateFilter: document.getElementById("state-filter"),
  outcomeFilter: document.getElementById("outcome-filter"),
  classActionFilter: document.getElementById("class-action-filter"),
  searchInput: document.getElementById("search-input"),
  courtToggles: document.getElementById("court-toggles"),
  usMap: document.getElementById("us-map"),
  mapLegend: document.getElementById("map-legend"),
  customQuery: document.getElementById("custom-query"),
  fetchLiveBtn: document.getElementById("fetch-live-btn"),
  adminResyncBtn: document.getElementById("admin-resync-btn"),
  datasetRequestPanel: document.getElementById("dataset-request-panel"),
  requesterName: document.getElementById("requester-name"),
  requesterEmail: document.getElementById("requester-email"),
  requestQuery: document.getElementById("request-query"),
  requestNote: document.getElementById("request-note"),
  requestDatasetBtn: document.getElementById("request-dataset-btn")
};

const LIVE_CACHE_KEY = "asbestos-litigation-atlas-live-cache";
const LIVE_CACHE_META_KEY = "asbestos-litigation-atlas-live-cache-meta";
const REQUEST_DESTINATION_EMAIL = "raja@thebuilt.in";

init();

function init() {
  hydrateCachedDataset();
  renderCourtToggles();
  bindEvents();
  render();
  if (appState.mode !== "live") {
    loadSharedServerCache();
  }
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    appState.filters.search = event.target.value.trim().toLowerCase();
    render();
  });

  els.outcomeFilter.addEventListener("change", (event) => {
    appState.filters.outcome = event.target.value;
    render();
  });

  els.classActionFilter.addEventListener("change", (event) => {
    appState.filters.classAction = event.target.value;
    render();
  });

  els.stateFilter.addEventListener("change", (event) => {
    appState.filters.state = event.target.value;
    render();
  });

  els.fetchLiveBtn.addEventListener("click", async () => {
    setLoadingState(true, "Loading the shared cached dataset...");
    toggleDatasetRequestPanel(false);

    try {
      const payload = await fetchCourtListenerCases(
        els.customQuery.value.trim(),
        (message) => setStatus(message, false)
      );
      const liveCases = Array.isArray(payload.cases) ? payload.cases : [];
      appState.mode = "live";
      appState.rawCases = liveCases.length ? liveCases : [...showcaseCases];
      saveCachedDataset(liveCases, {
        syncedAt: payload.syncedAt || new Date().toISOString(),
        extraQuery: els.customQuery.value.trim(),
        source: payload.source || "shared_cache",
        completedPlans: payload.completedPlans || null,
        totalPlans: payload.totalPlans || null,
        hasMore: Boolean(payload.hasMore),
        nextPlanIndex: payload.hasMore && Number.isInteger(payload.completedPlans) ? payload.completedPlans : null
      });
      setStatus(
        liveCases.length
          ? `Loaded ${liveCases.length} cases from the shared server cache.`
          : "Live fetch returned no normalized records, so the showcase dataset remains available.",
        false
      );
      setLoadingState(false);
      render();
    } catch (error) {
      console.error(error);
      if (error.status === 404) {
        primeDatasetRequestForm(els.customQuery.value.trim());
        toggleDatasetRequestPanel(true);
        setStatus(
          "No shared dataset exists yet for this query. Use the request form to email the operator for a sync.",
          true
        );
      } else {
        setStatus(
          "The shared dataset could not be loaded right now. Please try again shortly.",
          true
        );
      }
      setLoadingState(false);
    }
  });

  els.adminResyncBtn.addEventListener("click", async () => {
    const adminToken = window.prompt("Enter the admin resync token");
    if (!adminToken) {
      return;
    }

    setLoadingState(true, "Admin resync is fetching fresh CourtListener data...");

    try {
      const payload = await forceAdminResync(adminToken, els.customQuery.value.trim());
      const liveCases = Array.isArray(payload.cases) ? payload.cases : [];
      appState.mode = "live";
      appState.rawCases = liveCases.length ? liveCases : [...showcaseCases];
      saveCachedDataset(liveCases, {
        syncedAt: payload.syncedAt || new Date().toISOString(),
        extraQuery: els.customQuery.value.trim(),
        source: "courtlistener",
        completedPlans: payload.completedPlans || null,
        totalPlans: payload.totalPlans || null,
        hasMore: Boolean(payload.hasMore),
        nextPlanIndex: payload.hasMore && Number.isInteger(payload.completedPlans) ? payload.completedPlans : null
      });
      setStatus(
        liveCases.length
          ? payload.hasMore
            ? `Admin resync saved ${liveCases.length} total cached cases. More sync remains: step ${payload.completedPlans} of ${payload.totalPlans} finished (${payload.currentPlan}). Run it again to continue building the corpus.`
            : `Admin resync completed and cached ${liveCases.length} total cases on the server.`
          : "Admin resync finished but returned no normalized records.",
        false
      );
      setLoadingState(false);
      render();
    } catch (error) {
      console.error(error);
      setStatus(`Admin resync failed: ${extractErrorMessage(error)}`, true);
      setLoadingState(false);
    }
  });

  els.requestDatasetBtn.addEventListener("click", () => {
    const subjectQuery = (els.requestQuery.value || els.customQuery.value || "default asbestos dataset").trim();
    const requesterName = els.requesterName.value.trim() || "Unknown requester";
    const requesterEmail = els.requesterEmail.value.trim() || "No email provided";
    const requestNote = els.requestNote.value.trim() || "No additional context provided.";
    const subject = `Dataset sync request: ${subjectQuery}`;
    const body = [
      "Hello,",
      "",
      "A user is requesting that this asbestos litigation dataset slice be synced into the shared cache.",
      "",
      `Requested query: ${subjectQuery}`,
      `Requester name: ${requesterName}`,
      `Requester email: ${requesterEmail}`,
      "",
      "Request context:",
      requestNote,
      "",
      "Please review and, if appropriate, run an admin resync for this query."
    ].join("\n");

    window.location.href = `mailto:${REQUEST_DESTINATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(`Opened an email draft to ${REQUEST_DESTINATION_EMAIL} with the dataset request details.`, false);
  });
}

function hydrateCachedDataset() {
  try {
    const cachedCases = JSON.parse(localStorage.getItem(LIVE_CACHE_KEY) || "null");
    const cachedMeta = JSON.parse(localStorage.getItem(LIVE_CACHE_META_KEY) || "null");

    if (Array.isArray(cachedCases) && cachedCases.length) {
      appState.mode = "live";
      appState.rawCases = cachedCases;
      if (cachedMeta?.extraQuery) {
        els.customQuery.value = cachedMeta.extraQuery;
      }
      const syncedAtText = cachedMeta?.syncedAt
        ? new Date(cachedMeta.syncedAt).toLocaleString()
        : "a previous session";
      setStatus(`Loaded cached dataset from ${syncedAtText}. Use refresh only when you want to check for new cases.`, false);
    }
  } catch (error) {
    console.error("Failed to load cached dataset", error);
  }
}

function saveCachedDataset(cases, meta) {
  try {
    localStorage.setItem(LIVE_CACHE_KEY, JSON.stringify(cases));
    localStorage.setItem(LIVE_CACHE_META_KEY, JSON.stringify(meta));
  } catch (error) {
    console.error("Failed to save cached dataset", error);
  }
}

function resolveBackendErrorText(payload, fallback) {
  if (!payload) return fallback;
  if (typeof payload.error === "string" && payload.error.trim()) return payload.error;
  if (payload.error && typeof payload.error === "object") {
    if (typeof payload.error.message === "string" && payload.error.message.trim()) {
      return payload.error.message;
    }
    try {
      return JSON.stringify(payload.error);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

async function fetchCourtListenerCases(extraQuery, onProgress = () => {}) {
  onProgress("Sending request to /api/search...");
  const url = new URL("./api/search", window.location.href);
  if (extraQuery) {
    url.searchParams.set("extraQuery", extraQuery);
  }

  const headers = {
    Accept: "application/json"
  };

  const response = await fetch(url.toString(), {
    method: "GET",
    headers
  });

  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(
      resolveBackendErrorText(payload, `Backend request failed with status ${response.status}`)
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  if (Array.isArray(payload.progress) && payload.progress.length) {
    const summary = payload.progress
      .map((entry) => `${entry.label}: ${entry.rawHits}`)
      .join(" | ");
    onProgress(`Backend search complete. ${summary}`);
  }

  return payload;
}

async function forceAdminResync(adminToken, extraQuery) {
  const url = new URL("./api/admin-resync", window.location.href);
  if (extraQuery) {
    url.searchParams.set("extraQuery", extraQuery);
  }
  const cachedMeta = readCachedMeta();
  const existingCases = Array.isArray(appState.rawCases) && appState.mode === "live" ? appState.rawCases : [];
  const resumeFromPlan = Number.isInteger(cachedMeta?.nextPlanIndex) ? cachedMeta.nextPlanIndex : null;

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-admin-resync-token": adminToken
    },
    body: JSON.stringify({
      existingCases,
      resumeFromPlan
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(
      resolveBackendErrorText(payload, `Admin resync failed with status ${response.status}`)
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

async function loadSharedServerCache() {
  try {
    const payload = await fetchCourtListenerCases(
      "",
      (message) => setStatus(message, false)
    );
    const liveCases = Array.isArray(payload.cases) ? payload.cases : [];
    if (liveCases.length) {
      appState.mode = "live";
      appState.rawCases = liveCases;
      saveCachedDataset(liveCases, {
        syncedAt: payload.syncedAt || new Date().toISOString(),
        extraQuery: "",
        source: payload.source || "shared_cache"
      });
      setStatus(
        payload.source === "shared_cache"
          ? `Loaded ${liveCases.length} cases from the shared server cache.`
          : `Loaded ${liveCases.length} cases from the backend search service.`,
        false
      );
      render();
    }
  } catch (error) {
    console.error("Shared cache bootstrap failed", error);
  }
}

function inferCourtType(courtName, type) {
  const lower = courtName.toLowerCase();
  if (type === "r" || lower.includes("district court")) return "Federal District";
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

function setStatus(message, isError) {
  els.statusMessage.textContent = message;
  els.statusMessage.style.background = isError ? "rgba(127, 37, 16, 0.14)" : "rgba(174, 58, 29, 0.12)";
  els.statusMessage.style.color = isError ? "#7f2510" : "#7f2510";
}

function extractErrorMessage(error) {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  if (typeof error.message === "string") return error.message;
  if (error.message && typeof error.message === "object") {
    try {
      return JSON.stringify(error.message);
    } catch {
      return "Unknown error";
    }
  }
  if (error.payload?.error) {
    if (typeof error.payload.error === "string") return error.payload.error;
    try {
      return JSON.stringify(error.payload.error);
    } catch {
      return "Unknown error";
    }
  }
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

function toggleDatasetRequestPanel(isVisible) {
  els.datasetRequestPanel.hidden = !isVisible;
}

function primeDatasetRequestForm(query) {
  els.requestQuery.value = query || "default asbestos dataset";
}

function setLoadingState(isLoading, message) {
  if (message) {
    setStatus(message, false);
  }
  els.fetchLiveBtn.disabled = isLoading;
  els.adminResyncBtn.disabled = isLoading;
  els.fetchLiveBtn.textContent = isLoading ? "Loading..." : "Load shared case dataset";
  els.statusProgress.hidden = !isLoading;
}

function populateStateFilter(items) {
  const currentValue = appState.filters.state;
  const states = [...new Set(items.map((item) => item.state).filter(Boolean))].sort();
  els.stateFilter.innerHTML = '<option value="all">All states</option>';
  for (const state of states) {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    els.stateFilter.appendChild(option);
  }
  els.stateFilter.value = states.includes(currentValue) ? currentValue : "all";
}

function renderCourtToggles() {
  els.courtToggles.innerHTML = "";
  for (const court of courtTypes) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `toggle-chip ${appState.filters.courts.has(court) ? "active" : ""}`;
    button.textContent = court;
    button.addEventListener("click", () => {
      if (appState.filters.courts.has(court)) {
        appState.filters.courts.delete(court);
      } else {
        appState.filters.courts.add(court);
      }
      renderCourtToggles();
      render();
    });
    els.courtToggles.appendChild(button);
  }
}

function render() {
  const filtered = getFilteredCases();
  const allCases = appState.rawCases;
  const stateCounts = countBy(filtered, (item) => item.state);
  const exposureCounts = tallyTerms(filtered.flatMap((item) => item.exposures));
  const materialCounts = tallyTerms(filtered.flatMap((item) => item.materials));
  const occupationCounts = buildOccupationCounts(filtered);
  const defendantCounts = tallyTerms(filtered.flatMap((item) => item.defendantCompanies || []));
  const trustCounts = tallyTerms(filtered.flatMap((item) => item.trustFunds || []));
  const industryCounts = tallyTerms(filtered.flatMap((item) => item.industries || []));
  const losses = filtered.filter((item) => item.outcome === "plaintiff_lost");
  const classActions = filtered.filter((item) => item.classAction);

  els.dataMode.textContent = appState.mode === "live" ? "Cached / live CourtListener results" : "Showcase dataset";
  els.recordCount.textContent = String(filtered.length);
  els.lastRefresh.textContent = resolveLastRefreshText();

  populateStateFilter(allCases);
  renderMetrics(filtered, allCases);
  renderInsights(filtered, stateCounts, exposureCounts, materialCounts, occupationCounts, defendantCounts, trustCounts, industryCounts);
  renderTagList(els.exposureList, exposureCounts);
  renderTagList(els.materialList, materialCounts);
  renderOccupationBars(occupationCounts);
  renderTagList(els.defendantList, defendantCounts);
  renderTagList(els.trustList, trustCounts);
  renderTagList(els.industryList, industryCounts);
  renderCaseStack(els.lostCases, losses, "No plaintiff-loss cases match the current filters.");
  renderCaseStack(els.classActions, classActions, "No class actions match the current filters.");
  renderCaseResults(filtered);
  renderMap(stateCounts);
}

function getFilteredCases() {
  return appState.rawCases.filter((item) => {
    const matchesSearch = !appState.filters.search || buildSearchHaystack(item).includes(appState.filters.search);
    const matchesOutcome = appState.filters.outcome === "all" || item.outcome === appState.filters.outcome;
    const matchesClassAction =
      appState.filters.classAction === "all" ||
      (appState.filters.classAction === "class_only" && item.classAction) ||
      (appState.filters.classAction === "individual_only" && !item.classAction);
    const matchesState = appState.filters.state === "all" || item.state === appState.filters.state;
    const matchesCourt = appState.filters.courts.has(item.courtType);

    return matchesSearch && matchesOutcome && matchesClassAction && matchesState && matchesCourt;
  });
}

function buildSearchHaystack(item) {
  return [
    item.caseName,
    item.court,
    item.summary,
    item.state,
    item.courtType,
    item.exposures.join(" "),
    item.materials.join(" "),
    item.occupations.join(" ")
  ]
    .join(" ")
    .toLowerCase();
}

function resolveLastRefreshText() {
  if (appState.mode !== "live") {
    return new Date().toLocaleString();
  }

  try {
    const cachedMeta = readCachedMeta();
    if (cachedMeta?.syncedAt) {
      return new Date(cachedMeta.syncedAt).toLocaleString();
    }
  } catch (error) {
    console.error("Failed to read cache metadata", error);
  }

  return new Date().toLocaleString();
}

function readCachedMeta() {
  try {
    return JSON.parse(localStorage.getItem(LIVE_CACHE_META_KEY) || "null");
  } catch {
    return null;
  }
}

function renderMetrics(filtered, allCases) {
  const winCount = filtered.filter((item) => item.outcome === "plaintiff_won").length;
  const lossCount = filtered.filter((item) => item.outcome === "plaintiff_lost").length;
  const classCount = filtered.filter((item) => item.classAction).length;
  const stateCount = new Set(filtered.map((item) => item.state)).size;
  const topCourt = topEntries(countBy(filtered, (item) => item.courtType), 1)[0];

  const metrics = [
    {
      label: "Loaded asbestos matters",
      value: filtered.length,
      subtle: `${allCases.length} total in current dataset`
    },
    {
      label: "Plaintiff losses",
      value: lossCount,
      subtle: `${filtered.length ? Math.round((lossCount / filtered.length) * 100) : 0}% of visible cases`
    },
    {
      label: "Class or mass actions",
      value: classCount,
      subtle: "Separate section below"
    },
    {
      label: "Geographies on map",
      value: stateCount,
      subtle: topCourt ? `Most visible: ${topCourt.label}` : "No active court data"
    },
    {
      label: "Plaintiff wins",
      value: winCount,
      subtle: "Inferred from opinion snippets and labels"
    }
  ];

  els.metricsGrid.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <div class="metric-label">${metric.label}</div>
          <div class="metric-value">${metric.value}</div>
          <div class="metric-subtle">${metric.subtle}</div>
        </article>
      `
    )
    .join("");
}

function renderInsights(filtered, stateCounts, exposureCounts, materialCounts, occupationCounts, defendantCounts, trustCounts, industryCounts) {
  const topState = topEntries(stateCounts, 1)[0];
  const topExposure = topEntries(exposureCounts, 1)[0];
  const topMaterial = topEntries(materialCounts, 1)[0];
  const topOccupation = topEntries(filterOutKeys(occupationCounts, ["occupation not specified"]), 1)[0];
  const topDefendant = topEntries(defendantCounts, 1)[0];
  const topTrust = topEntries(trustCounts, 1)[0];
  const topIndustry = topEntries(industryCounts, 1)[0];

  const insights = [
    {
      title: "Venue concentration",
      body: topState
        ? `${topState.label} is the busiest visible venue geography right now, suggesting a concentration of asbestos litigation or appellate activity there.`
        : "Load or widen filters to see geographic concentration."
    },
    {
      title: "Exposure pattern",
      body: topExposure
        ? `The most common exposure pattern in the visible dataset is ${topExposure.label}, which makes it a strong candidate for its own drill-down narrative and chart.`
        : "No exposure signals are available under the current filters."
    },
    {
      title: "Material signal",
      body: topMaterial
        ? `${topMaterial.label} is the leading asbestos-linked material in view, which is useful for a product-focused litigation lens.`
        : "No material signals are available under the current filters."
    },
    {
      title: "Occupation trend",
      body: topOccupation
        ? `${topOccupation.label} appears most often among explicitly named occupations in the visible cases.`
        : "Visible cases often indicate occupational exposure without naming a specific job title."
    },
    {
      title: "Defendant recurrence",
      body: topDefendant
        ? `${topDefendant.label} appears most often among the defendant and manufacturer names detected in the visible cases.`
        : "No recurring defendant or manufacturer signal is visible under the current filters."
    },
    {
      title: "Trust recurrence",
      body: topTrust
        ? `${topTrust.label} appears most often among the trusts and compensation funds detected in the visible cases.`
        : "No recurring trust or fund signal is visible under the current filters."
    },
    {
      title: "Industry pattern",
      body: topIndustry
        ? `${topIndustry.label} is the strongest industry cluster in the current slice.`
        : "No industry pattern is visible under the current filters."
    },
    {
      title: "Court mix",
      body:
        filtered.length > 0
          ? `${new Set(filtered.map((item) => item.courtType)).size} court categories are active in the current slice, so the court-wise toggles are already showing cross-system spread.`
          : "No cases match the active filter set."
    }
  ];

  els.insightList.innerHTML = insights
    .map(
      (item) => `
        <article class="insight-item">
          <strong>${item.title}</strong>
          <p>${item.body}</p>
        </article>
      `
    )
    .join("");
}

function renderTagList(container, tally) {
  const entries = topEntries(tally, 16);
  if (!entries.length) {
    container.innerHTML = '<div class="empty-state">No matching signals in the current filter set.</div>';
    return;
  }

  container.innerHTML = entries
    .map((entry) => `<span class="tag-pill">${entry.label} · ${entry.value}</span>`)
    .join("");
}

function renderOccupationBars(tally) {
  const entries = topEntries(tally, 10);
  if (!entries.length) {
    els.occupationTrends.innerHTML =
      '<div class="empty-state">No occupation data matches the current filters.</div>';
    return;
  }

  const max = entries[0].value;
  els.occupationTrends.innerHTML = entries
    .map(
      (entry) => `
        <div class="bar-item">
          <div class="bar-label">
            <span>${entry.label}</span>
            <span>${entry.value}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${(entry.value / max) * 100}%"></div>
          </div>
        </div>
      `
    )
    .join("");
}

function buildOccupationCounts(items) {
  const tally = {};
  for (const item of items) {
    if (Array.isArray(item.occupations) && item.occupations.length) {
      for (const occupation of item.occupations) {
        tally[occupation] = (tally[occupation] || 0) + 1;
      }
    } else if (item.exposures.includes("occupational exposure")) {
      tally["occupation not specified"] = (tally["occupation not specified"] || 0) + 1;
    }
  }
  return tally;
}

function filterOutKeys(tally, excludedKeys) {
  return Object.fromEntries(
    Object.entries(tally).filter(([key]) => !excludedKeys.includes(key))
  );
}

function renderCaseStack(container, items, emptyMessage) {
  if (!items.length) {
    container.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
    return;
  }

  container.innerHTML = items.slice(0, 8).map(renderCaseCard).join("");
}

function renderCaseResults(items) {
  if (!items.length) {
    els.caseResults.innerHTML = '<div class="empty-state">No cases match the current filters.</div>';
    return;
  }

  els.caseResults.innerHTML = items.slice(0, 24).map(renderCaseCard).join("");
}

function renderCaseCard(item) {
  const excerpt = buildExcerpt(item.summary);
  const snapshot = item.snapshot || "asbestos litigation matter";
  return `
    <article class="case-card">
      <div class="case-title-row">
        <div>
          <h3><a href="${item.absolute_url}" target="_blank" rel="noreferrer">${item.caseName}</a></h3>
          <div class="case-meta">${item.court} · ${item.dateFiled} · ${item.state}</div>
        </div>
        <span class="badge ${badgeClass(item.outcome)}">${outcomeLabels[item.outcome] || "Unknown"}</span>
      </div>
      <div class="case-summary-label">Case snapshot</div>
      <p class="case-summary">${snapshot}</p>
      <div class="case-summary-label">Matched excerpt</div>
      <p class="case-summary">${excerpt}</p>
      <div class="case-tags">
        <span class="case-tag">${item.courtType}</span>
        ${item.classAction ? '<span class="case-tag">Class action signal</span>' : ""}
        ${item.exposures.slice(0, 2).map((term) => `<span class="case-tag">${term}</span>`).join("")}
        ${item.materials.slice(0, 2).map((term) => `<span class="case-tag">${term}</span>`).join("")}
        ${item.occupations.slice(0, 2).map((term) => `<span class="case-tag">${term}</span>`).join("")}
        ${(item.companies || []).slice(0, 2).map((term) => `<span class="case-tag">${term}</span>`).join("")}
        ${(item.industries || []).slice(0, 2).map((term) => `<span class="case-tag">${term}</span>`).join("")}
      </div>
    </article>
  `;
}

function buildExcerpt(text) {
  const cleaned = stripHtml(text || "");
  if (!cleaned) return "No excerpt available for this result.";
  if (cleaned.length <= 320) return cleaned;
  return `${cleaned.slice(0, 317).trimEnd()}...`;
}

function badgeClass(outcome) {
  if (outcome === "plaintiff_lost") return "loss";
  if (outcome === "plaintiff_won") return "win";
  if (outcome === "mixed") return "mixed";
  return "neutral";
}

function renderMap(stateCounts) {
  const max = Math.max(...Object.values(stateCounts), 1);

  els.mapLegend.innerHTML = [0.25, 0.5, 0.8, 1]
    .map((step) => {
      const color = getHeatColor(step);
      return `<span class="legend-item"><span class="legend-swatch" style="background:${color}"></span>${Math.round(step * max)}+ cases</span>`;
    })
    .join("");

  els.usMap.innerHTML = "";

  for (const state of stateLayout) {
    const count = stateCounts[state.abbr] || 0;
    const intensity = count / max || 0;
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `state-tile ${appState.filters.state === state.abbr ? "active" : ""}`;
    tile.style.gridColumn = String(state.col);
    tile.style.gridRow = String(state.row);
    tile.style.background = getHeatColor(intensity);
    tile.innerHTML = `
      <span class="state-abbr">${state.abbr}</span>
      <span class="state-count">${count} case${count === 1 ? "" : "s"}</span>
    `;
    tile.addEventListener("click", () => {
      appState.filters.state = appState.filters.state === state.abbr ? "all" : state.abbr;
      els.stateFilter.value = appState.filters.state;
      render();
    });
    els.usMap.appendChild(tile);
  }
}

function getHeatColor(intensity) {
  if (intensity <= 0) return "rgba(255, 252, 247, 0.88)";
  if (intensity < 0.25) return "rgba(237, 213, 164, 0.66)";
  if (intensity < 0.5) return "rgba(215, 157, 81, 0.72)";
  if (intensity < 0.8) return "rgba(194, 101, 46, 0.78)";
  return "rgba(174, 58, 29, 0.9)";
}

function countBy(items, selector) {
  return items.reduce((acc, item) => {
    const key = selector(item) || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function tallyTerms(items) {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function topEntries(map, limit) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

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
