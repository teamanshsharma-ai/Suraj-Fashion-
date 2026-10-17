/* ============================================================
   SURAJ FASHION — CENTRAL SETTINGS  (edit this file only)
   Anything set to null is hidden from the website until filled.
   ============================================================ */
window.SITE = {
  brand: "SURAJ FASHION",
  whatsappNumber: "918564959559",          // international format, digits only
  whatsappDisplay: "+91 85649 59559",
  instagramUrl: null,                      // e.g. "https://instagram.com/yourhandle"
  email: null,
  address: null,                           // store address, only if you want it shown
  mapUrl: null,                            // verified Google Maps link, only if you have one
  siteUrl: null,                           // e.g. "https://surajfashion.netlify.app" (for sharing previews)
  currency: "₹",
  deliveryFee: null,                       // number (e.g. 60) once the store sets a real fee; null = "confirmed by store"
  pricesConfirmed: false,                  // set true after you enter real prices in products.js (hides the sample-price notice)
  foundedYear: null,                       // e.g. 2019 — hidden while null
  reviews: [],                             // real reviews only: { name:"", text:"", rating:5 }
  policies: [
    "Cash on Delivery: availability and delivery charges are confirmed by the store on WhatsApp before dispatch.",
    "Your order is only a request until the store confirms it on WhatsApp.",
    "Please confirm size, colour and availability in the WhatsApp chat before paying."
  ],
  returnsPolicy: null,                     // add your own return/exchange text here when ready
  sizeGuideNote: "General reference only (chest, in inches). Fits differ by product, so ask us on WhatsApp if unsure.",
  sizeGuide: [
    ["XS", "34"], ["S", "36"], ["M", "38"], ["L", "40"], ["XL", "42"], ["XXL", "44"]
  ],
  collections: [
    { id: "shadow-black", name: "Shadow Black", blurb: "Washed blacks, charcoal and graphic spiders for after-dark streets." },
    { id: "denim-works", name: "Denim Works", blurb: "Wide-leg, straight and washed denim in every shade." },
    { id: "street-utility", name: "Street Utility", blurb: "Cargo pockets and track-pant stripes built for moving." },
    { id: "plaid-stripe", name: "Plaid & Stripe", blurb: "Button-ups in checks and stripes, easy to layer." }
  ]
};
