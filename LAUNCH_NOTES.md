# Launch notes

This site is a demo on a workers.dev address. Before it goes live on the salon's own domain, do all of the following.

1. **Remove the noindex.** Delete the `<meta name="robots" content="noindex, nofollow">` line (and the DEMO ONLY comment above it) from every page: `index.html`, `privacy.html`, `terms.html` and `404.html`. Also delete the `X-Robots-Tag: noindex` line (and its comment) from `_headers`. Until you do this, search engines are told to ignore the site.
2. **Replace the placeholder prices.** In `script.js`, replace every price in `SITE.services` (the lines under `// PLACEHOLDER PRICES`) with the salon's real price list.
3. **Confirm every image.** Each image must be the salon's own photo or from a free-licence library. The hero and gallery photos are Unsplash stock photos, so swap them for the salon's own work if possible. The logo was supplied by the salon owner. See the image audit in the project thread.
4. **Owner review of the legal pages.** The salon owner should read `privacy.html` and `terms.html` and confirm they are accurate. Add the salon's ABN to `SITE.abn` in `script.js` if there is one, and it will show in the footer.
5. **Domain and HTTPS.** Point the domain's DNS at the site and turn on "Always Use HTTPS" in Cloudflare.
6. **Social preview image.** The Open Graph and Twitter tags use a relative image path (`images/hero.jpg`). Once the real domain is known, change `og:image` and `twitter:image` on every page to the full web address, for example `https://www.example.com.au/images/hero.jpg`, so link previews show the picture.
7. **Custom 404 page.** `404.html` only shows for missing addresses if the Cloudflare project is set to serve it (for Workers static assets, `not_found_handling` set to `404-page`).

## Editing the page style
The same CSS block is repeated inside all four pages and the hash in `_headers` covers it. If you change the CSS, make the identical change in every page and update the `style-src` sha256 hash in `_headers`.
