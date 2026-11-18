/* Generated English UI: edit the shared source/catalog, then run scripts/build_en_tijuana.py. */
/* Lead widget (version B), adapted from the Dr. Romario Perea infiltraciones widget.
 *
 * Turns the existing WhatsApp panel (#wa-panel, from the footer) into a short form:
 * name + contact phone. A valid submit
 *   1. sends `lead_form_submit` to Google Analytics (a key event there),
 *   2. emails the lead through Formspree (FORMSPREE_URL below),
 *   3. opens WhatsApp with the message already written.
 * Every other WhatsApp link on the page (hero, cards, header CTA) opens this widget instead
 * of jumping straight to WhatsApp, so every lead goes through the form.
 *
 * City, WhatsApp number and phone come from the panel the page already has, so the same file
 * works for Tijuana, Guadalajara, Rosarito and the brand home.
 * Load with: <script defer src="/Assets/js/lead-widget-b.js?v=1"></script>
 */
(function () {
  // Formspree form that emails the leads. Empty = no email is sent (WhatsApp still opens).
  var FORMSPREE_URL = 'https://formspree.io/f/mzerrvqd';
  var IS_LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var CSS_HREF = '/Assets/css/lead-widget-b.css?v=8';
  // Cloudflare Turnstile bot check: Cloudflare's always-pass test key on localhost, the real
  // site key (doctordecolumna.com) everywhere else. Runs invisibly; it only asks for a click
  // when Cloudflare is unsure about the visitor. The secret key is not used here.
  var TURNSTILE_SITEKEY = IS_LOCAL ? '1x00000000000000000000AA' : '0x4AAAAAAGFXKmr5xKctuxhx';
  var TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

  var TOPICS = {
    'hernia-de-disco': 'Lumbar disc herniation',
    'hernia-de-disco-cervical': 'Cervical disc herniation',
    'dolor-ciatica': 'Sciatica',
    'estenosis-espinal': 'Spinal stenosis',
    'espondilolistesis': 'Spondylolisthesis',
    'escoliosis-adulto': 'Adult scoliosis',
    'dolor-lumbar': 'Low back pain',
    'dolor-cervical-radiculopatia': 'Cervical radiculopathy',
    'fractura-de-columna': 'Spinal fracture',
    'endoscopia-de-columna': 'Endoscopic spine surgery',
    'cirugia-de-columna-vertebral': 'Spine surgery',
    'microdiscectomia': 'Microdiscectomy',
    'cirugia-descompresion-lumbar': 'Lumbar decompression',
    'fusion-vertebral': 'Spinal fusion',
    'bloqueos-epidurales': 'Epidural injections',
    'rehabilitacion': 'Spine rehabilitation',
    'consulta-especialista': 'Specialist consultation'
  };
  // Phone country picker. Flags: country-flag-icons (MIT), self-hosted because the CSP only allows
  // images from this site. Both countries use 10-digit national numbers.
  var FLAGS = '/Assets/vendor/country-flag-icons-1.6.20/';
  var COUNTRIES = {
    MX: { name: 'Mexico', code: '+52', dial: '52', flag: FLAGS + 'mx.svg' },
    US: { name: 'United States', code: '+1', dial: '1', flag: FLAGS + 'us.svg', placeholder: '619 123 4567' }
  };
  var CITIES = {
    tijuana: { name: 'Tijuana', tz: 'America/Tijuana', placeholder: '664 123 4567' },
    guadalajara: { name: 'Guadalajara', tz: 'America/Mexico_City', placeholder: '33 1234 5678' },
    rosarito: { name: 'Rosarito', tz: 'America/Tijuana', placeholder: '661 123 4567' }
  };

  // Events go to the dataLayer only, as `dl_<GA4 event name>` (e.g. dl_lead_form_submit_tij).
  // Tag Manager (GTM-MPMCVHDW) listens for them ("CE - dl_..." triggers) and its "GA4 Event - ..." tags
  // send the GA4 event without the prefix to G-N539005TR1. The prefix matters: GTM also treats the
  // tag's own gtag('event', name) as a dataLayer event, so the same name would fire the tag again in a loop.
  // Every event name ends in the clinic: _tij, _gdl (or _general when no city is chosen yet).
  function track(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: 'dl_' + name }, params));
  }

  function pageTopic() {
    var parts = location.pathname.split('/').filter(Boolean);
    for (var i = parts.length - 1; i >= 0; i--) {
      if (TOPICS[parts[i]]) return TOPICS[parts[i]];
    }
    return 'Spine evaluation';
  }

  function pageCity(waNumber) {
    var first = location.pathname.split('/').filter(Boolean)[0];
    if (CITIES[first]) return CITIES[first];
    if (/^5233/.test(waNumber)) return CITIES.guadalajara;
    if (/^52664/.test(waNumber)) return CITIES.tijuana;
    return null;
  }

  // Clinic numbers -> the suffix used in the GA4 event names (clicks_telefono_gdl, whatsapp_click_tij...).
  var CLINIC_SUFFIX = { '523311728391': 'gdl', '526641596633': 'tij' };
  function clinicSuffix(href) {
    var digits = (href || '').replace(/\D/g, '');
    for (var num in CLINIC_SUFFIX) if (digits.indexOf(num) !== -1) return CLINIC_SUFFIX[num];
    return null;
  }
  function ctaLocation(el) {
    if (el.closest('#wa-widget')) return 'widget';
    if (el.closest('#mobile-menu')) return 'mobile_menu';
    if (el.closest('.navbar, header')) return 'header';
    if (el.closest('footer')) return 'footer';
    return 'body';
  }

  // Phone clicks anywhere on the page -> dataLayer `dl_clicks_telefono_gdl` / `dl_clicks_telefono_tij`
  // (GTM custom-event triggers pick them up). Runs once, even though init() may run twice.
  if (!window.__lwPhoneTracking) {
    window.__lwPhoneTracking = true;
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="tel:"]');
      var suffix = a && clinicSuffix(a.getAttribute('href'));
      if (!suffix) return;
      track('clicks_telefono_' + suffix, {
        cta_text: a.textContent.replace(/\s+/g, ' ').trim().slice(0, 60),
        cta_location: ctaLocation(a),
        lead_topic: pageTopic()
      });
    });
  }

  function init() {
    var widget = document.getElementById('wa-widget');
    var panel = document.getElementById('wa-panel');
    var fab = document.getElementById('wa-fab');
    if (!widget || !panel || !fab || panel.querySelector('.lw-form')) return;

    var actions = panel.querySelector('.wa-actions');
    var telLink = panel.querySelector('a[href^="tel:"]');
    // One WhatsApp button per city the panel offers (the brand home offers Tijuana and Guadalajara).
    var choices = [].slice.call(panel.querySelectorAll('a[href*="wa.me/"]')).map(function (a) {
      var num = (a.getAttribute('href').match(/wa\.me\/(\d+)/) || [])[1];
      var label = (a.textContent.match(/en\s+(.+)$/) || [])[1] || '';
      return { num: num, label: label.trim() };
    }).filter(function (c) { return c.num; });
    if (!actions || !choices.length) return;
    var pickCity = choices.length > 1;
    var waNumber = pickCity ? '' : choices[0].num;

    if (!document.querySelector('link[href^="/Assets/css/lead-widget-b.css"]')) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = CSS_HREF;
      document.head.appendChild(css);
    }

    var city = pickCity ? null : pageCity(waNumber);
    var cityName = city ? city.name : '';
    var topic = pageTopic();

    panel.classList.add('lw-panel');
    var body = panel.querySelector('.wa-panel-body');
    var bubble = document.createElement('div');
    bubble.className = 'wa-bubble';
    bubble.innerHTML = '<p>Leave your name and phone number so we can answer your questions and help schedule an evaluation.</p>';
    actions.parentNode.insertBefore(bubble, actions);

    var form = document.createElement('form');
    form.className = 'lw-form';
    form.noValidate = true;
    form.innerHTML = [
      (pickCity ? '<fieldset class="lw-field lw-cities"><legend class="lw-label">Which location?</legend><div class="lw-city-row">' +
        choices.map(function (c, i) {
          return '<label class="lw-city"><input type="radio" name="lw-city" value="' + i + '"><span>' + c.label + '</span></label>';
        }).join('') + '</div><span class="lw-error" id="lw-city-error" aria-live="polite"></span></fieldset>' : ''),
      '<div class="lw-field">',
      '  <label class="lw-label" for="lw-name">Name</label>',
      '  <input class="lw-input" id="lw-name" name="name" type="text" autocomplete="name" placeholder="Your name" maxlength="80" required>',
      '  <span class="lw-error" id="lw-name-error" aria-live="polite"></span>',
      '</div>',
      '<div class="lw-field">',
      '  <label class="lw-label" for="lw-phone">Contact phone number</label>',
      '  <div class="lw-phone-wrap">',
      '    <span class="lw-cc">',
      '      <img class="lw-cc-flag" src="' + COUNTRIES.MX.flag + '" alt="" width="21" height="14">',
      '      <span class="lw-cc-code">' + COUNTRIES.MX.code + '</span>',
      '      <svg class="lw-cc-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="2 3.5 5 6.5 8 3.5"/></svg>',
      // Transparent native select on top of the flag: phones open their own picker.
      '      <select class="lw-cc-select" id="lw-country" name="country" aria-label="Phone country">',
      Object.keys(COUNTRIES).map(function (k) {
        return '<option value="' + k + '">' + COUNTRIES[k].name + ' (' + COUNTRIES[k].code + ')</option>';
      }).join(''),
      '      </select>',
      '    </span>',
      '    <input class="lw-input" id="lw-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" maxlength="20" required>',
      '  </div>',
      '  <span class="lw-error" id="lw-phone-error" aria-live="polite"></span>',
      '</div>',
      '<div class="lw-turnstile"></div>',
      '<button type="submit" class="lw-submit" aria-disabled="true">Start a conversation</button>',
      (telLink ? '<a class="lw-call" href="' + telLink.getAttribute('href') + '">or call the clinic</a>' : ''),
      '<p class="lw-privacy">By submitting, you accept the <a href="/en/privacy-notice/" target="_blank" rel="noopener">privacy notice</a>.</p>'
    ].join('');
    var done = document.createElement('div');
    done.className = 'lw-done';
    done.setAttribute('role', 'status');
    done.innerHTML = 'Thank you! We received your details. If WhatsApp did not open, use the button below:' +
      '<a class="lw-submit lw-done-link" href="#" target="_blank" rel="noopener noreferrer">Open WhatsApp</a>';
    actions.remove();
    body.after(form);
    form.after(done);

    var nameInput = form.querySelector('#lw-name');
    var phoneInput = form.querySelector('#lw-phone');
    var nameError = form.querySelector('#lw-name-error');
    var phoneError = form.querySelector('#lw-phone-error');
    var submitBtn = form.querySelector('.lw-submit');
    var doneLink = done.querySelector('.lw-done-link');
    doneLink.addEventListener('click', function () { trackWhatsapp(); });
    var phoneWrap = form.querySelector('.lw-phone-wrap');
    var countrySelect = form.querySelector('#lw-country');
    var country = 'MX';
    function mxPlaceholder() { return city ? city.placeholder : '664 123 4567'; }
    function setCountry(k) {
      country = k;
      countrySelect.value = k;
      form.querySelector('.lw-cc-flag').src = COUNTRIES[k].flag;
      form.querySelector('.lw-cc-code').textContent = COUNTRIES[k].code;
      phoneInput.placeholder = COUNTRIES[k].placeholder || mxPlaceholder();
    }
    countrySelect.addEventListener('change', function () {
      setCountry(countrySelect.value);
      updateSubmit();
      phoneInput.focus();
    });
    setCountry('US');
    var cityError = form.querySelector('#lw-city-error');
    var turnstileBox = form.querySelector('.lw-turnstile');

    // ── Turnstile (bot check) ──
    var turnstileToken = null;
    var turnstileWidgetId = null;
    var turnstileRequested = false;
    var pendingSubmit = false;

    function loadTurnstile() {
      if (turnstileRequested) return;
      turnstileRequested = true;
      var s = document.createElement('script');
      s.src = TURNSTILE_SRC;
      s.async = true;
      s.onload = renderTurnstile;
      document.head.appendChild(s);
    }
    function renderTurnstile() {
      if (turnstileWidgetId !== null || !window.turnstile) return;
      try {
        turnstileWidgetId = window.turnstile.render(turnstileBox, {
          sitekey: TURNSTILE_SITEKEY,
          theme: 'light',
          language: 'en',
          size: 'flexible',
          appearance: 'interaction-only', // invisible unless Cloudflare needs a click
          'before-interactive-callback': function () { turnstileBox.classList.add('is-visible'); },
          'after-interactive-callback': function () { turnstileBox.classList.remove('is-visible'); },
          callback: function (token) {
            turnstileToken = token;
            turnstileBox.classList.remove('is-visible');
            if (pendingSubmit) { pendingSubmit = false; submitLead(); }
          },
          'expired-callback': resetTurnstile,
          'error-callback': resetTurnstile
        });
      } catch (e) { console.warn('Turnstile init error:', e); }
    }
    function resetTurnstile() {
      turnstileToken = null;
      if (window.turnstile && turnstileWidgetId !== null) {
        try { window.turnstile.reset(turnstileWidgetId); } catch (e) { /* renders again on next open */ }
      }
    }
    // Loaded when the widget opens (fab click below; openWidget() goes through it too), not with the page:
    // it is a third-party script with a long first task, and most visitors never open the form.
    // It is usually solved while the visitor types; submit also loads it if it is still missing.

    if (pickCity) {
      form.querySelectorAll('input[name="lw-city"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
          var c = choices[+radio.value];
          waNumber = c.num;
          var key = c.label.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
          city = CITIES[key] || pageCity(waNumber);
          cityName = city ? city.name : c.label;
          if (city && country === 'MX') phoneInput.placeholder = city.placeholder;
          cityError.textContent = '';
          updateSubmit();
        });
      });
    }

    // ── Validation ──
    function cleanName() { return nameInput.value.replace(/\s+/g, ' ').trim(); }
    function cityOk() { return !!waNumber; }
    function nameOk() { return cleanName().length >= 2; }
    // The 10-digit number without the country code (also accepts it typed or pasted with +52 / 521 / +1).
    function nationalDigits() {
      var d = phoneInput.value.replace(/\D/g, '');
      if (country === 'MX' && d.length === 13 && d.indexOf('521') === 0) return d.slice(3);
      if (country === 'MX' && d.length === 12 && d.indexOf('52') === 0) return d.slice(2);
      if (country === 'US' && d.length === 11 && d.charAt(0) === '1') return d.slice(1);
      return d;
    }
    function phoneOk() { return nationalDigits().length === 10; }
    function fullPhone() {
      var d = nationalDigits();
      return COUNTRIES[country].code + ' ' + d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
    }
    // Typing "+1" or "+52" at the start switches the flag.
    phoneInput.addEventListener('input', function () {
      var v = phoneInput.value.replace(/\s/g, '');
      if (/^\+1/.test(v) && country !== 'US') setCountry('US');
      else if (/^\+52/.test(v) && country !== 'MX') setCountry('MX');
    });
    function updateSubmit() { submitBtn.setAttribute('aria-disabled', cityOk() && nameOk() && phoneOk() ? 'false' : 'true'); }
    function showErrors() {
      var c = cityOk(), n = nameOk(), p = phoneOk();
      if (cityError) cityError.textContent = c ? '' : 'Choose a location.';
      nameInput.classList.toggle('is-invalid', !n);
      phoneInput.classList.toggle('is-invalid', !p);
      phoneWrap.classList.toggle('is-invalid', !p);
      nameError.textContent = n ? '' : 'Enter your name.';
      phoneError.textContent = p ? '' : 'Enter your 10-digit phone number.';
      if (!c) form.querySelector('input[name="lw-city"]').focus();
      else if (!n) nameInput.focus(); else if (!p) phoneInput.focus();
      return c && n && p;
    }
    [nameInput, phoneInput].forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.classList.contains('is-invalid') && (input === nameInput ? nameOk() : phoneOk())) {
          input.classList.remove('is-invalid');
          if (input === phoneInput) phoneWrap.classList.remove('is-invalid');
          (input === nameInput ? nameError : phoneError).textContent = '';
        }
        updateSubmit();
      });
    });

    // ── Submit ──
    var sending = false;
    function whatsappUrl(name, phone) {
      var text = [
        'Hello Dr. Francisco Cisneros! I would like to schedule an evaluation' + (cityName ? ' in ' + cityName : '') + '.',
        '',
        '• Name: ' + name,
        '• Phone: ' + phone,
        '• Reason: ' + topic
      ].join('\n');
      return 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);
    }
    // WhatsApp opened -> dataLayer `dl_whatsapp_click_gdl` / `dl_whatsapp_click_tij`.
    function trackWhatsapp() {
      var suffix = clinicSuffix(waNumber);
      if (!suffix) return;
      track('whatsapp_click_' + suffix, {
        lead_city: cityName || 'no location selected', lead_topic: topic,
        widget_source: lastOpen.widget_source, cta_text: lastOpen.cta_text, cta_location: lastOpen.cta_location
      });
    }
    function sendLeadEmail(lead) {
      if (!FORMSPREE_URL || IS_LOCAL) {
        console.info('[lead-widget] email not sent (' + (IS_LOCAL ? 'localhost' : 'no Formspree URL') + '):', lead);
        return;
      }
      try {
        fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
          keepalive: true // survives the tab switching to WhatsApp
        }).catch(function (err) { console.warn('Formspree error:', err); });
      } catch (e) { console.warn('Formspree dispatch error:', e); }
    }

    var SUBMIT_LABEL = submitBtn.textContent;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending || !showErrors()) return;
      if (!turnstileToken) {
        // Bot check still running: send as soon as it passes.
        pendingSubmit = true;
        submitBtn.textContent = 'Verifying…';
        submitBtn.setAttribute('aria-disabled', 'true');
        loadTurnstile();
        renderTurnstile();
        return;
      }
      submitLead();
    });

    function submitLead() {
      if (sending) return;
      sending = true;
      submitBtn.textContent = SUBMIT_LABEL;
      var name = cleanName();
      var phone = fullPhone();
      var url = whatsappUrl(name, phone);

      track('lead_form_submit_' + (clinicSuffix(waNumber) || 'general'), {
        form_name: 'widget_whatsapp', lead_city: cityName || 'no location selected', lead_topic: topic, phone_country: country,
        widget_source: lastOpen.widget_source, cta_text: lastOpen.cta_text, cta_location: lastOpen.cta_location
      });

      sendLeadEmail({
        Nombre: name,
        Telefono: phone,
        Ciudad: cityName,
        Motivo: topic,
        Pagina: location.href,
        Fecha: new Date().toLocaleString('en-US', { timeZone: city ? city.tz : 'America/Tijuana' }),
        _subject: 'New patient (' + (cityName || 'web') + '): ' + name
      });

      trackWhatsapp();
      doneLink.href = url;
      panel.classList.add('lw-sent');
      var win = window.open(url, '_blank');
      if (win) { try { win.opener = null; } catch (err) { /* cross-origin */ } }
      else { location.href = url; } // popup blocked: same tab
    }

    // ── Open the widget ──
    // Every open is reported as `wa_widget_open_<tij|gdl|general>` with
    //   widget_source: 'floating_button' (the round WhatsApp button) or 'page_button' (any
    //                  "Agendar" / "Reserva" / WhatsApp button on the page),
    //   cta_text / cta_location: which page button and where it sits (header, mobile_menu, body, footer).
    // The same source rides along on `lead_form_submit_<tij|gdl>`, so leads can be split by entry point too.
    var openingFromPage = false;
    var lastOpen = { widget_source: 'floating_button', cta_text: '', cta_location: '' };
    function trackOpen(info) {
      lastOpen = info;
      track('wa_widget_open_' + (clinicSuffix(waNumber) || 'general'), { lead_city: cityName || 'no location selected', widget_source: info.widget_source, cta_text: info.cta_text, cta_location: info.cta_location, lead_topic: topic });
    }
    function openWidget(info) {
      if (!panel.classList.contains('wa-panel--open')) { // main.js animates it
        openingFromPage = true;
        fab.click();
        openingFromPage = false;
        trackOpen(info);
      }
      updateSubmit();
      if (window.matchMedia('(min-width: 769px)').matches) {
        setTimeout(function () { nameInput.focus({ preventScroll: true }); }, 320);
      }
    }
    // Typing on a phone (same as the Romario Perea infiltraciones widget): while the name or phone
    // field has focus, only the panel header + form stay, pinned right above the keyboard. The welcome
    // bubbles and the round button hide, so the two fields and the submit button fit without scrolling.
    // position:fixed and 100dvh ignore the keyboard, so its height comes from visualViewport
    // (0 on browsers that shrink the page for it instead).
    var vv = window.visualViewport;
    var mqPhone = window.matchMedia('(max-width: 768px)');
    function typingField() {
      var a = document.activeElement;
      return a === nameInput || a === phoneInput || a === countrySelect;
    }
    function fitToKeyboard() {
      var typing = mqPhone.matches && panel.classList.contains('wa-panel--open') && typingField();
      var wasTyping = widget.classList.contains('lw-kb-open');
      widget.classList.toggle('lw-kb-open', typing);
      if (!typing) {
        widget.style.removeProperty('--lw-kb');
        widget.style.removeProperty('--lw-vvh');
        return;
      }
      var kb = vv ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop) : 0;
      widget.style.setProperty('--lw-kb', Math.round(kb) + 'px');
      widget.style.setProperty('--lw-vvh', Math.round(vv ? vv.height : window.innerHeight) + 'px');
      if (!wasTyping) panel.scrollTop = 0; // show the form from its first field
    }
    if (!widget.hasAttribute('data-lw-kb')) {
      widget.setAttribute('data-lw-kb', '');
      if (vv) {
        vv.addEventListener('resize', fitToKeyboard);
        vv.addEventListener('scroll', fitToKeyboard);
      }
      window.addEventListener('resize', fitToKeyboard);
      [nameInput, phoneInput].forEach(function (input) {
        input.addEventListener('focus', fitToKeyboard);
        // Wait before undoing it: tapping the submit button blurs the field first, and moving
        // the widget right away would shift the button out from under the finger.
        input.addEventListener('blur', function () { setTimeout(fitToKeyboard, 300); });
      });
    }

    fab.addEventListener('click', function () {
      loadTurnstile();
      if (!openingFromPage && !panel.classList.contains('wa-panel--open')) {
        trackOpen({ widget_source: 'floating_button', cta_text: '', cta_location: 'floating' });
      }
    });

    // Buttons that open the widget instead of leaving the page: any WhatsApp link, anything
    // marked data-lead-open, and links/buttons whose text is a booking call to action
    // ("Agendar cita", "Agenda tu valoración", "Reserva tu cita", "Programar consulta", "Solicitar valoración"...).
    var BOOKING_TEXT = /^\s*(book|schedule|request|agend|reserv|program|solicit)/i;
    var SKIP = '.nav-dropdown, .breadcrumb, [data-lead-skip]'; // city menus, breadcrumbs, opt-outs
    function bookingButton(target) {
      var el = target.closest && target.closest('a, button');
      if (!el || widget.contains(el) || el.closest(SKIP)) return null;
      var href = el.getAttribute('href') || '';
      if (/wa\.me\/|api\.whatsapp\.com\/send/.test(href) || el.hasAttribute('data-lead-open')) return el;
      if (/^tel:|^mailto:/.test(href)) return null;
      return BOOKING_TEXT.test(el.textContent) ? el : null;
    }

    // Capture phase, so the panel's own "click outside closes it" handler in main.js never sees this click.
    document.addEventListener('click', function (e) {
      var el = bookingButton(e.target);
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      var menu = document.getElementById('mobile-menu');
      if (menu && menu.contains(el)) {
        var burger = document.getElementById('nav-hamburger');
        if (burger && burger.getAttribute('aria-expanded') === 'true') burger.click();
      }
      openWidget({
        widget_source: 'page_button',
        cta_text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60),
        cta_location: ctaLocation(el)
      });
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  document.addEventListener('partials-ready', init);
})();
