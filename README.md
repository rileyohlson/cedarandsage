# Cedar & Sage Hair Studio

Static site (a single `index.html` with inline CSS, no build step, no JavaScript, no third-party requests).
Deploy the repo root to Cloudflare Pages with no build command.

## Facts used (from the owner)
- Name: Cedar & Sage Hair Studio
- Description: a relaxing hair salon in central Wagga Wagga
- Address: 135 Docker St, Wagga Wagga NSW 2650

## Still to fill in (yellow `[brackets]` on the page)
- About text, real services and prices, booking link, and real reviews on the reviews section of `index.html` (placeholders only; never invent reviews)
- Google rating (5.0 out of 5 from 1 review) is live; if it changes, update `--rating-whole`, `--rating-tenth`, `--review-count` in `.reviews-home` and the singular "review" in `index.html`
- Photos (with alt text), once the owner supplies them
- Remove the `noindex` meta tag in `index.html` before launch
- Turn on Always Use HTTPS in Cloudflare after connecting the domain
- If you edit the CSS in `index.html`, update the `style-src` sha256 hash in `_headers` to match (the CSP blocks inline styles otherwise)
