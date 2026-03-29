"use strict";

const {
  setCors,
  makeCacheKey,
  loadSharedCache,
  saveSharedCache,
  loadSyncState,
  saveSyncState,
  clearSyncState,
  fetchCourtListenerCasesIncremental
} = require("./_search-core");

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (!["GET", "POST"].includes(req.method)) {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const adminToken = req.headers["x-admin-resync-token"];
  if (!process.env.ADMIN_RESYNC_TOKEN || adminToken !== process.env.ADMIN_RESYNC_TOKEN) {
    res.status(403).json({ error: "Forbidden. Invalid admin resync token." });
    return;
  }

  const token = process.env.COURTLISTENER_API_TOKEN;
  if (!token) {
    res.status(400).json({ error: "Missing COURTLISTENER_API_TOKEN in project settings." });
    return;
  }

  const extraQuery = typeof req.query.extraQuery === "string" ? req.query.extraQuery.trim() : "";
  const cacheKey = makeCacheKey(extraQuery);

  try {
    const existingPayload = await loadSharedCache(cacheKey);
    const existingCases = Array.isArray(existingPayload?.cases) ? existingPayload.cases : [];
    const syncState = await loadSyncState(cacheKey);
    const batch = await fetchCourtListenerCasesIncremental(token, extraQuery, syncState);
    const mergedCases = dedupeCases([...existingCases, ...batch.cases]);
    const responsePayload = {
      ok: true,
      count: mergedCases.length,
      progress: batch.progress,
      cases: mergedCases,
      source: "courtlistener",
      syncedAt: new Date().toISOString(),
      hasMore: batch.hasMore,
      completedPlans: batch.planIndex + 1,
      totalPlans: batch.totalPlans,
      currentPlan: batch.plan.label
    };
    await saveSharedCache(cacheKey, responsePayload);
    if (batch.hasMore) {
      await saveSyncState(cacheKey, {
        planIndex: batch.nextPlanIndex,
        updatedAt: new Date().toISOString()
      });
    } else {
      await clearSyncState(cacheKey);
    }
    res.status(200).json(responsePayload);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown server error"
    });
  }
};

function dedupeCases(items) {
  const seen = new Map();
  for (const item of items) {
    const key = `${item.caseName}|${item.court}|${item.dateFiled}`;
    if (!seen.has(key)) seen.set(key, item);
  }
  return Array.from(seen.values());
}
