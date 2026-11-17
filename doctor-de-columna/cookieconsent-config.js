(function() {
  function initCookieConsent() {
    if (typeof CookieConsent === 'undefined') return;

    function updateGoogleConsent(cookie) {
      var analyticsGranted = false;
      var adsGranted = false;

      if (cookie && Array.isArray(cookie.categories)) {
        analyticsGranted = cookie.categories.indexOf('analytics') !== -1;
        adsGranted = cookie.categories.indexOf('ads') !== -1;
      } else if (typeof CookieConsent.acceptedCategory === 'function') {
        analyticsGranted = CookieConsent.acceptedCategory('analytics');
        adsGranted = CookieConsent.acceptedCategory('ads');
      }
      // Global Privacy Control is an opt-out of sale/sharing (CCPA/CPRA), even after a previous "accept all".
      if (navigator.globalPrivacyControl) adsGranted = false;

      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          'analytics_storage': analyticsGranted ? 'granted' : 'denied',
          'ad_storage': adsGranted ? 'granted' : 'denied',
          'ad_user_data': adsGranted ? 'granted' : 'denied',
          'ad_personalization': 'denied'
        });
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cookie_consent_update',
        consent_analytics: analyticsGranted,
        consent_ads: adsGranted
      });
    }

    function showFloatingButton() {
      var btn = document.getElementById('cc-floating-btn');
      if (btn) btn.classList.add('is-visible');
    }

    // Helper para pruebas: ?reset o #reset borra la cookie para que el aviso vuelva a salir
    if (window.location.search.indexOf('reset') !== -1 || window.location.hash.indexOf('reset') !== -1) {
      document.cookie = 'cc_cookie=; Max-Age=0; path=/';
    }

    CookieConsent.run({
      disablePageInteraction: false,
      guiOptions: {
        consentModal: { layout: 'box', position: 'bottom center', flipButtons: false },
        preferencesModal: { layout: 'box' }
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
          enabled: true,
          readOnly: false,
          autoClear: { cookies: [{ name: /^_ga/ }, { name: /^_gid$/ }, { name: /^_gat/ }] }
        },
        ads: {
          enabled: !navigator.globalPrivacyControl,
          readOnly: false,
          autoClear: { cookies: [{ name: /^_gcl_/ }, { name: /^_gac_/ }, { name: /^IDE$/ }, { name: /^test_cookie$/ }] }
        }
      },
      language: {
        default: 'es',
        translations: {
          es: {
            consentModal: {
              title: 'Su privacidad',
              description: 'Usamos cookies para que el sitio funcione, medir visitas y medir los resultados de nuestros anuncios. Puede desactivarlas en Configurar. Más información en nuestro <a href="/aviso-privacidad/" class="cc-privacy-link">Aviso de Privacidad</a>.',
              acceptAllBtn: 'Aceptar',
              showPreferencesBtn: 'Configurar'
            },
            preferencesModal: {
              title: 'Preferencias de Privacidad',
              acceptAllBtn: 'Aceptar todas',
              acceptNecessaryBtn: 'Rechazar todas',
              savePreferencesBtn: 'Guardar preferencias',
              sections: [
                {
                  title: 'Cookies estrictamente necesarias',
                  description: 'Son esenciales para el funcionamiento básico del sitio y la navegación segura. No se pueden desactivar.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Cookies de análisis estadístico',
                  description: 'Nos permiten entender cómo interactúan los visitantes con el sitio web mediante métricas agregadas anónimas.',
                  linkedCategory: 'analytics'
                },
                {
                  title: 'Cookies de marketing y publicidad',
                  description: 'Permiten medir los resultados de nuestras campañas publicitarias, por ejemplo si un anuncio generó un contacto. No las usamos para mostrarle anuncios personalizados.',
                  linkedCategory: 'ads'
                }
              ]
            }
          }
        }
      },
      onConsent: function(param) {
        updateGoogleConsent(param ? param.cookie : null);
        showFloatingButton();
      },
      onChange: function(param) {
        updateGoogleConsent(param ? param.cookie : null);
        showFloatingButton();
      },
      // X para cerrar el aviso: guarda analítica + medición de anuncios (solo analítica si el navegador envía GPC).
      onModalReady: function(param) {
        if (!param || param.modalName !== 'consentModal' || param.modal.querySelector('.cc-close-x')) return;
        var x = document.createElement('button');
        x.type = 'button';
        x.className = 'cc-close-x';
        x.setAttribute('aria-label', 'Cerrar');
        x.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
        x.addEventListener('click', function() {
          CookieConsent.acceptCategory(navigator.globalPrivacyControl ? ['analytics'] : ['analytics', 'ads']);
          CookieConsent.hide();
        });
        param.modal.appendChild(x);
      }
    });

    if (navigator.globalPrivacyControl && CookieConsent.validConsent() && CookieConsent.acceptedCategory('ads')) {
      CookieConsent.acceptCategory(CookieConsent.getUserPreferences().acceptedCategories.filter(function(c) { return c !== 'ads'; }));
    }

    // Icono flotante de galleta para reabrir preferencias
    if (!document.getElementById('cc-floating-btn')) {
      var btn = document.createElement('button');
      btn.id = 'cc-floating-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Preferencias de Cookies');
      btn.title = 'Preferencias de Cookies';
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"></circle><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"></circle><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor"></circle><circle cx="12" cy="12" r="1.2" fill="currentColor"></circle></svg>';
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        CookieConsent.showPreferences();
      });
      document.body.appendChild(btn);
      setTimeout(function() {
        if (typeof CookieConsent.validConsent === 'function' && CookieConsent.validConsent()) showFloatingButton();
      }, 300);
    }

    // Footer links ("Preferencias de cookies") can be injected later by partials; handle them via delegation.
    document.addEventListener('click', function(e) {
      var trigger = e.target.closest && e.target.closest('[data-cc="show-preferencesModal"]');
      if (!trigger || trigger.id === 'cc-floating-btn') return;
      e.preventDefault();
      CookieConsent.showPreferences();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
