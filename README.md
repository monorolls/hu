# RealPrizeBonus image-by-query system

This project uses Cloudflare Pages Functions + Workers KV to select the cover image from a URL query parameter.

## Files

- `index.html` — landing page with a small script that asks `/api/image?s1=...` for the selected image.
- `functions/api/image.js` — Pages Function that reads the selected key from the `LANDING_IMAGES` KV binding.

## Cloudflare setup

1. In Workers & Pages > KV, create a namespace named `LandingImages` (if it does not already exist).
2. Add KV entries. Example:
   - Key: `img1`
   - Value: `https://cdn.jsdelivr.net/gh/monorolls/img@main/tinyhouse4.webp`
   - Key: `img2`
   - Value: `https://example.com/your-car-image.webp` (replace with a real HTTPS image URL)
3. In the Cloudflare Pages project settings, add a KV namespace binding:
   - Variable name: `LANDING_IMAGES`
   - KV namespace: `LandingImages`
4. Deploy this project using Git integration or Wrangler. Cloudflare Pages Functions are not supported by Direct Upload.
5. Test:
   - `https://YOUR-DOMAIN/v/?s1=img1` (if the landing page is served from `/v/`)
   - `https://YOUR-DOMAIN/?s1=img1` (if `index.html` is at the site root)
   - `https://YOUR-DOMAIN/api/image?s1=img1` should return JSON with a `src` field.

## Adding more images

Add a new KV entry for each image. The key must match the `s1` parameter, e.g. `img2` in KV is selected by `?s1=img2`. No image URL needs to be hardcoded into `index.html`.

## Important notes

- The page text currently remains the same regardless of image key. Only the cover image changes.
- Replace the example `img2` URL with your own real HTTPS image URL.
- Keep the existing `22011.js` script if your current page depends on it.
