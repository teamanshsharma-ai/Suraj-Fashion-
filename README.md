# SURAJ FASHION: setup guide

A static website: no build step, no database. Open `index.html` or host the folder as-is.

## Run it on your computer
1. Unzip the folder.
2. Double-click `index.html` (or run `python3 -m http.server` inside the folder and open http://localhost:8000).

## Things you MUST edit before launch
| File | What to change |
|---|---|
| `js/config.js` | WhatsApp number, Instagram link, email, address, map link, delivery fee, reviews, policies. Anything left `null` stays hidden. |
| `js/products.js` | **Prices are sample placeholders.** Set real prices, sizes, stock, materials, and mark real best sellers. Then set `pricesConfirmed: true` in `config.js` to hide the red notice bar. |

To add a product: copy one block in `products.js`, give it a new unique `id`, and put its photo in `images/products/`.

## Free hosting (Netlify Drop)
1. Go to https://app.netlify.com/drop
2. Drag the whole `suraj-fashion` folder onto the page.
3. You get a free `https://….netlify.app` link. Put it in `siteUrl` in `config.js`.
(GitHub Pages and Cloudflare Pages also work: upload the folder as-is.)

## How ordering works
- The customer fills the checkout form and taps **Place order on WhatsApp**.
- WhatsApp opens with the full order written out, addressed to +91 85649 59559.
- **The customer must press Send.** Until then the store has received nothing, and the site says so.
- Nothing is stored on a server. The cart is kept only in the customer's own browser.

## Known limitations
- No order database or admin dashboard (would need a secure backend and WhatsApp Business API).
- Product changes require editing `products.js` and re-uploading.
- Each product has one photo (the ones supplied). Add more paths to `images` for a gallery.
- Prices, sizes and stock are placeholders until you edit them. "Best sellers" stays hidden until you flag real ones.
- Naruto-inspired styling uses original shapes and a generic 忍 character only. No official artwork, and the site states it is unaffiliated.
- Fonts load from Google Fonts (needs internet); a system font is used if offline.
- No newsletter, customer reviews, Instagram or map until real details are added in `config.js`.
- The store photos with customers/staff (`store-4`) were left out for privacy.

## Testing done (automated, headless Chromium)
No horizontal overflow at 320/360/390/768/1440px on all pages; no JS errors; no broken images; size validation; add/qty/remove/total maths; cart persists on reload; search, category filter and price sort; mobile menu; unknown product shows 404 view; invalid checkout blocks WhatsApp; valid checkout builds a `wa.me/918564959559` link with correct encoding of `&`, quotes, `#`, line breaks and `₹`.
**Not tested:** real iPhone/Android devices, or actually sending in WhatsApp. Please try one real order on your phone.
