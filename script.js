/* ==========================================================================
   SITE: the one place to edit the salon's details.
   Everything on the page (services, opening hours, open-now text, footer hours,
   phone numbers, social links and the gallery) is built from this object.
   Change a value here, save, and the whole site updates. Keep the quote marks,
   commas and curly brackets exactly as they are.
   ========================================================================== */
const SITE = {
  // Phone number shown on the page, and the same number for the tap-to-call link.
  // The link has no spaces or brackets: +61 then the number without its first 0.
  phoneDisplay: '(02) 6921 1513',
  phoneLink: 'tel:+61269211513',

  // Shown in the Visit section and the FAQ.
  address: '135 Docker St, Wagga Wagga NSW 2650',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cedar+%26+Sage+Hair+Studio+135+Docker+St+Wagga+Wagga+NSW+2650',

  // Social links. The handle is the text shown on the page.
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61556608630633',
    instagram: 'https://www.instagram.com/cedar_sage_hair/',
    instagramHandle: '@cedar_sage_hair'
  },

  // Google rating shown in the "What our clients say" section. Change these two numbers
  // to match the salon's Google listing. rating can have one decimal, for example 4.5.
  rating: 5.0,
  reviewCount: 1,

  // Opening hours drive the Visit table, the footer summary and the "Open now" text.
  // Times are 24 hour: '15:00' means 3:00pm. Use null for a day the salon is closed.
  // Example: to open Mondays 10am to 2pm, change  monday: null  to
  //          monday: { open: '10:00', close: '14:00' }
  timezone: 'Australia/Sydney',
  hours: {
    monday: null,
    tuesday: { open: '09:00', close: '15:00' },
    wednesday: { open: '09:00', close: '15:00' },
    thursday: { open: '09:30', close: '20:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '09:00', close: '13:00' },
    sunday: null
  },

  // Services. One line per service. "group" decides which heading it sits under
  // (groups appear in the order they first show up). "price" is a number of dollars.
  // Set from: true to show "from $75", or from: false to show a fixed "$40".
  // To add a service, copy a line and edit it, for example:
  //   { group: 'Cuts', name: 'Fringe Trim', description: 'A quick tidy of your fringe.', price: 15, from: false },
  // PLACEHOLDER PRICES - replace with the salon's real price list before this site is shown to the client.
  services: [
    { group: 'Cuts', name: 'Ladies Cut & Finish', description: 'A cut shaped to suit you, finished with a blow dry.', price: 75, from: true },
    { group: 'Cuts', name: 'Restyle', description: 'A new shape or a big change, planned with you first.', price: 95, from: true },
    { group: 'Cuts', name: "Men's Cut", description: 'A neat, classic cut.', price: 40, from: false },
    { group: 'Cuts', name: 'Kids Cut (under 12)', description: 'A relaxed, gentle cut for children under 12.', price: 35, from: false },
    { group: 'Colour', name: 'Full Colour', description: 'One colour from roots to ends.', price: 140, from: true },
    { group: 'Colour', name: 'Regrowth Tint', description: 'Fresh colour on the roots to cover regrowth.', price: 110, from: true },
    { group: 'Colour', name: 'Half Head Foils', description: 'Foils through the top and crown for soft dimension.', price: 150, from: true },
    { group: 'Colour', name: 'Full Head Foils', description: 'Foils through the whole head for all-over lift.', price: 190, from: true },
    { group: 'Colour', name: 'Balayage', description: 'Hand-painted colour for a soft, natural grow-out.', price: 210, from: true },
    { group: 'Colour', name: 'Toner', description: 'A finishing tone to refine or freshen your colour.', price: 45, from: false },
    { group: 'Finish & Treatments', name: 'Blow Dry & Finish', description: 'A smooth, polished blow dry.', price: 55, from: true },
    { group: 'Finish & Treatments', name: 'Hair Treatment', description: 'A conditioning treatment to leave hair feeling soft.', price: 30, from: false }
  ],

  // Gallery photos. "src" is the file in the images folder (or a full web address),
  // "alt" describes the photo for people who cannot see it. To swap or add a photo,
  // upload the file to the images folder and add a line, for example:
  //   { src: 'images/my-photo.jpg', alt: 'A short description of what the photo shows' },
  // The Instagram strip uses the first four photos in this list.
  gallery: [
    { src: 'images/gallery-colour-tint.jpg', alt: 'Two stylists in gloves painting colour onto a client\'s hair with tint brushes' },
    { src: 'images/gallery-colour-foils.jpg', alt: 'A stylist brushing colour onto foil-wrapped sections of long dark hair' },
    { src: 'images/gallery-blow-dry.jpg', alt: 'A stylist blow drying a client\'s wavy hair with a round brush' },
    { src: 'images/gallery-basin.jpg', alt: 'A client reclined at a salon basin having her long hair rinsed' },
    { src: 'images/gallery-salon-interior.jpg', alt: 'A bright salon interior with black chairs, round mirrors and a brick wall' },
    { src: 'images/gallery-updo.jpg', alt: 'A stylist creating an updo for a client seated in a salon chair' }
  ]
};

/* ==========================================================================
   Everything below builds the page from SITE. You should not need to edit it.
   ========================================================================== */
(function () {
  'use strict';

  var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* ---- Time helpers ---- */
  function toMins(t) { var p = t.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
  function fmtTime(t) {
    var m = toMins(t), h = Math.floor(m / 60), min = m % 60;
    return (h % 12 || 12) + ':' + (min < 10 ? '0' : '') + min + (h < 12 ? 'am' : 'pm');
  }
  function fmtRange(d) { return d ? fmtTime(d.open) + ' to ' + fmtTime(d.close) : 'Closed'; }

  /* ---- Plain details: phone, address, social links ---- */
  function bindDetails() {
    var text = {
      phoneDisplay: SITE.phoneDisplay,
      address: SITE.address,
      instagramHandle: SITE.social.instagramHandle
    };
    var href = {
      phoneLink: SITE.phoneLink,
      mapsUrl: SITE.mapsUrl,
      facebook: SITE.social.facebook,
      instagram: SITE.social.instagram
    };
    $$('[data-site]').forEach(function (n) { n.textContent = text[n.getAttribute('data-site')]; });
    $$('[data-site-href]').forEach(function (n) { n.setAttribute('href', href[n.getAttribute('data-site-href')]); });
  }

  /* ---- Services menu ---- */
  function renderServices() {
    var host = $('#menu');
    if (!host) return;
    var groups = [], byName = {};
    SITE.services.forEach(function (s) {
      if (!byName[s.group]) { byName[s.group] = []; groups.push(s.group); }
      byName[s.group].push(s);
    });
    groups.forEach(function (g, i) {
      var sec = el('div', 'menu-group');
      var label = el('p', 'group-label');
      label.appendChild(el('span', 'num', (i < 9 ? '0' : '') + (i + 1)));
      label.appendChild(document.createTextNode(g));
      sec.appendChild(label);
      var ul = el('ul', 'menu');
      byName[g].forEach(function (s) {
        var li = el('li', 'menu-item');
        li.appendChild(el('span', 'item-name', s.name));
        li.appendChild(el('span', 'item-dots'));
        li.appendChild(el('span', 'item-price', (s.from ? 'from ' : '') + '$' + s.price));
        li.appendChild(el('p', 'item-desc', s.description));
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      host.appendChild(sec);
    });
  }

  /* ---- Opening hours: table, footer summary, open-now text ---- */
  function renderHours() {
    var body = $('#hours-body');
    if (body) {
      WEEK.forEach(function (d) {
        var tr = el('tr');
        var th = el('th', '', cap(d)); th.setAttribute('scope', 'row');
        tr.appendChild(th);
        tr.appendChild(el('td', '', fmtRange(SITE.hours[d])));
        body.appendChild(tr);
      });
    }
    var foot = $('#foot-hours');
    if (foot) {
      var runs = [], closed = [];
      WEEK.forEach(function (d) {
        var h = SITE.hours[d];
        if (!h) { closed.push(cap(d).slice(0, 3)); return; }
        var r = fmtRange(h), last = runs[runs.length - 1];
        if (last && last.range === r && last.lastIndex === WEEK.indexOf(d) - 1) {
          last.end = cap(d).slice(0, 3); last.lastIndex = WEEK.indexOf(d);
        } else {
          runs.push({ start: cap(d).slice(0, 3), end: null, range: r, lastIndex: WEEK.indexOf(d) });
        }
      });
      var parts = runs.map(function (r) { return (r.end ? r.start + ' to ' + r.end : r.start) + ' ' + r.range; });
      if (closed.length) parts.push('Closed ' + closed.join(' and '));
      foot.textContent = parts.join('. ') + '.';
    }
    updateOpenNow();
    setInterval(updateOpenNow, 60000);
  }

  function nowInSalon() {
    var parts = new Intl.DateTimeFormat('en-AU', {
      timeZone: SITE.timezone, weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    return { day: o.weekday.toLowerCase(), mins: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }

  function openNowText() {
    var n = nowInSalon(), today = SITE.hours[n.day];
    if (today && n.mins >= toMins(today.open) && n.mins < toMins(today.close)) {
      return { open: true, text: 'Open now, closes ' + fmtTime(today.close) };
    }
    var idx = DAYS.indexOf(n.day);
    for (var i = 0; i < 8; i++) {
      var d = DAYS[(idx + i) % 7], h = SITE.hours[d];
      if (!h) continue;
      if (i === 0 && n.mins >= toMins(h.open)) continue;
      var when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : cap(d);
      return { open: false, text: 'Closed, opens ' + when + ' ' + fmtTime(h.open) };
    }
    return { open: false, text: 'Closed' };
  }

  function updateOpenNow() {
    var r = openNowText();
    $$('.open-now').forEach(function (n) {
      n.textContent = r.text;
      n.classList.toggle('is-open', r.open);
      n.hidden = false;
    });
  }

  /* ---- Gallery, lightbox and Instagram strip ---- */
  function renderGallery() {
    var grid = $('#gallery-grid');
    if (grid) {
      SITE.gallery.forEach(function (g, i) {
        var b = el('button', 'tile');
        b.type = 'button';
        b.setAttribute('aria-label', 'View larger: ' + g.alt);
        var img = el('img'); img.src = g.src; img.alt = ''; img.loading = 'lazy'; img.width = 700; img.height = 525;
        b.appendChild(img);
        b.addEventListener('click', function () { openBox(i, b); });
        grid.appendChild(b);
      });
    }
    var strip = $('#insta-grid');
    if (strip) {
      SITE.gallery.slice(0, 4).forEach(function (g) {
        var a = el('a', 'tile');
        a.href = SITE.social.instagram; a.target = '_blank'; a.rel = 'noopener';
        a.setAttribute('aria-label', 'View photos on Instagram: ' + g.alt);
        var img = el('img'); img.src = g.src; img.alt = ''; img.loading = 'lazy'; img.width = 700; img.height = 525;
        a.appendChild(img);
        strip.appendChild(a);
      });
    }
  }

  var box, boxImg, boxCap, boxCount, current = 0, opener = null;
  function showBox(i) {
    var n = SITE.gallery.length;
    current = (i + n) % n;
    boxImg.src = SITE.gallery[current].src;
    boxImg.alt = SITE.gallery[current].alt;
    boxCap.textContent = SITE.gallery[current].alt;
    boxCount.textContent = (current + 1) + ' of ' + n;
  }
  function openBox(i, from) {
    opener = from;
    showBox(i);
    box.hidden = false;
    document.body.classList.add('no-scroll');
    $('.lb-close', box).focus();
  }
  function closeBox() {
    box.hidden = true;
    document.body.classList.remove('no-scroll');
    if (opener) opener.focus();
  }
  function setupLightbox() {
    box = $('#lightbox');
    if (!box) return;
    boxImg = $('.lb-img', box); boxCap = $('.lb-cap', box); boxCount = $('.lb-count', box);
    $('.lb-close', box).addEventListener('click', closeBox);
    $('.lb-prev', box).addEventListener('click', function () { showBox(current - 1); });
    $('.lb-next', box).addEventListener('click', function () { showBox(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lb-stage')) closeBox(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') closeBox();
      else if (e.key === 'ArrowLeft') showBox(current - 1);
      else if (e.key === 'ArrowRight') showBox(current + 1);
      else if (e.key === 'Tab') {
        var f = $$('button', box), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---- Header, mobile bar, current-section highlight ---- */
  function setupChrome() {
    var header = $('.top-bar');
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 20); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var bar = $('.mobile-bar'), foot = $('.foot');
    if (bar && foot && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { bar.classList.toggle('is-hidden', e[0].isIntersecting); }).observe(foot);
    }

    var links = $$('.top-links a');
    if ('IntersectionObserver' in window) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          var a = map[e.target.id];
          if (a) a.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---- Review rating: stars fill one by one and the number counts up, once ---- */
  function setupRating() {
    var sec = $('#reviews');
    if (!sec) return;
    var rating = Math.max(0, Math.min(5, Number(SITE.rating) || 0));
    var count = Number(SITE.reviewCount) || 0;
    var num = $('.rating-number', sec), from = $('.rating-from', sec), fills = $$('.star-fill', sec);
    var finalText = rating.toFixed(1);
    num.textContent = finalText;
    num.setAttribute('aria-label', 'Rated ' + finalText + ' out of 5');
    from.textContent = 'from ' + count + ' Google review' + (count === 1 ? '' : 's');
    var target = fills.map(function (f, i) { return Math.max(0, Math.min(1, rating - i)); });
    var setFill = function (i, p) { fills[i].style.width = (p * 100) + '%'; };
    var showFinal = function () { target.forEach(function (t, i) { setFill(i, t); }); num.textContent = finalText; };

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { showFinal(); return; }

    var STAR_MS = 300, STAGGER_MS = 150, COUNT_MS = 1200;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    fills.forEach(function (f, i) { setFill(i, 0); });
    num.textContent = (0).toFixed(1);

    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      var start = null;
      requestAnimationFrame(function tick(now) {
        if (start === null) start = now;
        var t = now - start;
        fills.forEach(function (f, i) {
          var p = Math.max(0, Math.min(1, (t - i * STAGGER_MS) / STAR_MS));
          setFill(i, target[i] * ease(p));
        });
        var c = Math.min(1, t / COUNT_MS);
        num.textContent = (rating * ease(c)).toFixed(1);
        if (t < Math.max(COUNT_MS, 4 * STAGGER_MS + STAR_MS)) requestAnimationFrame(tick);
        else showFinal();
      });
    }, { threshold: 0.4 });
    io.observe(sec);
  }

  /* ---- Scroll reveal (GSAP), once only, skipped for reduced motion ---- */
  function setupReveal() {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    $$('.reveal').forEach(function (n) {
      gsap.from(n, {
        opacity: 0, y: 24, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: n, start: 'top 88%', once: true }
      });
    });
  }

  bindDetails();
  setupRating();
  renderServices();
  renderHours();
  renderGallery();
  setupLightbox();
  setupChrome();
  window.addEventListener('load', setupReveal);
})();
