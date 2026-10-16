
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const key = url.searchParams.get("s1") || "img1";

  if (!/^[a-zA-Z0-9_-]{1,50}$/.test(key)) {
    return Response.json({ error: "Invalid key" }, { status: 400 });
  }

  const imageUrl = await env.LANDING_IMAGES.get(key);

  if (!imageUrl) {
    return Response.json({ error: "Image not found" }, { status: 404 });
  }

  let parsed;

  try {
    parsed = new URL(imageUrl);
  } catch {
    return Response.json({ error: "Invalid image URL" }, { status: 500 });
  }

  if (parsed.protocol !== "https:") {
    return Response.json({ error: "HTTPS required" }, { status: 400 });
  }

  return Response.json(
    { src: parsed.href },
    { headers: { "Cache-Control": "no-store" } }
  );
}
