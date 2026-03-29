"use strict";

const fs = require("fs/promises");
const path = require("path");
const {
  fetchCourtListenerCases,
  LOCAL_INGEST_MAX_PAGES,
  LOCAL_INGEST_MAX_ITEMS_PER_PLAN
} = require("../api/_search-core");

async function main() {
  const token = process.env.COURTLISTENER_API_TOKEN;
  if (!token) {
    throw new Error("Missing COURTLISTENER_API_TOKEN in the environment.");
  }

  const extraQuery = readArg("--query") || "";
  const casesPath = path.join(process.cwd(), "data", "asbestos-cases.json");
  const metaPath = path.join(process.cwd(), "data", "asbestos-meta.json");

  const { cases, progress } = await fetchCourtListenerCases(token, extraQuery, {
    maxPagesPerQuery: LOCAL_INGEST_MAX_PAGES,
    maxItemsPerPlan: LOCAL_INGEST_MAX_ITEMS_PER_PLAN,
    includeHeavyPlans: true
  });

  await fs.mkdir(path.dirname(casesPath), { recursive: true });
  await fs.writeFile(casesPath, JSON.stringify(cases, null, 2));
  await fs.writeFile(
    metaPath,
    JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        count: cases.length,
        extraQuery,
        completedPlans: progress.length,
        totalPlans: progress.length,
        progress
      },
      null,
      2
    )
  );

  process.stdout.write(
    `Saved ${cases.length} normalized cases to ${casesPath}\nSaved metadata to ${metaPath}\n`
  );
}

function readArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return "";
  return process.argv[index + 1] || "";
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
