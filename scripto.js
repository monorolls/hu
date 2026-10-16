(async function () {
  const params = new URLSearchParams(location.search);
  const key = params.get("s1") || "img1";
  const img = document.getElementById("coverImg");

  if (!img) return;

  try {
    const response = await fetch(
      "/api/image?s1=" + encodeURIComponent(key),
      { cache: "no-store" }
    );

    if (!response.ok) throw new Error("Image not found");

    const data = await response.json();

    if (data.src) img.src = data.src;
  } catch (error) {
    console.error("Image loading failed:", error);
  }
})();