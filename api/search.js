"use strict";

const {
  setCors,
  makeCacheKey,
  loadSharedCache
} = require("./_search-core");

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
  const cacheKey = makeCacheKey(extraQuery);
  const cachedPayload = await loadSharedCache(cacheKey);

  if (!cachedPayload) {
    res.status(404).json({
      error: "No shared dataset is available yet for this query. An admin resync is required first."
    });
    return;
  }

  res.status(200).json({
    ...cachedPayload,
    source: "shared_cache"
  });
};
