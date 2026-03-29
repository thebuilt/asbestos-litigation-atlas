"use strict";

const fs = require("fs/promises");
const path = require("path");

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const casesPath = path.join(process.cwd(), "data", "asbestos-cases.json");
    const metaPath = path.join(process.cwd(), "data", "asbestos-meta.json");
    const [casesText, metaText] = await Promise.all([
      fs.readFile(casesPath, "utf8"),
      fs.readFile(metaPath, "utf8")
    ]);
    const cases = JSON.parse(casesText);
    const meta = JSON.parse(metaText);
    res.status(200).json({
      ok: true,
      source: "saved_dataset",
      cases: Array.isArray(cases) ? cases : [],
      syncedAt: meta.syncedAt || null,
      totalPlans: meta.totalPlans || null,
      completedPlans: meta.completedPlans || null,
      hasMore: false
    });
  } catch (error) {
    res.status(404).json({
      error: "Saved dataset not found. Run the ingestion script and redeploy the site."
    });
  }
};
