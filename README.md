# Cedar & Sage Hair Studio

Static site: `index.html` (page and CSS), `script.js` (all the salon's details plus the page logic), `images/`. No build step. Deploy the repo root to Cloudflare with no build command.

## Editing the site
Open `script.js`. The `SITE` object at the very top holds the phone number, address, social links, opening hours, services with prices, and gallery photos. Everything on the page is built from it, and each part has plain-English comments and an example line.

## Before it goes live
- Replace the placeholder prices in `SITE.services` with the salon's real price list.
- The gallery photos are free stock photos from Unsplash. Swap them for the salon's own work when available.
- Remove the `noindex` meta tag in `index.html` when the owner approves the site.
- Turn on Always Use HTTPS in Cloudflare after connecting the domain.
- The structured data (JSON-LD) in the `<head>` of `index.html` repeats the phone and hours for search engines, so update it if those change.

## Security headers (`_headers`)
The Content-Security-Policy only allows the exact inline CSS and GSAP scripts from cdnjs.cloudflare.com. If you edit the `<style>` block in `index.html`, update the `style-src` sha256 hash in `_headers` to match, or the page will lose its styling. If you change the GSAP version, update its `integrity` hash in `index.html`.
