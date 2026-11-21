// BULBA AI: Gemini API-ға қауіпсіз делдал. Кілт тек Netlify ортасында (GEMINI_API_KEY) сақталады.
export default async (req) => {
  if (req.method !== "POST") return Response.json({ error: "method" }, { status: 405 });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ text: "Сервер бапталмаған: GEMINI_API_KEY жоқ." }, { status: 500 });
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "json" }, { status: 400 }); }
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-10)
    .map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: String(m.content || "").slice(0, 2000) }] }));
  if (!msgs.length || msgs[0].role !== "user") return Response.json({ error: "messages" }, { status: 400 });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: String(body.context || "").slice(0, 4000) }] },
        contents: msgs,
        generationConfig: { maxOutputTokens: 700 },
      }),
    });
    const d = await r.json();
    if (!r.ok) return Response.json({ text: "Gemini қатесі: " + (d.error?.message || r.status) }, { status: 502 });
    const text = d.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "Жауап алу мүмкін болмады.";
    return Response.json({ text });
  } catch (e) {
    return Response.json({ text: "Gemini-ге қосылу мүмкін болмады." }, { status: 502 });
  }
};
