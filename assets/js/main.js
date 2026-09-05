/* ==========================================================================
   RFM SITE v2 — main.js
   No dependencies. All progressive enhancement.
   ========================================================================== */

(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const on = (el, ev, fn, o) => el && el.addEventListener(ev, fn, o);

  /* ----------------------------------------------------------------------
     1. Header scroll state
     ---------------------------------------------------------------------- */
  const header = $('.site-header');
  if (header) {
    const update = () => header.classList.toggle('scrolled', window.scrollY > 12);
    update();
    on(window, 'scroll', update, { passive: true });
  }

  /* ----------------------------------------------------------------------
     2. Mobile nav toggle
     ---------------------------------------------------------------------- */
  const toggle = $('.nav-toggle');
  const navList = $('.nav-list');
  if (toggle && navList) {
    on(toggle, 'click', () => {
      const open = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ----------------------------------------------------------------------
     3. Dropdowns (hover on desktop, click on mobile)
     ---------------------------------------------------------------------- */
  $$('.has-dropdown').forEach((li) => {
    const btn = $('button', li);
    const menu = $('.dropdown', li);
    if (!btn || !menu) return;

    const openMenu = () => { menu.setAttribute('data-open', 'true'); btn.setAttribute('aria-expanded', 'true'); };
    const closeMenu = () => { menu.setAttribute('data-open', 'false'); btn.setAttribute('aria-expanded', 'false'); };

    // Click to toggle (works on both desktop + mobile)
    on(btn, 'click', (e) => {
      e.preventDefault();
      const isOpen = menu.getAttribute('data-open') === 'true';
      $$('.dropdown[data-open="true"]').forEach((d) => d.setAttribute('data-open', 'false'));
      $$('.has-dropdown button[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) openMenu();
    });

    // Hover to open (desktop only)
    if (window.matchMedia('(min-width: 1025px) and (hover: hover)').matches) {
      on(li, 'mouseenter', openMenu);
      on(li, 'mouseleave', closeMenu);
    }
  });

  // Close dropdowns on outside click
  on(document, 'click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      $$('.dropdown[data-open="true"]').forEach((d) => d.setAttribute('data-open', 'false'));
      $$('.has-dropdown button[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    }
  });

  // Esc to close everything
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape') {
      $$('.dropdown[data-open="true"]').forEach((d) => d.setAttribute('data-open', 'false'));
      $$('.has-dropdown button[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
      if (navList && navList.classList.contains('open')) {
        navList.classList.remove('open');
        toggle && toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
      closeCart();
      closePopup();
    }
  });

  /* ----------------------------------------------------------------------
     4. Reveal on scroll (opt-in via data-reveal)
     ---------------------------------------------------------------------- */
  const reveals = $$('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add('in');
      else io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ----------------------------------------------------------------------
     5. Hero cursor spotlight
     ---------------------------------------------------------------------- */
  const spotlight = $('.hero-spotlight');
  if (spotlight && window.matchMedia('(hover: hover)').matches) {
    const hero = $('.hero');
    let raf = null;
    on(hero, 'mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        spotlight.style.setProperty('--mx', mx + '%');
        spotlight.style.setProperty('--my', my + '%');
        raf = null;
      });
    });
  }

  /* ----------------------------------------------------------------------
     6. Verse rail — changes with scroll position
     ---------------------------------------------------------------------- */
  const verses = [
    { text: 'The unfolding of your words gives light.', ref: 'Psalm 119:130' },
    { text: 'I have come that they may have life.',      ref: 'John 10:10' },
    { text: 'Now thanks be to God who leads us in triumph.', ref: '2 Cor 2:14' },
    { text: 'Old things have passed away; all things are new.', ref: '2 Cor 5:17' },
    { text: 'Not to be served, but to serve.',           ref: 'Mark 10:45' },
  ];
  const rail = $('.verse-rail span');
  if (rail) {
    let last = -1;
    const update = () => {
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      const idx = Math.min(verses.length - 1, Math.floor(progress * verses.length));
      if (idx !== last) {
        last = idx;
        rail.style.opacity = '0';
        setTimeout(() => {
          rail.textContent = `${verses[idx].text}  —  ${verses[idx].ref}`;
          rail.style.opacity = '1';
        }, 250);
      }
    };
    update();
    on(window, 'scroll', () => requestAnimationFrame(update), { passive: true });
  }

  /* ----------------------------------------------------------------------
     7. Popup modal (Sunday-service — once per session)
     ---------------------------------------------------------------------- */
  const popup = $('.popup-backdrop');
  const openPopup = () => popup && popup.classList.add('open');
  const closePopup = () => popup && popup.classList.remove('open');
  if (popup) {
    const shown = sessionStorage.getItem('rfm-popup-shown');
    if (!shown) {
      setTimeout(openPopup, 2500);
      sessionStorage.setItem('rfm-popup-shown', '1');
    }
    $$('[data-popup-close]', popup).forEach((b) => on(b, 'click', closePopup));
    on(popup, 'click', (e) => { if (e.target === popup) closePopup(); });
  }

  /* ----------------------------------------------------------------------
     8. Cart (localStorage) — used across shop pages
     ---------------------------------------------------------------------- */
  const CART_KEY = 'rfm-cart-v1';
  const readCart = () => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
  };
  const writeCart = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    renderCart();
  };
  const addToCart = (item) => {
    const items = readCart();
    const key = `${item.id}::${item.size || ''}`;
    const existing = items.find((i) => `${i.id}::${i.size || ''}` === key);
    if (existing) existing.qty += item.qty || 1;
    else items.push({ ...item, qty: item.qty || 1 });
    writeCart(items);
    openCart();
  };
  const removeFromCart = (id, size) => {
    writeCart(readCart().filter((i) => !(i.id === id && (i.size || '') === (size || ''))));
  };

  const drawer = $('.cart-drawer');
  const openCart = () => drawer && drawer.classList.add('open');
  const closeCart = () => drawer && drawer.classList.remove('open');

  const cartBtn = $('[data-cart-open]');
  if (cartBtn) on(cartBtn, 'click', openCart);
  $$('[data-cart-close]').forEach((b) => on(b, 'click', closeCart));

  const badge = $('.cart-badge');
  const itemsEl = $('.cart-items');
  const totalEl = $('.cart-total-amount');

  function renderCart() {
    const items = readCart();
    const count = items.reduce((s, i) => s + i.qty, 0);
    if (badge) badge.setAttribute('data-count', String(count));
    if (!itemsEl) return;

    if (!items.length) {
      itemsEl.innerHTML = '<div class="cart-empty"><p>Your cart is quiet.</p><p style="margin-top:1rem;"><a href="shop.html" style="color:var(--gold);">Browse the collections →</a></p></div>';
      if (totalEl) totalEl.textContent = '₹0';
      return;
    }
    itemsEl.innerHTML = items.map((i) => `
      <div class="cart-item">
        <img src="${i.img}" alt="" loading="lazy">
        <div>
          <div class="cart-item-title">${i.title}</div>
          <div class="cart-item-meta">${i.size ? 'Size ' + i.size + ' · ' : ''}Qty ${i.qty}</div>
          <div class="cart-item-price">₹${(i.price * i.qty).toLocaleString('en-IN')}</div>
        </div>
        <button class="remove" data-remove="${i.id}" data-size="${i.size || ''}">Remove</button>
      </div>
    `).join('');

    $$('[data-remove]', itemsEl).forEach((b) => on(b, 'click', () => removeFromCart(b.dataset.remove, b.dataset.size)));

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    if (totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');
  }
  renderCart();

  // Listen for cart updates dispatched by product-detail.js (dynamic PDP)
  on(document, 'cart-updated', renderCart);

  // Product-detail: Add to cart handler
  const addBtn = $('[data-add-to-cart]');
  if (addBtn) {
    on(addBtn, 'click', () => {
      const data = addBtn.dataset;
      const sizeBtn = $('.size-btn.selected');
      const qtyInput = $('.qty input');
      addToCart({
        id: data.id,
        title: data.title,
        price: Number(data.price),
        img: data.img,
        size: sizeBtn ? sizeBtn.textContent.trim() : '',
        qty: qtyInput ? Math.max(1, Number(qtyInput.value) || 1) : 1,
      });
    });
  }

  // Product-detail: size selection
  $$('.size-btn').forEach((b) => on(b, 'click', () => {
    $$('.size-btn').forEach((x) => x.classList.remove('selected'));
    b.classList.add('selected');
  }));

  // Product-detail: qty controls
  $$('.qty [data-qty]').forEach((b) => on(b, 'click', () => {
    const input = $('.qty input');
    if (!input) return;
    const delta = b.dataset.qty === '+' ? 1 : -1;
    input.value = Math.max(1, (Number(input.value) || 1) + delta);
  }));

  // Product-detail: thumbnail switcher
  $$('.pd-thumb').forEach((t) => on(t, 'click', () => {
    $$('.pd-thumb').forEach((x) => x.classList.remove('active'));
    t.classList.add('active');
    const main = $('.pd-main-img img');
    const src = t.querySelector('img')?.src;
    if (main && src) main.src = src;
  }));

  // Checkout — WhatsApp fallback (perfect for a ministry with no payment integration yet)
  const checkoutBtn = $('[data-checkout]');
  if (checkoutBtn) {
    on(checkoutBtn, 'click', () => {
      const items = readCart();
      if (!items.length) return;
      const total = items.reduce((s, i) => s + i.price * i.qty, 0);
      const lines = items.map((i) => `• ${i.title}${i.size ? ' (' + i.size + ')' : ''} × ${i.qty} — ₹${(i.price * i.qty).toLocaleString('en-IN')}`);
      const msg =
        `Hello RFM Team,%0A%0AI'd like to order the following from the RFM Store:%0A%0A${lines.join('%0A')}%0A%0ATotal: ₹${total.toLocaleString('en-IN')}%0A%0APlease confirm availability and share payment details. Thank you!`;
      window.open(`https://wa.me/919000320028?text=${msg}`, '_blank');
    });
  }

  /* ----------------------------------------------------------------------
     9. Year in footer
     ---------------------------------------------------------------------- */
  const y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

})();

/* ==========================================================================
   RFM SITE v2 — chatbot.js (appended to main.js)
   Rule-based intent matching. No external API. Escalates to WhatsApp.
   ========================================================================== */
(function () {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

  const toggle = document.querySelector('[data-chat-toggle]');
  const win = document.querySelector('.chatbot-window');
  const msgs = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const suggs = document.getElementById('chat-suggestions');
  if (!toggle || !win) return;

  const scroll = () => { msgs.scrollTop = msgs.scrollHeight; };
  const add = (text, who = 'bot') => {
    const el = document.createElement('div');
    el.className = 'msg ' + who;
    el.innerHTML = text;
    msgs.appendChild(el);
    scroll();
  };

  on(toggle, 'click', () => {
    const open = win.classList.toggle('open');
    toggle.classList.toggle('open', open);
    if (open) setTimeout(() => input?.focus(), 300);
  });

  // Rule-based intent matcher — keywords → answer
  const rules = [
    { keys: ['sunday', 'service', 'worship', 'time', 'when', 'timing', 'timings'],
      reply: 'Our Sunday Worship is every Sunday at <b>11:15 AM</b> at Andhra Christian Theological College (ACTC), Kavadiguda, Hyderabad. <a href="https://maps.google.com/?q=ACTC+Kavadiguda+Hyderabad" target="_blank">Get directions →</a>' },
    { keys: ['give', 'donate', 'donation', 'offering', 'contribute', 'partner', 'support'],
      reply: 'Thank you for your heart to give! You can partner with us in several ways — one-time or monthly, via UPI, bank transfer, or as a Ministry Partner. Full details are on our <a href="donations.html">giving page</a>.' },
    { keys: ['pray', 'prayer', 'need prayer'],
      reply: 'We would be honored to pray for you. Please send your request via <a href="https://wa.me/919000320028?text=Prayer%20Request:%20" target="_blank">WhatsApp</a> or through our <a href="contact.html">contact page</a>. Pastor Raja and the prayer team will lift you up.' },
    { keys: ['store', 'shop', 'buy', 'merchandise', 'tshirt', 't-shirt', 'book', 'hoodie', 'product'],
      reply: 'Our <a href="shop.html">RFM &amp; TNCC store</a> has apparel, books, journals, and gift sets. All proceeds fund ministry. Would you like a specific category?' },
    { keys: ['pastor', 'raja', 'about', 'hebel', 'who'],
      reply: 'Pastor Raja Hebel is the founder of Raja Faith Ministries. Read his <a href="about.html">full story here →</a>' },
    { keys: ['contact', 'phone', 'call', 'email', 'reach', 'address'],
      reply: 'You can reach us at <a href="tel:+919000320028">+91 90003 20028</a>, email <a href="mailto:connect@rajafaithministries.com">connect@rajafaithministries.com</a>, or visit our <a href="contact.html">contact page</a>.' },
    { keys: ['volunteer', 'serve', 'help', 'join team'],
      reply: 'We would love to have you serve with us! Please fill out our <a href="volunteer.html">volunteer form</a> and we\'ll be in touch.' },
    { keys: ['quiz', 'bible quiz', 'test'],
      reply: 'Try our <a href="quiz/index.html">Bible Quiz</a> — a fun way to test and grow your Scripture knowledge.' },
    { keys: ['women', 'ladies', 'sister'],
      reply: 'Learn about our <a href="women_ministry.html">Women Ministry</a> — a sisterhood of faith, strength, and prayer.' },
    { keys: ['youth', 'young', 'college'],
      reply: 'Our <a href="power_of_youth.html">Power of Youth</a> ministry is for the rising generation — worship, discipleship, and mission.' },
    { keys: ['kids', 'child', 'children', 'sunday school'],
      reply: 'Our <a href="christian_nature_children.html">Children\'s Ministry</a> creates a joyful, safe, Christ-centered space for kids.' },
    { keys: ['new church', 'building', 'project'],
      reply: 'We are building a new church! Learn about the <a href="new_church_building.html">project here</a> and how you can partner with us.' },
    { keys: ['testimony', 'testimonies', 'story', 'stories'],
      reply: 'Read powerful <a href="testimonies.html">testimonies</a> of God\'s faithfulness — or share your own.' },
    { keys: ['media', 'video', 'photo', 'anniversary', 'gallery'],
      reply: 'Explore our <a href="media.html">media gallery</a> — sermons, events, and RFM anniversaries.' },
    { keys: ['live', 'youtube', 'stream'],
      reply: 'Watch our services live on <a href="https://www.youtube.com/@RajaFaithMinistries/live" target="_blank">YouTube →</a>' },
    { keys: ['thank', 'thanks', 'thx', 'ty', 'appreciate'],
      reply: 'You are most welcome. May the Lord bless you today. 🙏' },
    { keys: ['hello', 'hi', 'hey', 'namaste', 'greetings', 'good morning', 'good evening'],
      reply: 'Hello, welcome! How can I help you today? You can ask about service times, giving, prayer, or our store.' },
    { keys: ['bye', 'goodbye', 'see you'],
      reply: 'God bless you! We hope to see you at our Sunday service, 11:15 AM at ACTC, Kavadiguda.' },
  ];

  const findReply = (text) => {
    const lc = text.toLowerCase();
    for (const r of rules) {
      if (r.keys.some(k => lc.includes(k))) return r.reply;
    }
    return `I don't have an answer for that yet, but our team would love to help. Please <a href="https://wa.me/919000320028?text=${encodeURIComponent(text)}" target="_blank">reach us on WhatsApp</a> or use our <a href="contact.html">contact form</a>.`;
  };

  const handle = (text) => {
    if (!text.trim()) return;
    add(text, 'user');
    if (suggs) suggs.style.display = 'none';
    setTimeout(() => add(findReply(text)), 500);
  };

  on(form, 'submit', (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = '';
    handle(v);
  });

  if (suggs) {
    suggs.querySelectorAll('button').forEach((b) =>
      on(b, 'click', () => handle(b.textContent))
    );
  }
})();
