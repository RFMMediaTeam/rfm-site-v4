/* ==========================================================================
   RFM Shop — product catalog + dynamic PDP renderer
   Reads ?id=xxx from URL, looks up the product, renders it.
   ========================================================================== */
(function () {
  'use strict';

  // ============ CATALOG ============
  const PRODUCTS = {
    'tncc-tee-heritage': {
      title: 'Heritage Tee',
      subtitle: 'Faith • Word • Kingdom',
      collection: 'TNCC · Apparel',
      price: 899,
      category: 'apparel',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&auto=format',
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&auto=format',
        'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=1200&auto=format',
      ],
      description: 'Heavyweight 220 GSM combed cotton, garment-washed for a lived-in feel. Small embroidered TNCC mark at the chest, discreet "Faith • Word • Kingdom" print on the back yoke. Designed to be worn well beyond Sunday.',
      sizes: ['XS','S','M','L','XL','XXL'],
      defaultSize: 'M',
      meta: [
        ['Fabric', '220 GSM combed cotton, pre-washed'],
        ['Fit', 'Regular · true-to-size'],
        ['Care', 'Cold wash, inside out, line dry'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'rfm-hoodie-oversized': {
      title: 'Oversized Hoodie',
      subtitle: '"In Christ"',
      collection: 'RFM · Streetwear',
      price: 2199,
      category: 'apparel',
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&auto=format',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&auto=format',
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&auto=format',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&auto=format',
      ],
      description: 'Premium 400 GSM brushed-fleece pullover. Boxy oversized cut, dropped shoulders, ribbed cuffs. Small "In Christ" chest embroidery in tonal thread. Everyday warmth with quiet purpose.',
      sizes: ['S','M','L','XL','XXL'],
      defaultSize: 'L',
      meta: [
        ['Fabric', '400 GSM brushed cotton fleece'],
        ['Fit', 'Oversized · size down for regular fit'],
        ['Care', 'Cold wash, low tumble dry'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'rfm-cap-embroidered': {
      title: 'Embroidered Cap',
      subtitle: 'Burnished Gold',
      collection: 'RFM · Accessories',
      price: 749,
      category: 'apparel',
      images: [
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1200&auto=format',
        'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200&auto=format',
        'https://images.unsplash.com/photo-1620231109648-2cef23ba9c34?w=1200&auto=format',
        'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=1200&auto=format',
      ],
      description: 'Six-panel structured cap in washed cotton twill. Small burnished-gold "RFM" embroidery at the front. Adjustable brass buckle strap. Made to be worn every day.',
      sizes: ['One Size'],
      defaultSize: 'One Size',
      meta: [
        ['Material', 'Washed cotton twill · brass buckle'],
        ['Fit', 'Adjustable · fits most'],
        ['Care', 'Spot clean, do not machine wash'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'tncc-tote-canvas': {
      title: 'Canvas Tote',
      subtitle: 'Scripture Print',
      collection: 'TNCC · Everyday',
      price: 549,
      category: 'apparel',
      images: [
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format',
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&auto=format',
        'https://images.unsplash.com/photo-1620332372374-f108c53d2e03?w=1200&auto=format',
        'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&auto=format',
      ],
      description: '12oz natural canvas tote with reinforced handles. Screen-printed TNCC mark on one side, a full scripture verse on the other. Big enough for a Bible, journal, laptop, and a Bible-study snack.',
      sizes: ['One Size'],
      defaultSize: 'One Size',
      meta: [
        ['Material', '12oz natural cotton canvas'],
        ['Size', '38cm × 42cm · gusseted base'],
        ['Care', 'Cold wash, air dry'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'book-god-is-with-us': {
      title: 'God Is With Us',
      subtitle: 'A Study on Emmanuel',
      collection: 'Books · Pastor Raja',
      price: 399,
      category: 'books',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&auto=format',
        'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=1200&auto=format',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&auto=format',
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&auto=format',
      ],
      description: 'A pastoral walk through the promise of Emmanuel — God with us. Written by Ps. Raja Hebel, this study weaves biblical exposition with real-life testimony, guiding readers to know Christ as present, personal, and near.',
      sizes: [],
      meta: [
        ['Format', 'Paperback · 220 pages'],
        ['Language', 'English'],
        ['Publisher', 'RFM Publishing'],
        ['ISBN', 'B0CGWX9SD9'],
        ['Ships', 'Within 5–7 days across India'],
      ],
    },
    'journal-prayer-daily': {
      title: 'Daily Prayer Journal',
      subtitle: '90 Days',
      collection: 'Journals',
      price: 499,
      category: 'books',
      images: [
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&auto=format',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&auto=format',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format',
        'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&auto=format',
      ],
      description: '90-day prayer journal with morning devotion, gratitude, prayer requests, and answered-prayer sections for each day. Linen-bound, gold-foil title, ribbon marker, and elastic closure. A rhythm for a season.',
      sizes: [],
      meta: [
        ['Format', 'Linen-bound · 192 pages · gold-foil'],
        ['Size', 'A5 · 21cm × 14.8cm'],
        ['Extras', 'Ribbon marker, elastic closure'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'book-devotional-morning': {
      title: 'Morning Manna',
      subtitle: '365 Devotions',
      collection: 'Devotionals',
      price: 599,
      category: 'books',
      images: [
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format',
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format',
        'https://images.unsplash.com/photo-1509266272358-7701da638078?w=1200&auto=format',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&auto=format',
      ],
      description: 'A daily devotional for a year — a Scripture, a short reflection, and a prayer for each morning. Compact, hardcover, ribbon-bound. Perfect for the commute, the office, or bedside table.',
      sizes: [],
      meta: [
        ['Format', 'Hardcover · 400 pages'],
        ['Size', 'Compact · 14cm × 11cm'],
        ['Extras', 'Ribbon marker · gilt-edged pages'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'study-discipleship': {
      title: 'Discipleship Workbook',
      subtitle: 'Vol. I',
      collection: 'Study Guides',
      price: 449,
      category: 'books',
      images: [
        'https://images.unsplash.com/photo-1476081718509-d5d0b661a376?w=1200&auto=format',
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format',
        'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=1200&auto=format',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&auto=format',
      ],
      description: 'A twelve-week guided workbook for new believers and small groups. Covers salvation, the Word, prayer, the Holy Spirit, the church, and Kingdom purpose. Weekly Scripture, reflection questions, memory verses, and prayer prompts.',
      sizes: [],
      meta: [
        ['Format', 'Paperback workbook · 168 pages'],
        ['Duration', '12 weeks · small-group or personal'],
        ['Language', 'English'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'gift-faith-box': {
      title: 'RFM Faith Gift Box',
      subtitle: 'Everything to begin the journey',
      collection: 'Gift Sets · Curated',
      price: 1999,
      category: 'gifts',
      images: [
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format',
        'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&auto=format',
        'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&auto=format',
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&auto=format',
      ],
      description: 'A curated gift box for someone beginning — or continuing — their walk with Jesus. Includes: RFM linen notebook, premium brass pen, set of 12 scripture cards, hand-crafted leather bookmark, ceramic mug, and canvas tote. Beautifully wrapped, ready to give.',
      sizes: [],
      meta: [
        ['Includes', '6 items · beautifully boxed'],
        ['Occasion', 'Birthdays · baptism · new believers'],
        ['Personalization', 'Add a note at checkout via WhatsApp'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
    'gift-tncc-newbeliever': {
      title: 'TNCC New Believer Kit',
      subtitle: 'A first-steps discipleship gift',
      collection: 'Gift Sets · TNCC',
      price: 1499,
      category: 'gifts',
      images: [
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&auto=format',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&auto=format',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format',
      ],
      description: 'For those who just said yes to Jesus. Includes: pocket Bible, "Morning Manna" devotional, prayer journal, brass pen, set of 12 scripture cards, and a TNCC tee. Everything a new believer needs to start well.',
      sizes: [],
      meta: [
        ['Includes', '6 items · faith starter kit'],
        ['Occasion', 'Baptism · new-believer welcome'],
        ['Personalization', 'Add a note at checkout via WhatsApp'],
        ['Ships', 'Within 5–7 days across India'],
        ['Support', 'All proceeds fund ministry & missions'],
      ],
    },
  };

  // ============ RENDER ============
  const $ = (s) => document.querySelector(s);
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'tncc-tee-heritage';
  const p = PRODUCTS[id];

  const body = document.getElementById('pd-body');

  if (!p) {
    document.title = 'Product Not Found — RFM Store';
    document.getElementById('crumb-name').textContent = 'Not Found';
    body.innerHTML = `
      <div style="padding:var(--sp-10) 0; text-align:center;">
        <div class="eyebrow">Product not found</div>
        <h1 class="display display-md mt-6">This product doesn't exist yet.</h1>
        <p class="lead mt-6" style="margin-inline:auto;">The link may be broken or the product may have been removed.</p>
        <div class="hero-cta mt-8" style="justify-content:center;">
          <a class="btn btn-primary btn-lg" href="shop.html">← Back to Store</a>
        </div>
      </div>`;
    document.getElementById('related-section').style.display = 'none';
    return;
  }

  // Update page title & breadcrumbs
  document.title = `${p.title} — RFM Store`;
  document.getElementById('crumb-cat').textContent = p.category.charAt(0).toUpperCase() + p.category.slice(1);
  document.getElementById('crumb-name').textContent = p.title;

  // Build size buttons (if any)
  const sizeBlock = p.sizes.length ? `
    <div>
      <div class="pd-option-label">Size</div>
      <div class="size-buttons mt-4">
        ${p.sizes.map(s => `<button class="size-btn${s===p.defaultSize?' selected':''}">${s}</button>`).join('')}
      </div>
    </div>` : '';

  // Build gallery thumbs
  const thumbs = p.images.map((src, i) => `
    <button class="pd-thumb${i===0?' active':''}"><img src="${src}" alt=""></button>
  `).join('');

  body.innerHTML = `
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="pd-main-img"><img src="${p.images[0]}" alt="${p.title}"></div>
        <div class="pd-thumbs">${thumbs}</div>
      </div>

      <div class="pd-info">
        <div class="eyebrow">${p.collection}</div>
        <h1>${p.title}<br><em class="editorial" style="color:var(--gold-bright);font-weight:400;">${p.subtitle}</em></h1>
        <div class="pd-price">₹${p.price.toLocaleString('en-IN')}</div>
        <p class="pd-desc">${p.description}</p>

        <div class="pd-options">
          ${sizeBlock}
          <div>
            <div class="pd-option-label">Quantity</div>
            <div class="qty mt-4">
              <button data-qty="-" aria-label="Decrease">−</button>
              <input type="number" value="1" min="1" aria-label="Quantity">
              <button data-qty="+" aria-label="Increase">+</button>
            </div>
          </div>
        </div>

        <div class="pd-actions">
          <button class="btn btn-primary btn-lg"
            data-add-to-cart
            data-id="${id}"
            data-title="${p.title} — ${p.subtitle}"
            data-price="${p.price}"
            data-img="${p.images[0]}">
            Add to Bag
          </button>
          <a class="btn btn-ghost btn-lg" href="https://wa.me/919000320028?text=${encodeURIComponent("Hi RFM, I'd like to ask about the " + p.title + ".")}" target="_blank" rel="noopener">Ask on WhatsApp</a>
        </div>

        <div class="pd-meta">
          ${p.meta.map(([k,v]) => `<div><strong>${k}</strong>${v}</div>`).join('')}
        </div>
      </div>
    </div>
  `;

  // Wire up thumbnail switcher, size buttons, qty (main.js already does this globally,
  // but we need to re-run since these elements were injected AFTER main.js loaded)
  document.querySelectorAll('.pd-thumb').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.pd-thumb').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const img = document.querySelector('.pd-main-img img');
    const src = t.querySelector('img').src;
    if (img && src) img.src = src;
  }));

  document.querySelectorAll('.size-btn').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
  }));

  document.querySelectorAll('.qty [data-qty]').forEach(b => b.addEventListener('click', () => {
    const input = document.querySelector('.qty input');
    if (!input) return;
    const delta = b.dataset.qty === '+' ? 1 : -1;
    input.value = Math.max(1, (Number(input.value) || 1) + delta);
  }));

  const addBtn = document.querySelector('[data-add-to-cart]');
  if (addBtn) addBtn.addEventListener('click', () => {
    const d = addBtn.dataset;
    const sizeBtn = document.querySelector('.size-btn.selected');
    const qtyInput = document.querySelector('.qty input');
    const item = {
      id: d.id, title: d.title, price: Number(d.price), img: d.img,
      size: sizeBtn ? sizeBtn.textContent.trim() : '',
      qty: qtyInput ? Math.max(1, Number(qtyInput.value) || 1) : 1,
    };
    // Push into cart directly (main.js listens to storage but we call its API)
    const KEY = 'rfm-cart-v1';
    let items = [];
    try { items = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){}
    const key = `${item.id}::${item.size || ''}`;
    const ex = items.find(i => `${i.id}::${i.size || ''}` === key);
    if (ex) ex.qty += item.qty; else items.push(item);
    localStorage.setItem(KEY, JSON.stringify(items));
    // Trigger re-render + open cart via a synthetic click on cart-open (main.js will handle)
    document.dispatchEvent(new Event('cart-updated'));
    document.querySelector('[data-cart-open]')?.click();
  });

  // ============ RELATED PRODUCTS (same category, excluding self) ============
  const related = Object.entries(PRODUCTS)
    .filter(([rid, rp]) => rid !== id && rp.category === p.category)
    .slice(0, 4);

  // If fewer than 4 in same category, fill with any others
  if (related.length < 4) {
    const others = Object.entries(PRODUCTS).filter(([rid]) => rid !== id && !related.find(([r])=>r===rid));
    related.push(...others.slice(0, 4 - related.length));
  }

  document.getElementById('related-list').innerHTML = related.map(([rid, rp]) => `
    <a class="product-card" href="shop-product.html?id=${rid}">
      <div class="product-media"><img src="${rp.images[0]}" alt="${rp.title}" loading="lazy"></div>
      <div class="product-collection">${rp.collection}</div>
      <div class="product-title">${rp.title}</div>
      <div class="product-price">₹${rp.price.toLocaleString('en-IN')}</div>
    </a>
  `).join('');
})();
