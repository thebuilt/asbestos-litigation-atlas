"use strict";

const {
  setCors,
  makeCacheKey,
  saveSharedCache,
  fetchCourtListenerCases
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

  try {
    const { cases, progress } = await fetchCourtListenerCases(token, extraQuery);
    const responsePayload = {
      ok: true,
      count: cases.length,
      progress,
      cases,
      source: "courtlistener",
      syncedAt: new Date().toISOString()
    };
    await saveSharedCache(makeCacheKey(extraQuery), responsePayload);
    res.status(200).json(responsePayload);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown server error"
    });
  }
};
