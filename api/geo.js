// File: /api/geo.js
export default async function handler(req, res) {
  try {
    const { ip } = req.query;
    if (!ip) {
      return res.status(400).json({ error: "Missing ?ip= parameter" });
    }

    const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const data = await response.json();

    // Add CORS headers so your frontend can call this endpoint
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch IP data" });
  }
}
