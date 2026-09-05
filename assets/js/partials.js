/* ==========================================================================
   RFM SITE v3 — partials.js
   Injects shared header, footer, cart drawer, chatbot into every page.
   Set data-subpage="true" on <body> for pages in subfolders (like /quiz/).
   ========================================================================== */
(function () {
  'use strict';

  const page = document.body.dataset.page || '';
  const isSub = document.body.dataset.subpage === 'true';
  const P = isSub ? '../' : '';   // path prefix
  const isActive = (p) => (p === page ? ' aria-current="page"' : '');

  // ---- Icons (reused) ----
  const CARET = '<svg class="caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3.5L5 6.5L8 3.5"/></svg>';
  const CART_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6L4 3H1"/></svg>';
  const CLOSE = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 2l10 10M12 2L2 12"/></svg>';

  // ---- HEADER ----
  const header = `
<header class="site-header">
  <div class="wrap-wide">
    <a href="${P}index.html" class="brand" aria-label="Raja Faith Ministries — Home">
      <img src="https://rajafaithministries.com/images/logo.webp" alt="">
      <span class="brand-mark"><strong>Raja Faith</strong><span>Ministries</span></span>
    </a>
    <nav class="nav" aria-label="Primary">
      <ul class="nav-list">
        <li><a href="${P}index.html"${isActive('home')}>Home</a></li>
        <li class="has-dropdown">
          <button type="button" aria-expanded="false" aria-haspopup="true">About ${CARET}</button>
          <ul class="dropdown" data-open="false">
            <li><a href="${P}about.html"${isActive('about')}><strong>Pastor Raja</strong><span>A journey of faith</span></a></li>
            <li><a href="${P}vision.html"${isActive('vision')}><strong>Our Vision</strong><span>Transforming lives through Christ</span></a></li>
            <li><a href="${P}mission.html"${isActive('mission')}><strong>Our Mission</strong><span>Serving God • Serving people</span></a></li>
          </ul>
        </li>
        <li class="has-dropdown">
          <button type="button" aria-expanded="false" aria-haspopup="true">Activities ${CARET}</button>
          <ul class="dropdown" data-open="false">
            <li><a href="${P}traditional-leadership.html"${isActive('leadership')}><strong>Traditional Leadership</strong><span>Rooted in Scripture</span></a></li>
            <li><a href="${P}congregation.html"${isActive('congregation')}><strong>Congregation</strong><span>The gathered people of God</span></a></li>
            <li><a href="${P}women_ministry.html"${isActive('women')}><strong>Women Ministry</strong><span>Faith • strength • sisterhood</span></a></li>
            <li><a href="${P}power_of_youth.html"${isActive('youth')}><strong>Power of Youth</strong><span>The rising generation</span></a></li>
            <li><a href="${P}christian_nature_children.html"${isActive('children')}><strong>Children</strong><span>Christian Nature Children</span></a></li>
            <li><a href="${P}culinary_ministry.html"${isActive('culinary')}><strong>Culinary Ministry</strong><span>Fed body • fed soul</span></a></li>
          </ul>
        </li>
        <li class="has-dropdown">
          <button type="button" aria-expanded="false" aria-haspopup="true">Projects ${CARET}</button>
          <ul class="dropdown" data-open="false">
            <li><a href="${P}new_church_building.html"${isActive('church')}><strong>New Church Project</strong><span>Building a house of worship</span></a></li>
            <li><a href="${P}volunteer.html"${isActive('volunteer')}><strong>Volunteer</strong><span>Serve with us</span></a></li>
          </ul>
        </li>
        <li><a href="${P}quiz/index.html"${isActive('quiz')}>Bible Quiz</a></li>
        <li><a href="${P}shop.html"${isActive('shop')}>Store</a></li>
        <li><a href="${P}media.html"${isActive('media')}>Media</a></li>
        <li><a href="${P}testimonies.html"${isActive('testimonies')}>Testimonies</a></li>
        <li><a href="${P}contact.html"${isActive('contact')}>Connect</a></li>
        <li class="mobile-only-give"><a href="${P}donations.html">Give →</a></li>
      </ul>
    </nav>
    <div class="nav-actions">
      <button class="icon-btn" data-cart-open aria-label="Open cart">${CART_ICON}<span class="cart-badge" data-count="0"></span></button>
      <a class="btn btn-oxblood" href="${P}donations.html">Give</a>
      <button class="nav-toggle" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;

  // ---- FOOTER ----
  const socials = `
    <a href="https://www.facebook.com/RajaFaithMinistries" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"/></svg></a>
    <a href="https://www.instagram.com/raja_hebel/?hl=en" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
    <a href="https://www.youtube.com/@RajaFaithMinistries" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-.9C16.7 3.5 12 3.5 12 3.5s-4.7 0-7.9.3c-.4.1-1.4.1-2.2.9C1.2 5.4 1 7 1 7S.8 8.9.8 10.8v1.8C.8 14.5 1 16.4 1 16.4s.2 1.6.9 2.3c.8.9 1.9.8 2.4.9 1.8.2 7.7.3 7.7.3s4.7 0 7.9-.3c.4-.1 1.4-.1 2.2-.9.7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.8C23.2 8.9 23 7 23 7zM9.8 14.7v-6l6 3-6 3z"/></svg></a>
    <a href="https://wa.me/919000320028" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1s-1.2-.4-2.3-1.4c-.8-.7-1.4-1.7-1.6-2s0-.4.1-.5c.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5s0-.4 0-.5c-.1-.1-.7-1.6-.9-2.2s-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg></a>
    <a href="https://t.me/rajafaithministries" target="_blank" rel="noopener" aria-label="Telegram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.6 6.9l-1.5 7.3c-.1.5-.4.6-.8.4l-2.2-1.6-1.1 1c-.1.1-.2.2-.5.2l.2-2.6 4.6-4.1c.2-.2 0-.3-.3-.1l-5.7 3.6-2.4-.8c-.5-.2-.5-.5.1-.8l9.5-3.7c.4-.2.8.1.6.7z"/></svg></a>
    <a href="https://www.linkedin.com/company/raja-faith-ministries/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.3 18H5.7v-8.4h2.6V18zM7 8.4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18.3 18h-2.6v-4.1c0-1-.4-1.6-1.3-1.6-.7 0-1.1.5-1.3 1-.1.2-.1.4-.1.7V18h-2.6s0-7 0-8.4h2.6v1.2c.3-.5 1-1.4 2.5-1.4 1.8 0 3.2 1.2 3.2 3.7V18z"/></svg></a>
    <a href="https://x.com/rajahebel_rfm" target="_blank" rel="noopener" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 3H22l-7.4 8.5L23 21h-6.8l-5.3-6.9L4.7 21H1.6l7.9-9L1 3h7l4.8 6.3L18.9 3zm-1.2 16h1.9L7.4 5H5.4l12.3 14z"/></svg></a>`;

  const footer = `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="https://rajafaithministries.com/images/logo.webp" alt="Raja Faith Ministries">
        <p>Sharing the Gospel of Jesus Christ, transforming lives through worship, prayer, discipleship, and compassionate service.</p>
        <div class="socials">${socials}</div>
      </div>
      <div class="footer-col"><h4>Explore</h4><ul>
        <li><a href="${P}about.html">About Pastor Raja</a></li>
        <li><a href="${P}vision.html">Our Vision</a></li>
        <li><a href="${P}mission.html">Our Mission</a></li>
        <li><a href="${P}testimonies.html">Testimonies</a></li>
        <li><a href="${P}media.html">Media</a></li>
      </ul></div>
      <div class="footer-col"><h4>Activities</h4><ul>
        <li><a href="${P}women_ministry.html">Women Ministry</a></li>
        <li><a href="${P}power_of_youth.html">Power of Youth</a></li>
        <li><a href="${P}christian_nature_children.html">Children</a></li>
        <li><a href="${P}culinary_ministry.html">Culinary Ministry</a></li>
        <li><a href="${P}congregation.html">Congregation</a></li>
        <li><a href="${P}quiz/index.html">Bible Quiz</a></li>
      </ul></div>
      <div class="footer-col"><h4>Get Involved</h4><ul>
        <li><a href="${P}donations.html">Give</a></li>
        <li><a href="${P}volunteer.html">Volunteer</a></li>
        <li><a href="${P}new_church_building.html">New Church Project</a></li>
        <li><a href="${P}shop.html">RFM Store</a></li>
        <li><a href="${P}contact.html">Connect</a></li>
      </ul></div>
      <div class="footer-col"><h4>Contact</h4><ul>
        <li>Hyderabad, Telangana</li>
        <li><a href="tel:+919000320028">+91 90003 20028</a></li>
        <li><a href="tel:+919346077114">+91 93460 77114</a></li>
        <li><a href="mailto:connect@rajafaithministries.com">connect@rajafaithministries.com</a></li>
        <li>Sunday Worship · 11:15 AM</li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <div>© <span data-year>2026</span> Raja Faith Ministries. All rights reserved.</div>
      <div>Faith · Word · Kingdom</div>
    </div>
  </div>
</footer>`;

  // ---- CART DRAWER ----
  const cartDrawer = `
<aside class="cart-drawer" aria-label="Shopping cart">
  <header>
    <h3>Your Bag</h3>
    <button class="icon-btn" data-cart-close aria-label="Close cart">${CLOSE}</button>
  </header>
  <div class="cart-items"></div>
  <div class="cart-footer">
    <div class="cart-total"><span>Subtotal</span><span class="cart-total-amount">₹0</span></div>
    <button class="btn btn-primary btn-lg" data-checkout style="justify-content:center;">Checkout via WhatsApp</button>
    <p class="cart-note">Orders are confirmed by the RFM team. All proceeds support ministry.</p>
  </div>
</aside>`;

  // ---- CHATBOT ----
  const chatbot = `
<button class="chatbot-toggle" aria-label="Open chat" data-chat-toggle>
  <svg class="open-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8 16l-1 4 4-1a10 10 0 108-19z"/></svg>
  <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
</button>
<div class="chatbot-window" role="dialog" aria-label="RFM Chat Assistant">
  <div class="chatbot-header">
    <h3>Hello, friend</h3>
    <p>Ask me anything about RFM — service times, giving, prayer, the store.</p>
  </div>
  <div class="chatbot-messages" id="chat-messages">
    <div class="msg bot">Welcome to Raja Faith Ministries. I'm here to help. What can I share with you today?</div>
  </div>
  <div class="chatbot-suggestions" id="chat-suggestions">
    <button>When is Sunday service?</button>
    <button>How can I give?</button>
    <button>Prayer request</button>
    <button>Visit the store</button>
    <button>Contact Pastor Raja</button>
  </div>
  <form class="chatbot-input" id="chat-form">
    <input type="text" id="chat-input" placeholder="Type your message…" aria-label="Your message" autocomplete="off">
    <button type="submit" aria-label="Send"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h12M9 3l5 5-5 5"/></svg></button>
  </form>
</div>`;

  // ---- INJECT ----
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) headerSlot.outerHTML = header;

  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) footerSlot.outerHTML = footer + cartDrawer + chatbot;

  // Sunday popup on homepage only
  if (page === 'home') {
    const popupSlot = document.getElementById('popup-slot');
    if (popupSlot) popupSlot.outerHTML = `
<div class="popup-backdrop" role="dialog" aria-modal="true" aria-labelledby="popup-title">
  <div class="popup">
    <img src="https://rajafaithministries.com/images/sunday-service-popup.webp" alt="" onerror="this.style.display='none'">
    <div class="popup-body">
      <h3 id="popup-title">Join us this Sunday</h3>
      <p>Sunday Worship with Pastor Raja Hebel — 11:15 AM at ACTC, Kavadiguda, Hyderabad.</p>
      <div class="popup-actions">
        <a class="btn btn-primary" href="https://maps.google.com/?q=ACTC+Kavadiguda+Hyderabad" target="_blank" rel="noopener">Get Directions</a>
        <button class="popup-close" data-popup-close>Maybe Later</button>
      </div>
    </div>
  </div>
</div>`;
  }
})();
