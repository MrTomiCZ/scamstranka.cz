export default async function handler(req, res) {
  const { payload } = req.body;

  console.log(JSON.stringify(payload, null, 2));  // what the fuck are you doing handler

  const discordRes = await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload) // must be the full object
  });

  if (!discordRes.ok) {
    const text = await discordRes.text();
    return res.status(200).json({ error: text });
  }

  res.status(200).json({ ok: true });
}