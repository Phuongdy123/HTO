export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const BIZFLY_URL = "https://crm.bizfly.vn/public-api/public/webhook?id=XXXX&crm_token=XXXX&project_id=XXXX";

  // ⚠️ Chuyển body JSON sang form-urlencoded
  const params = new URLSearchParams(req.body).toString();

  try {
    const bizflyRes = await fetch(BIZFLY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const text = await bizflyRes.text();
    return res.status(200).json({ ok: true, bizfly: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}