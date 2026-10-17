/* ============================================================
   PRODUCT CATALOGUE — edit this file to change what is sold.
   PRICES BELOW ARE SAMPLE PLACEHOLDERS: replace with real prices.
   - sizes:    sizes you actually have, e.g. ["M","L","XL"]
   - stock:    a real number, or null if you do not track stock
   - soldOut:  true shows a clear "Sold out" state
   - material: add real fabric info (hidden while null)
   - images:   list of image paths; more than one gives a thumbnail gallery
   - bestSeller: set true only for items that really sell best
   - added:    higher number = newer (used for "Newest" sorting)
   ============================================================ */
window.PRODUCTS = [
 {
  "id": "shirt-1",
  "name": "Blue Striped Shirt",
  "category": "Shirts",
  "collection": "plaid-stripe",
  "price": 799,
  "images": [
   "images/products/shirt-1.jpg"
  ],
  "description": "Light blue pinstripe button-up with a relaxed fit. Wear it open over a tee or buttoned up.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": false,
  "bestSeller": false,
  "added": 100
 },
 {
  "id": "tee-spider-red",
  "name": "Red Spider Oversized Tee",
  "category": "Oversized Tees",
  "collection": "shadow-black",
  "price": 899,
  "images": [
   "images/products/shirt-2.jpg"
  ],
  "description": "Washed black oversized tee with a bold red spider graphic and dropped shoulders.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": true,
  "bestSeller": false,
  "added": 99
 },
 {
  "id": "shirt-3",
  "name": "Washed Black Overshirt",
  "category": "Shirts",
  "collection": "shadow-black",
  "price": 1399,
  "images": [
   "images/products/shirt-3.jpg"
  ],
  "description": "Boxy washed-black overshirt with twin chest pockets and a curved hem.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": true,
  "bestSeller": false,
  "added": 98
 },
 {
  "id": "shirt-4",
  "name": "Slate Blue Shirt",
  "category": "Shirts",
  "collection": "plaid-stripe",
  "price": 849,
  "images": [
   "images/products/shirt-4.jpg"
  ],
  "description": "Soft slate-blue button-up with a chest pocket. A clean everyday layer.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 97
 },
 {
  "id": "shirt-5",
  "name": "Brown Plaid Shirt",
  "category": "Shirts",
  "collection": "plaid-stripe",
  "price": 999,
  "images": [
   "images/products/shirt-5.jpg"
  ],
  "description": "Warm brown plaid shirt with a chest pocket and straight hem.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": true,
  "bestSeller": false,
  "added": 96
 },
 {
  "id": "jacket-flame",
  "name": "Flame Print Zip Jacket",
  "category": "Jackets",
  "collection": "street-utility",
  "price": 1999,
  "images": [
   "images/products/shirt-6.jpg"
  ],
  "description": "Cream zip-up jacket with a black flame print running down the body and sleeves.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": true,
  "bestSeller": false,
  "added": 95
 },
 {
  "id": "tee-spider-grey",
  "name": "Acid-Wash Spider Oversized Tee",
  "category": "Oversized Tees",
  "collection": "shadow-black",
  "price": 899,
  "images": [
   "images/products/shirt-7.jpg"
  ],
  "description": "Charcoal acid-wash oversized tee with a small spider print on the chest.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": false,
  "bestSeller": false,
  "added": 94
 },
 {
  "id": "shirt-8",
  "name": "Navy Plaid Shirt",
  "category": "Shirts",
  "collection": "plaid-stripe",
  "price": 999,
  "images": [
   "images/products/shirt-8.jpg"
  ],
  "description": "Navy and white plaid shirt with snap-style buttons and a chest pocket.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 93
 },
 {
  "id": "shirt-9",
  "name": "Taupe Plaid Shirt",
  "category": "Shirts",
  "collection": "plaid-stripe",
  "price": 999,
  "images": [
   "images/products/shirt-9.jpg"
  ],
  "description": "Taupe check shirt in a muted palette with a chest pocket.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 92
 },
 {
  "id": "jacket-black",
  "name": "Black Zip Jacket",
  "category": "Jackets",
  "collection": "shadow-black",
  "price": 1999,
  "images": [
   "images/products/shirt-10.jpg"
  ],
  "description": "Black collared zip jacket with a smooth finish and a boxy cut.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": true,
  "bestSeller": false,
  "added": 91
 },
 {
  "id": "cargo-black",
  "name": "Black Contrast-Stitch Cargo",
  "category": "Cargo Pants",
  "collection": "shadow-black",
  "price": 1499,
  "images": [
   "images/products/pant-1.jpg"
  ],
  "description": "Black cargo pants with contrast stitching, large side pockets and a straight leg.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": true,
  "bestSeller": false,
  "added": 90
 },
 {
  "id": "jeans-grey",
  "name": "Grey Acid-Wash Jeans",
  "category": "Jeans",
  "collection": "denim-works",
  "price": 1199,
  "images": [
   "images/products/pant-2.jpg"
  ],
  "description": "Grey acid-wash straight jeans with light distressing.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 89
 },
 {
  "id": "track-grey",
  "name": "Grey Piped Track Pants",
  "category": "Track Pants",
  "collection": "street-utility",
  "price": 899,
  "images": [
   "images/products/pant-3.jpg"
  ],
  "description": "Grey track pants with white side piping and elasticated cuffs.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 88
 },
 {
  "id": "cargo-blue",
  "name": "Blue Cargo Jeans",
  "category": "Cargo Pants",
  "collection": "street-utility",
  "price": 1499,
  "images": [
   "images/products/pant-4.jpg"
  ],
  "description": "Mid-blue denim cargo with side pockets and a relaxed straight leg.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": false,
  "bestSeller": false,
  "added": 87
 },
 {
  "id": "jeans-light-1",
  "name": "Light Blue Wide-Leg Jeans",
  "category": "Jeans",
  "collection": "denim-works",
  "price": 1299,
  "images": [
   "images/products/pant-5.jpg"
  ],
  "description": "Light-wash wide-leg jeans with a loose, easy shape.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": true,
  "bestSeller": false,
  "added": 86
 },
 {
  "id": "cargo-grey",
  "name": "Grey Utility Cargo",
  "category": "Cargo Pants",
  "collection": "street-utility",
  "price": 1399,
  "images": [
   "images/products/pant-6.jpg"
  ],
  "description": "Grey cargo pants with large flap pockets and a straight fit.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 85
 },
 {
  "id": "jeans-light-2",
  "name": "Sky Blue Baggy Jeans",
  "category": "Jeans",
  "collection": "denim-works",
  "price": 1299,
  "images": [
   "images/products/pant-7.jpg"
  ],
  "description": "Faded sky-blue baggy jeans with a wide leg.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 84
 },
 {
  "id": "jeans-black",
  "name": "Washed Black Wide Jeans",
  "category": "Jeans",
  "collection": "shadow-black",
  "price": 1299,
  "images": [
   "images/products/pant-8.jpg"
  ],
  "description": "Washed black wide-leg jeans with a low-slung fit.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": true,
  "bestSeller": false,
  "added": 83
 },
 {
  "id": "jeans-indigo",
  "name": "Dark Indigo Straight Jeans",
  "category": "Jeans",
  "collection": "denim-works",
  "price": 1199,
  "images": [
   "images/products/pant-9.jpg"
  ],
  "description": "Dark indigo straight-leg jeans. A classic everyday wash.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": false,
  "isNew": false,
  "bestSeller": false,
  "added": 82
 },
 {
  "id": "track-black",
  "name": "Black Piped Drawstring Pants",
  "category": "Track Pants",
  "collection": "shadow-black",
  "price": 999,
  "images": [
   "images/products/pant-10.jpg"
  ],
  "description": "Black wide-leg pants with a white drawstring and curved white piping.",
  "material": null,
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "XXL"
  ],
  "stock": null,
  "soldOut": false,
  "featured": true,
  "isNew": true,
  "bestSeller": false,
  "added": 81
 }
];
