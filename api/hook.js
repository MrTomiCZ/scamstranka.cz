export default async function handler(req, res) {
  try {
    const { payload } = req.body;
    const webhookUrl = process.env.DISCORD_WEBHOOK;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(await response.text());
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
}