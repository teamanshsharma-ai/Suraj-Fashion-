(() => {
"use strict";
const C = window.SITE, P = window.PRODUCTS;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const view = $("#view");
if (!C || !Array.isArray(P)) { view.innerHTML = '<p class="state">Sorry, the catalogue could not be loaded. Please refresh the page.</p>'; return; }
const inr = n => C.currency + Number(n).toLocaleString("en-IN");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const byId = id => P.find(p => p.id === id);
const sold = p => p.soldOut || !p.sizes.length || p.stock === 0;
const WA = "https://wa.me/" + C.whatsappNumber;
const waLink = t => WA + (t ? "?text=" + encodeURIComponent(t) : "");

/* ---------- cart (prices always re-read from the catalogue) ---------- */
const KEY = "sf_cart_v1";
let cart = (() => { try { const v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v.filter(i => byId(i.id) && i.qty > 0 && byId(i.id).sizes.includes(i.size)) : []; } catch (e) { return []; } })();
const saveCart = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} const n = cart.reduce((a, i) => a + i.qty, 0), b = $("#badge"); b.textContent = n; b.hidden = !n; };
const lines = () => cart.map(i => { const p = byId(i.id); return { ...i, p, sub: p.price * i.qty }; });
const totals = () => { const sub = lines().reduce((a, l) => a + l.sub, 0); const fee = typeof C.deliveryFee === "number" ? C.deliveryFee : null; return { sub, fee, total: sub + (fee || 0) }; };
const addToCart = (id, size, qty) => { const l = cart.find(i => i.id === id && i.size === size); if (l) l.qty = Math.min(l.qty + qty, 20); else cart.push({ id, size, qty }); saveCart(); };
let tt; const toast = (html) => { const t = $("#toast"); t.innerHTML = html; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 3500); };

/* ---------- shared markup ---------- */
const card = p => `<a class="card ${sold(p) ? "sold" : ""}" href="#/product/${p.id}"><div class="ph"><img loading="lazy" src="${p.images[0]}" alt="${esc(p.name)}" width="720" height="900">${sold(p) ? '<span class="tag">Sold out</span>' : p.isNew ? '<span class="tag">New</span>' : ""}</div><h3>${esc(p.name)}</h3><div class="pr">${inr(p.price)}</div><div class="sz" aria-label="Sizes">${sold(p) ? "<i>Unavailable</i>" : p.sizes.map(s => `<i>${s}</i>`).join("")}</div></a>`;
const cats = () => [...new Set(P.map(p => p.category))];
const sectionHead = (t, sub, link) => `<div class="head"><div><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${link ? `<a class="link" href="${link[0]}">${link[1]}</a>` : ""}</div>`;
const rail = (t, list, link) => list.length ? `<section class="rv"><div class="wrap">${sectionHead(t, "", link)}<div class="grid">${list.slice(0, 4).map(card).join("")}</div></div></section>` : "";
const colOf = id => C.collections.find(c => c.id === id);

/* ---------- views ---------- */
const V = {};
V.home = () => {
  const feat = P.filter(p => p.featured), neu = P.filter(p => p.isNew), best = P.filter(p => p.bestSeller);
  const covers = { "Shirts": "shirt-3", "Oversized Tees": "tee-spider-red", "Jackets": "jacket-flame", "Jeans": "jeans-black", "Cargo Pants": "cargo-black", "Track Pants": "track-black" };
  return { title: "SURAJ FASHION | Anime-inspired streetwear", html: `
<section class="hero"><div class="hero-img"><img src="images/store/store-2.jpg" alt="The SURAJ FASHION storefront" fetchpriority="high"></div><div class="smoke"></div><canvas id="embers" aria-hidden="true"></canvas><div class="kanji" aria-hidden="true">忍</div>
<div class="wrap"><h1>UNLEASH YOUR STYLE.</h1><p class="sub">Streetwear inspired by the spirit of a shinobi.</p><div class="cta"><a class="btn" href="#/shop">Shop Collection</a><a class="btn ghost" href="#/collections">Explore the Drop</a></div></div></section>
<section class="rv"><div class="wrap">${sectionHead("Shop by category")}<div class="cats">${cats().map(c => { const n = P.filter(p => p.category === c).length, p = byId(covers[c]) || P.find(p => p.category === c); return `<a class="cat" href="#/shop?cat=${encodeURIComponent(c)}"><img loading="lazy" src="${p.images[0]}" alt=""><span>${c}<small>${n} ${n === 1 ? "style" : "styles"}</small></span></a>`; }).join("")}</div></div></section>
${rail("Featured", feat, ["#/shop", "View all"])}
${rail("New arrivals", [...neu].sort((a, b) => b.added - a.added), ["#/shop?sort=new", "See newest"])}
${rail("Best sellers", best, ["#/shop", "View all"])}
<section class="rv"><div class="wrap">${sectionHead("Streetwear collections", "Four ways into the SURAJ FASHION look.")}<div class="cols">${C.collections.map(colHtml).join("")}</div></div></section>
<section class="rv"><div class="wrap story"><img loading="lazy" src="images/store/store-1.jpg" alt="Inside the SURAJ FASHION store"><div><h2>Dressed for the path you choose.</h2><p>SURAJ FASHION is built on anime-inspired streetwear: pieces that carry the energy of a shinobi story into everyday comfort. Wear what feels like you.</p><p style="margin-bottom:24px">Pick your size, pay on delivery, and finish your order on WhatsApp with the store.</p><a class="btn" href="#/about">Our story</a></div></div></section>
<section class="rv"><div class="scroll"><h2>Order in minutes. Pay on delivery.</h2><p>No online payment needed. Add pieces to your cart, review your order and send it to us on WhatsApp.</p><a class="btn" href="#/shop">Start shopping</a></div></section>
${C.reviews.length ? `<section class="rv"><div class="wrap">${sectionHead("What customers say")}<div class="reviews">${C.reviews.map(r => `<blockquote class="rev"><p>${esc(r.text)}</p><b>${esc(r.name)}</b></blockquote>`).join("")}</div></div></section>` : ""}
<section class="rv"><div class="wrap">${sectionHead("Inside the store", "", C.instagramUrl ? [C.instagramUrl, "Follow on Instagram"] : null)}<div class="gal"><img loading="lazy" src="images/store/store-2.jpg" alt="Store front"><img loading="lazy" src="images/store/store-1.jpg" alt="Store interior"><img loading="lazy" src="images/store/store-3.jpg" alt="Footwear wall"></div></div></section>`, after: heroFx };
};
const colHtml = c => { const p = P.find(p => p.collection === c.id); return `<a class="col" href="#/shop?col=${c.id}">${p ? `<img loading="lazy" src="${p.images[0]}" alt="">` : ""}<div><h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p></div></a>`; };

let F = { cat: "", col: "", q: "", sort: "featured" };
V.shop = (q) => {
  F = { cat: q.get("cat") || "", col: q.get("col") || "", q: "", sort: q.get("sort") || "featured" };
  const chip = (k, v, l) => `<button class="chip" data-f="${k}" data-v="${esc(v)}" aria-pressed="false">${esc(l)}</button>`;
  return { title: "Shop | SURAJ FASHION", desc: "Browse shirts, tees, jackets, jeans, cargo and track pants.", html: `<div class="wrap"><div class="page-h"><h1>Shop</h1><p>Every piece, sized for real life. Choose a size on the product page.</p></div>
<div class="tools"><input id="q" type="search" placeholder="Search by product name" aria-label="Search by product name" autocomplete="off"><select id="sort" aria-label="Sort products"><option value="featured">Sort: Featured</option><option value="new">Newest arrivals</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option></select>
<div class="chips" role="group" aria-label="Categories">${chip("cat", "", "All")}${cats().map(c => chip("cat", c, c)).join("")}</div>
<div class="chips" role="group" aria-label="Collections">${chip("col", "", "All collections")}${C.collections.map(c => chip("col", c.id, c.name)).join("")}</div></div>
<p class="count" id="count" aria-live="polite"></p><div class="grid" id="grid"></div></div><div style="height:60px"></div>`, after: () => {
    $("#sort").value = F.sort;
    const draw = () => {
      let l = P.filter(p => (!F.cat || p.category === F.cat) && (!F.col || p.collection === F.col) && p.name.toLowerCase().includes(F.q.trim().toLowerCase()));
      const s = { new: (a, b) => b.added - a.added, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price }[F.sort]; if (s) l.sort(s);
      $$(".chip").forEach(b => b.setAttribute("aria-pressed", String(F[b.dataset.f] === b.dataset.v)));
      $("#count").textContent = l.length + (l.length === 1 ? " product" : " products");
      $("#grid").innerHTML = l.length ? l.map(card).join("") : '<div class="empty" style="grid-column:1/-1"><h2>Nothing matches</h2><p>Try a different search or clear the filters.</p><button class="btn" id="clr">Clear filters</button></div>';
      const u = new URLSearchParams(); if (F.cat) u.set("cat", F.cat); if (F.col) u.set("col", F.col); if (F.sort !== "featured") u.set("sort", F.sort);
      history.replaceState(null, "", "#/shop" + (u.toString() ? "?" + u : ""));
    };
    $$(".chip").forEach(b => b.onclick = () => { F[b.dataset.f] = b.dataset.v; draw(); });
    $("#q").oninput = e => { F.q = e.target.value; draw(); };
    $("#sort").onchange = e => { F.sort = e.target.value; draw(); };
    $("#grid").onclick = e => { if (e.target.id === "clr") { F = { cat: "", col: "", q: "", sort: "featured" }; $("#q").value = ""; $("#sort").value = "featured"; draw(); } };
    draw();
  } };
};

V.collections = () => ({ title: "Collections | SURAJ FASHION", html: `<div class="wrap"><div class="page-h"><h1>Collections</h1><p>Curated looks from the SURAJ FASHION catalogue.</p></div><div class="cols" style="margin:24px 0 64px">${C.collections.map(colHtml).join("")}</div></div>` });

V.product = (q, id) => {
  const p = byId(id); if (!p) return V.notfound();
  const so = sold(p), rel = P.filter(x => x.id !== p.id && (x.category === p.category || x.collection === p.collection)).slice(0, 4);
  return { title: p.name + " | SURAJ FASHION", desc: p.description, html: `<div class="wrap"><div class="pd"><div><button class="main-img" id="mi" aria-label="Enlarge image"><img src="${p.images[0]}" alt="${esc(p.name)}" width="720" height="900"><em>Tap to enlarge</em></button>${p.images.length > 1 ? `<div class="thumbs">${p.images.map((s, i) => `<button data-i="${i}" aria-label="Show image ${i + 1}" ${i ? "" : 'aria-current="true"'}><img src="${s}" alt=""></button>`).join("")}</div>` : ""}</div>
<div><p class="crumb"><a href="#/shop">Shop</a> / <a href="#/shop?cat=${encodeURIComponent(p.category)}">${p.category}</a></p><h1>${esc(p.name)}</h1><div class="price">${inr(p.price)}</div>
<p style="margin-top:14px;color:#d6d2ca">${esc(p.description)}</p>
${p.material ? `<dl class="meta"><dt>Material</dt><dd>${esc(p.material)}</dd></dl>` : ""}
${so ? '<p class="err" style="font-size:1.1rem;margin-top:18px">Sold out</p>' : `
<div class="opt"><span id="szl">Select size</span><button class="link" id="sgb" style="background:none;border:0;cursor:pointer;min-height:44px">Size guide</button></div>
<div class="sizes" role="radiogroup" aria-labelledby="szl">${["XS", "S", "M", "L", "XL", "XXL"].map(s => `<button class="size" role="radio" aria-checked="false" data-s="${s}" ${p.sizes.includes(s) ? "" : "disabled"}>${s}</button>`).join("")}</div>
${typeof p.stock === "number" ? `<p style="margin-top:10px;color:var(--mute)">${p.stock} in stock</p>` : ""}
<div class="opt"><span>Quantity</span></div><div class="qty"><button id="qm" aria-label="Decrease quantity">−</button><output id="qv" aria-live="polite">1</output><button id="qp" aria-label="Increase quantity">+</button></div>
<p class="err" id="perr" role="alert"></p>
<div class="buy"><button class="btn ghost" id="add">Add to cart</button><button class="btn" id="now">Buy now</button></div>`}
<div class="cod"><b>PAY ON DELIVERY.</b> No online payment required. Cash on Delivery availability and delivery charges are confirmed by the store on WhatsApp.</div>
<a class="btn wa" style="margin-top:14px" target="_blank" rel="noopener" href="${waLink("Hi SURAJ FASHION, I have a question about: " + p.name)}">Ask about this on WhatsApp</a></div></div>
${rel.length ? `<div style="padding-bottom:64px">${sectionHead("Related products")}<div class="grid">${rel.map(card).join("")}</div></div>` : ""}</div>`,
    after: () => {
      let size = "", qty = 1; const err = m => $("#perr") && ($("#perr").textContent = m);
      $("#mi").onclick = () => { $("#lb img").src = $(".main-img img").src; $("#lb img").alt = p.name; openModal("#lb"); };
      $$(".thumbs button").forEach(b => b.onclick = () => { $(".main-img img").src = p.images[b.dataset.i]; $$(".thumbs button").forEach(x => x.removeAttribute("aria-current")); b.setAttribute("aria-current", "true"); });
      if (so) return;
      $$(".size").forEach(b => b.onclick = () => { if (b.disabled) return; size = b.dataset.s; $$(".size").forEach(x => x.setAttribute("aria-checked", String(x === b))); err(""); });
      const setQ = n => { qty = Math.max(1, Math.min(n, typeof p.stock === "number" ? p.stock : 20)); $("#qv").textContent = qty; };
      $("#qm").onclick = () => setQ(qty - 1); $("#qp").onclick = () => setQ(qty + 1);
      $("#sgb").onclick = () => openModal("#sg");
      const ok = () => { if (!size) { err("Please select a size before continuing."); $(".sizes").scrollIntoView({ block: "center" }); return false; } return true; };
      $("#add").onclick = () => { if (!ok()) return; addToCart(p.id, size, qty); toast(`Added to cart <a href="#/cart">View cart</a>`); };
      $("#now").onclick = () => { if (!ok()) return; addToCart(p.id, size, qty); location.hash = "#/checkout"; };
    } };
};

V.cart = () => {
  const L = lines(); if (!L.length) return { title: "Cart | SURAJ FASHION", html: `<div class="empty"><h2>Your cart is empty</h2><p>Nothing here yet. Pick something you like.</p><a class="btn" href="#/shop">Shop now</a></div>` };
  const t = totals();
  return { title: "Cart | SURAJ FASHION", html: `<div class="wrap"><div class="page-h"><h1>Your cart</h1></div><div class="lay"><div>${L.map((l, i) => `<div class="line"><a href="#/product/${l.p.id}"><img src="${l.p.images[0]}" alt="${esc(l.p.name)}"></a><div><h3>${esc(l.p.name)}</h3><small>Size ${l.size} · ${inr(l.p.price)} each</small><div class="row"><div class="qty"><button data-q="${i}" data-d="-1" aria-label="Decrease quantity of ${esc(l.p.name)}">−</button><output>${l.qty}</output><button data-q="${i}" data-d="1" aria-label="Increase quantity of ${esc(l.p.name)}">+</button></div><b>${inr(l.sub)}</b><button class="rm" data-r="${i}">Remove</button></div></div></div>`).join("")}<p style="margin-top:20px"><a class="link" href="#/shop">← Continue shopping</a></p></div>${summary(t)}</div></div>`.replace("</aside>", `<a class="btn" style="width:100%;margin-top:16px" href="#/checkout">Proceed to checkout</a></aside>`),
    after: () => { view.onclick = e => { const q = e.target.closest("[data-q]"), r = e.target.closest("[data-r]"); if (q) { const l = cart[q.dataset.q]; l.qty = Math.max(1, Math.min(20, l.qty + +q.dataset.d)); } else if (r) cart.splice(r.dataset.r, 1); else return; saveCart(); render(true); }; } };
};
const summary = t => `<aside class="sum"><h2>Order summary</h2><div class="r"><span>Subtotal</span><span>${inr(t.sub)}</span></div><div class="r"><span>Delivery</span><span>${t.fee === null ? "Confirmed by store" : inr(t.fee)}</span></div><div class="r tot"><span>Payable</span><b>${inr(t.total)}</b></div><p style="color:var(--mute);font-size:.88rem;margin-top:8px">Cash on Delivery. ${t.fee === null ? "Delivery charges, if any, are confirmed by the store and not included above." : ""}</p></aside>`;

const FIELDS = { name: "Full name", phone: "Phone number", address: "Complete delivery address", city: "City", state: "State", pin: "PIN code" };
const validate = d => { const e = {}, ph = d.phone.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  if (d.name.trim().length < 2) e.name = "Enter your full name."; if (!/^[6-9]\d{9}$/.test(ph)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (d.address.trim().length < 8) e.address = "Enter your complete delivery address."; if (d.city.trim().length < 2) e.city = "Enter your city."; if (d.state.trim().length < 2) e.state = "Enter your state.";
  if (!/^[1-9]\d{5}$/.test(d.pin.trim())) e.pin = "Enter a valid 6-digit PIN code."; return { e, phone: "+91 " + ph }; };
const orderId = () => { const d = new Date(), z = n => String(n).padStart(2, "0"); return `SF-${String(d.getFullYear()).slice(2)}${z(d.getMonth() + 1)}${z(d.getDate())}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`; };
const buildMessage = (d, phone, id) => { const t = totals(), L = lines();
  return [`${C.brand} — NEW ORDER`, "", `Order ID: ${id}`, "", "Customer Details:", `Name: ${d.name.trim()}`, `Phone: ${phone}`, "", "Delivery Address:", d.address.trim(), `City: ${d.city.trim()}`, `State: ${d.state.trim()}`, `PIN Code: ${d.pin.trim()}`, "", "Order Items:", "",
    ...L.map((l, i) => `${i + 1}. ${l.p.name}\n   Size: ${l.size}\n   Quantity: ${l.qty}\n   Price: ${inr(l.p.price)}\n   Subtotal: ${inr(l.sub)}\n`),
    `Subtotal: ${inr(t.sub)}`, `Delivery: ${t.fee === null ? "To be confirmed by store" : inr(t.fee)}`, `TOTAL PAYABLE: ${inr(t.total)}${t.fee === null ? " (+ delivery, if any)" : ""}`, "", "Payment Method: CASH ON DELIVERY", "", "Please confirm product availability and delivery details."].join("\n"); };

V.checkout = () => {
  const L = lines(); if (!L.length) return { title: "Checkout | SURAJ FASHION", html: `<div class="empty"><h2>Your cart is empty</h2><p>Add something to your cart before checking out.</p><a class="btn" href="#/shop">Shop now</a></div>` };
  const t = totals(), inp = (k, type = "text", ac = "", extra = "") => `<label>${FIELDS[k]}<input name="${k}" type="${type}" autocomplete="${ac}" ${extra} required aria-describedby="e-${k}"><span class="e" id="e-${k}"></span></label>`;
  return { title: "Checkout | SURAJ FASHION", html: `<div class="wrap"><div class="page-h"><h1>Checkout</h1><p>Review your order, then send it to us on WhatsApp.</p></div><div class="lay"><div>
<div id="sent" hidden></div>
<form class="f" id="form" novalidate>${inp("name", "text", "name")}${inp("phone", "tel", "tel", 'inputmode="numeric"')}
<label>${FIELDS.address}<textarea name="address" autocomplete="street-address" required aria-describedby="e-address"></textarea><span class="e" id="e-address"></span></label>
<div class="two">${inp("city", "text", "address-level2")}${inp("state", "text", "address-level1")}</div>${inp("pin", "text", "postal-code", 'inputmode="numeric" maxlength="6"')}
<div class="note"><b>PAY ON DELIVERY.</b> No online payment required. Payment method: Cash on Delivery. The store confirms COD availability and delivery charges.</div>
<div class="note" style="border-style:solid">After you tap the button, WhatsApp opens with your order written out. <b>You must press Send in WhatsApp</b> for the store to receive it. Your order is not confirmed until the store replies.</div>
<button class="btn wa" type="submit" id="place">Place order on WhatsApp</button></form></div>
<aside class="sum"><h2>Your order</h2>${L.map(l => `<div class="r"><span>${esc(l.p.name)}<br><small style="color:var(--mute)">Size ${l.size} × ${l.qty}</small></span><span>${inr(l.sub)}</span></div>`).join("")}<div class="r" style="border-top:1px solid var(--line);margin-top:8px"><span>Subtotal</span><span>${inr(t.sub)}</span></div><div class="r"><span>Delivery</span><span>${t.fee === null ? "Confirmed by store" : inr(t.fee)}</span></div><div class="r tot"><span>Payable</span><b>${inr(t.total)}</b></div><p style="margin-top:10px"><a class="link" href="#/cart">Edit cart</a></p></aside></div></div>`,
    after: () => {
      const form = $("#form");
      form.onsubmit = ev => { ev.preventDefault();
        const d = Object.fromEntries(new FormData(form)), { e, phone } = validate(d);
        Object.keys(FIELDS).forEach(k => { $("#e-" + k).textContent = e[k] || ""; form.elements[k].setAttribute("aria-invalid", String(!!e[k])); });
        const first = Object.keys(e)[0]; if (first) { form.elements[first].focus(); return; }
        if (!cart.length) return;
        const id = orderId(), url = waLink(buildMessage(d, phone, id));
        const w = window.open(url, "_blank", "noopener"); if (!w) location.href = url;
        const s = $("#sent"); s.className = "sent"; s.hidden = false;
        s.innerHTML = `<h2>One more step: press Send in WhatsApp</h2><p>Reference <b>${id}</b>. WhatsApp should have opened with your order. Your order has <b>not</b> been received until you send that message, and it is not confirmed until the store replies.</p><p style="margin-top:10px"><a class="btn wa" target="_blank" rel="noopener" href="${url}">Open WhatsApp again</a><button class="btn ghost" id="clear" type="button">Clear my cart</button></p>`;
        s.scrollIntoView({ block: "start" }); $("#clear").onclick = () => { cart = []; saveCart(); location.hash = "#/cart"; };
      };
    } };
};

V.about = () => ({ title: "About Us | SURAJ FASHION", desc: "The story and mission behind SURAJ FASHION.", html: `<div class="wrap"><div class="page-h"><h1>About SURAJ FASHION</h1></div>
<div class="story" style="padding:24px 0 48px"><img src="images/store/store-2.jpg" alt="SURAJ FASHION storefront"><div><h2>Streetwear with a shinobi spirit</h2><p>SURAJ FASHION brings anime-inspired streetwear to everyday wardrobes: oversized tees, layered shirts, jackets and relaxed bottoms that feel as good as they look.</p><p>We believe clothes are a way to say who you are without saying a word.${C.foundedYear ? ` Serving customers since ${C.foundedYear}.` : ""}</p></div></div>
<div class="cards" style="padding-bottom:48px"><div class="box"><h3>Our mission</h3><p style="color:#d6d2ca">Make expressive, comfortable streetwear easy to find and easy to order.</p></div><div class="box"><h3>Design philosophy</h3><p style="color:#d6d2ca">Strong shapes, dark palettes, bold graphics, and comfort that lasts the whole day.</p></div></div>
<div style="text-align:center;padding-bottom:72px"><a class="btn" href="#/shop">Explore the collection</a></div></div>` });

V.contact = () => ({ title: "Contact | SURAJ FASHION", desc: "Contact SURAJ FASHION on WhatsApp.", html: `<div class="wrap"><div class="page-h"><h1>Contact</h1><p>The quickest way to reach us is WhatsApp.</p></div><div class="cards" style="padding:24px 0 20px">
<div class="box"><h3>WhatsApp</h3><p style="margin-bottom:14px">${C.whatsappDisplay}</p><a class="btn wa" target="_blank" rel="noopener" href="${waLink("Hi SURAJ FASHION, I need help with...")}">Chat now</a></div>
<div class="box"><h3>Find us</h3>${C.instagramUrl ? `<p><a class="link" target="_blank" rel="noopener" href="${C.instagramUrl}">Instagram</a></p>` : ""}${C.email ? `<p><a class="link" href="mailto:${C.email}">${C.email}</a></p>` : ""}${C.address ? `<p>${esc(C.address)}</p>` : ""}${C.mapUrl ? `<p><a class="link" target="_blank" rel="noopener" href="${C.mapUrl}">Open in Google Maps</a></p>` : ""}${!C.instagramUrl && !C.email && !C.address ? "<p style='color:var(--mute)'>More ways to reach us are coming soon. WhatsApp is always open.</p>" : ""}</div></div>
<div class="box" id="policies" style="margin-bottom:72px"><h3>Delivery &amp; store policies</h3><ul>${C.policies.map(x => `<li>${esc(x)}</li>`).join("")}${C.returnsPolicy ? `<li>${esc(C.returnsPolicy)}</li>` : ""}</ul></div></div>` });

V.notfound = () => ({ title: "Page not found | SURAJ FASHION", html: `<div class="empty"><h2>404: Page not found</h2><p>That page doesn't exist or the product is no longer sold.</p><a class="btn" href="#/">Back home</a></div>` });

/* ---------- router ---------- */
const setDesc = d => { let m = $('meta[name="description"]'); m.content = d || "SURAJ FASHION: streetwear inspired by the spirit of a shinobi. Cash on Delivery, order on WhatsApp."; };
function render(keepScroll) {
  const h = location.hash.replace(/^#\/?/, ""), [path, qs] = h.split("?"), [name, arg] = path.split("/");
  const key = name || "home"; const fn = V[key] && key !== "notfound" ? V[key] : V.notfound;
  let r; try { r = fn(new URLSearchParams(qs || ""), arg ? decodeURIComponent(arg) : ""); } catch (err) { console.error(err); r = { title: "Error | SURAJ FASHION", html: '<p class="state">Something went wrong loading this page. <a class="link" href="#/">Go home</a></p>' }; }
  const y = scrollY; view.onclick = null; view.innerHTML = r.html; document.title = r.title; setDesc(r.desc);
  if (!keepScroll) { scrollTo(0, 0); view.classList.remove("swap"); void view.offsetWidth; view.classList.add("swap"); }
  else scrollTo(0, y);
  $$("#menu a").forEach(a => a.classList.toggle("on", a.dataset.nav === (key === "product" ? "shop" : key === "checkout" ? "cart" : key)));
  closeMenu(); if (r.after) r.after(); revealInit();
}
window.addEventListener("hashchange", () => render());

/* ---------- chrome ---------- */
const burger = $("#burger"), menu = $("#menu");
function closeMenu() { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
let lastFocus; function openModal(sel) { lastFocus = document.activeElement; const m = $(sel); m.hidden = false; $(".x", m).focus(); }
function closeModals() { $$(".lb").forEach(m => m.hidden = true); lastFocus && lastFocus.focus && lastFocus.focus(); }
$("#lbx").onclick = $("#sgx").onclick = closeModals; $$(".lb").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModals(); }));
addEventListener("keydown", e => { if (e.key === "Escape") { closeModals(); closeMenu(); } });
$("#sgt").innerHTML = `<table><thead><tr><th>Size</th><th>Chest (in)</th></tr></thead><tbody>${C.sizeGuide.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table><p style="margin-top:12px;color:var(--mute);font-size:.9rem">${esc(C.sizeGuideNote)}</p>`;
$("#fab").href = waLink("Hi SURAJ FASHION, I'd like some help.");
if (!C.pricesConfirmed) $("#notice").hidden = false;
$("#foot").innerHTML = `<div class="wrap"><div><h3>${C.brand}</h3><p>Streetwear inspired by the spirit of a shinobi. Not affiliated with or licensed by Naruto rights holders.</p></div><div><h3>Shop</h3><a href="#/shop">All products</a><a href="#/collections">Collections</a><a href="#/cart">Cart</a></div><div><h3>Support</h3><a target="_blank" rel="noopener" href="${waLink("Hi SURAJ FASHION")}">WhatsApp ${C.whatsappDisplay}</a>${C.instagramUrl ? `<a target="_blank" rel="noopener" href="${C.instagramUrl}">Instagram</a>` : ""}<a href="#/contact">Contact</a><a href="#/contact" onclick="setTimeout(()=>document.getElementById('policies')&&document.getElementById('policies').scrollIntoView(),50)">Policies &amp; delivery</a></div><p class="fine">© ${new Date().getFullYear()} ${C.brand}. Orders are requests until confirmed by the store.</p></div>`;

/* progress bar + custom cursor (desktop pointers only) */
let tick = false; addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => { const m = document.documentElement.scrollHeight - innerHeight; $("#prog").style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`; tick = false; }); }, { passive: true });
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (matchMedia("(hover:hover) and (pointer:fine)").matches && !RM) { const c = document.createElement("div"); c.id = "cur"; document.body.append(c);
  addEventListener("pointermove", e => { c.style.opacity = ".9"; c.style.transform = `translate(${e.clientX - 7}px,${e.clientY - 7}px)`; c.classList.toggle("big", !!e.target.closest("a,button,.chip,.size")); }, { passive: true }); document.addEventListener("mouseleave", () => c.style.opacity = 0); }

/* scroll reveals */
let io; function revealInit() { io && io.disconnect(); const els = $$(".rv"); if (RM || !("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
  io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -8% 0px" }); els.forEach(e => io.observe(e)); }

/* hero embers: light canvas, paused off-screen */
function heroFx() { const cv = $("#embers"); if (!cv || RM) return; const x = cv.getContext("2d"), hero = cv.parentElement; let w, h, run = false, raf; const n = innerWidth < 600 ? 14 : 30, ps = [];
  const size = () => { const d = Math.min(devicePixelRatio || 1, 2); w = cv.width = hero.clientWidth * d; h = cv.height = hero.clientHeight * d; };
  size(); addEventListener("resize", size);
  for (let i = 0; i < n; i++) ps.push({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + .6, v: Math.random() * .0007 + .0002, s: Math.random() * 6 });
  const step = t => { x.clearRect(0, 0, w, h); for (const p of ps) { p.y -= p.v; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); } const px = (p.x + Math.sin(t / 1800 + p.s) * .012) * w, py = p.y * h; x.globalAlpha = .75 * Math.min(1, p.y * 2); x.fillStyle = "#ff8a3d"; x.beginPath(); x.arc(px, py, p.r * (w / 900 + .8), 0, 6.283); x.fill(); } if (run) raf = requestAnimationFrame(step); };
  new IntersectionObserver(([e]) => { run = e.isIntersecting && !document.hidden; cancelAnimationFrame(raf); if (run) raf = requestAnimationFrame(step); }).observe(hero);
}

saveCart(); render();
})();
