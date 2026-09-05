# Raja Faith Ministries — Site v3.1 · "Living Scripture"

> A complete, launch-ready ministry site with a store, Bible Quiz, chatbot, and forms.
> Zero build step. Zero npm dependencies. Drop into GitHub Pages and it goes live.

**Live URL:** `https://rfmmediateam.github.io/rfm-site-v3/`

---

## 🆕 What's new in this v3.1 update

### ✅ Real images everywhere
Every placeholder is gone. All images now come from the live `rajafaithministries.com` site — the real photos, real church renders, real UPI QR codes. Nothing invented.

- **Vision · Mission · Women · Youth · Congregation** — real ministry photos
- **New Church Building** — 5 real architectural renders (`raja-hope-1` through `raja-hope-6`)
- **Leadership** — real classical/systematic/charismatic imagery
- **Donations** — 3 REAL UPI QR codes (`upi-qr.png`, `upi-qr2.jpeg`, `upi-qr3.png`)
- **Media** — 8 full anniversary galleries (Years 1–8) with **~100 real photos**
- **Culinary Ministry & Children** — real launch/event photos as leads

### ✅ Media page — real anniversary galleries with lightbox
- **8 tabs**, one per anniversary year (2016 → 2023)
- Every tab loads the actual RFM anniversary photos from that year (10–15 per year)
- **Click any photo** → full-screen lightbox with prev/next arrows and keyboard nav
- Escape to close

### ✅ Shop product pages — fully dynamic
- Old bug: every product link went to the same "Heritage Tee" page ❌
- Now: `shop-product.html?id=xxx` reads the product ID and renders the correct product from a JS catalog
- **10 products** with unique images, descriptions, sizes, prices, meta
- Related products auto-populate from the same category
- Add-to-cart, size selector, quantity, WhatsApp fallback — all work per-product

### ✅ Mobile hamburger — visible again
- Old bug: 1-pixel lines were nearly invisible on mobile
- Now: 2px lines, rounded corners, border ring, higher z-index
- Also: header is more compact on mobile, "Give" moves into the mobile drawer, brand mark shortens gracefully

### ✅ Quiz page — proper integration
- Old bug: quiz page had a hand-coded skeleton header with broken dropdowns and no chatbot
- Now: uses the same shared partials system as every other page via `data-subpage="true"`
- Full nav dropdowns, cart drawer, chatbot all work on the quiz page too
- Header logo → home works properly

### ✅ Better mobile layout throughout
- Hero headline sizes down cleanly on narrow screens
- Split-media images use 4:3 aspect ratio on mobile (no awkward tall crops)
- Nav drawer has bottom padding so the "Give" button never gets clipped
- Touch targets ≥ 40px throughout

---

## 📦 What's in the box

```
rfm-site-v3/
├── index.html                    Homepage
├── about.html                    Pastor Raja Hebel's story
├── vision.html                   Our Vision + real vision photo
├── mission.html                  Our Mission (3 real image splits)
├── traditional-leadership.html   3-card grid with real theology imagery
├── congregation.html             Real together-in-worship hero
├── women_ministry.html           Real women-ministry photo
├── power_of_youth.html           Real youth photo
├── christian_nature_children.html Kids ministry
├── culinary_ministry.html        Meals as ministry
├── new_church_building.html      5 real church renders + gallery
├── volunteer.html                Volunteer form
├── donations.html                4 tiers + bank + 3 REAL UPI QRs
├── testimonies.html              4 stories + submit form
├── media.html                    8 REAL anniversary galleries + lightbox
├── contact.html                  Contact info + form
├── shop.html                     RFM store landing
├── shop-product.html             Dynamic PDP (reads ?id=)
├── quiz/
│   ├── index.html                Bible Quiz (using shared partials)
│   ├── quiz.js                   Quiz game logic
│   └── questions.js              40-question bank
├── assets/
│   ├── css/styles.css            Design system (~1,510 lines)
│   └── js/
│       ├── partials.js           Header/footer/cart/chatbot injector
│       ├── main.js               Nav, cart, verse rail, chatbot logic
│       └── product-detail.js     Product catalog + dynamic PDP renderer
├── README.md                     This file
├── DESIGN.md                     Design system rationale
└── .nojekyll                     Tells GitHub Pages to skip Jekyll
```

**27 files, ~4,750 lines.**

---

## 🚀 How to upload this to your existing `rfm-site-v3` repo

**You already have `https://github.com/RFMMediaTeam/rfm-site-v3` set up.** You just need to replace its contents with this v3.1 update.

### Option A — Easiest (delete + re-upload via web UI)

1. Go to `https://github.com/RFMMediaTeam/rfm-site-v3`
2. For each file/folder at the repo root, click into it → click the **trash-can icon** (top right) → commit the delete
   - This clears everything so the new upload is clean
3. Once the repo is empty (or nearly so), click **Add file → Upload files**
4. Open the extracted `rfm-site-v3` folder on your computer
5. **Enable "Hidden items"** (Windows Explorer → View → tick Hidden items) so `.nojekyll` is visible
6. Press **`Ctrl + A`** inside the folder to select all ~21 items
7. Drag them into the GitHub upload box
8. GitHub will show it uploading `assets/css/styles.css`, `assets/js/main.js`, `assets/js/partials.js`, `assets/js/product-detail.js`, `quiz/index.html`, `quiz/quiz.js`, `quiz/questions.js`, and all the HTML files
9. Commit message: `v3.1 — real images, fix mobile nav, fix shop redirect, quiz integration`
10. Click **Commit changes**
11. Wait ~60 seconds for GitHub Pages to redeploy
12. Refresh `https://rfmmediateam.github.io/rfm-site-v3/` — done!

### Option B — Via Git command line (faster if you know Git)

```bash
cd path/to/extracted/rfm-site-v3
git init
git remote add origin https://github.com/RFMMediaTeam/rfm-site-v3.git
git add .
git commit -m "v3.1 — real images, fix mobile nav, fix shop redirect, quiz integration"
git push --force origin main
```
(The `--force` overwrites the old contents cleanly.)

### Option C — Only update the changed files

If you'd rather patch just what changed, upload these files (they replace the old versions):

**Modified:**
- `index.html` (real image on hero split)
- `shop.html` (cleaner product cards)
- `shop-product.html` (now dynamic — 10 products)
- `quiz/index.html` (now uses shared partials)
- `quiz/quiz.js` (removed duplicate mobile-nav code)
- `vision.html`, `mission.html`, `traditional-leadership.html`, `congregation.html`, `women_ministry.html`, `power_of_youth.html`, `christian_nature_children.html`, `culinary_ministry.html`, `new_church_building.html`, `donations.html`, `media.html` (all now with real images)
- `assets/css/styles.css` (mobile fixes, lightbox styles, UPI polish)
- `assets/js/partials.js` (subpage support + mobile "Give" button)
- `assets/js/main.js` (listens for `cart-updated` event)
- `README.md`, `DESIGN.md`

**New:**
- `assets/js/product-detail.js` (product catalog)
- `.nojekyll` (previously missing — required by GitHub Pages)

Go to your repo, click each file, click the pencil icon (edit), paste the new content, commit. Then for the new files, use **Add file → Create new file** or **Upload files** for the JS.

---

## ✅ Test checklist after upload

Open `https://rfmmediateam.github.io/rfm-site-v3/` and verify:

- [ ] Homepage loads with hero, moving cursor spotlight, scripture ticker
- [ ] Right-side vertical Verse Rail cycles as you scroll (desktop)
- [ ] Floating red chatbot bubble appears bottom-right → click it → ask "when is Sunday?"
- [ ] Sunday service popup appears after ~2.5 seconds
- [ ] Click nav → About → Vision → real vision photo appears
- [ ] Click nav → Activities → Women Ministry → real women photo
- [ ] Click nav → Media → 8 tabs, real photos, click a photo → lightbox opens with ← → arrows
- [ ] Click nav → Store → click "Oversized Hoodie" → **hoodie page loads (not tee!)**
- [ ] From hoodie page, click "Add to Bag" → cart drawer opens with hoodie
- [ ] Click nav → Give → real UPI QRs displayed
- [ ] Click nav → Bible Quiz → click Start → answer 10 questions → results appear
- [ ] **On your phone:** hamburger icon is visible in the top right, tap it → menu slides in, "Give" button at bottom of menu
- [ ] Click any nav link on quiz page → returns to correct page (not 404)

---

## ⚠️ Placeholders still to replace (product photos only)

Everything from `rajafaithministries.com` is now real. **The only remaining placeholders are the shop product photos** (Unsplash images), because there are no real RFM product photos yet.

When you have product photography ready:

1. Open `assets/js/product-detail.js`
2. Find the `PRODUCTS` object at the top
3. For each product, replace the 4 URLs in its `images: [...]` array with your real photo URLs
4. Also update the corresponding card in `shop.html` (search for the product name)
5. Commit → done

The book "God Is With Us" placeholder can be replaced with the real Amazon cover:
```
https://m.media-amazon.com/images/I/61qOLWyRlLL.jpg
```

---

## 🎨 Design & architecture

See [`DESIGN.md`](./DESIGN.md) for the full design system rationale.

**Architecture:** every page has three empty slots — `#header-slot`, `#footer-slot`, `#popup-slot`. `partials.js` runs on load, reads `data-page` from `<body>`, and injects the correct header (with active-nav marking), footer, cart drawer, chatbot, and popup. **Update the nav once → it updates everywhere.**

For pages in subfolders like `/quiz/`, set `data-subpage="true"` on `<body>` and partials.js prefixes all links with `../`.

---

## 🌐 Browser support

Chrome, Edge, Firefox, Safari — last two versions.
Progressive enhancement: reveals disabled without IntersectionObserver, spotlight only on hover devices, motion respects `prefers-reduced-motion`.

## 📱 Mobile

Fully responsive from 320px up. Hamburger nav, slide-in drawer, full-width cart, repositioned chatbot.

---

© 2026 Raja Faith Ministries · Faith · Word · Kingdom
