
export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("s1") || "img1";

    if (!/^[a-zA-Z0-9_-]{1,50}$/.test(key)) {
      return Response.json(
        { error: "Invalid key" },
        { status: 400 }
      );
    }

    if (!env.LANDING_IMAGES) {
      return Response.json(
        { error: "KV binding LANDING_IMAGES is missing" },
        { status: 500 }
      );
    }

    const imageUrl = await env.LANDING_IMAGES.get(key);

    if (!imageUrl) {
      return Response.json(
        { error: "Image not found", key },
        { status: 404 }
      );
    }

    let parsed;

    try {
      parsed = new URL(imageUrl);
    } catch {
      return Response.json(
        { error: "Invalid image URL" },
        { status: 500 }
      );
    }

    if (parsed.protocol !== "https:") {
      return Response.json(
        { error: "HTTPS required" },
        { status: 400 }
      );
    }

    return Response.json(
      { src: parsed.href },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("Image API failed:", error);

    return Response.json(
      { error: "Image API internal error" },
      { status: 500 }
    );
  }
}
