(function() {
  'use strict';

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function renderHero(d) {
    var h1 = document.querySelector('.banner-content h1');
    if (h1 && d.name) {
      h1.textContent = d.name;
    }
    setText(document.querySelector('.badge-years'), d.sinceBadge);
    setText(document.querySelector('.hero-subtitle'), d.tagline);
    setText(document.querySelector('.hero-desc'), d.description);
    var ctaMenu = document.querySelector('.book-a-table a');
    if (ctaMenu) ctaMenu.textContent = d.ctaMenu;
    var ctaPhone = document.querySelector('.btn-hero-phone');
    if (ctaPhone) {
      var iconSvg = ctaPhone.querySelector('.menu-icon');
      ctaPhone.innerHTML = '';
      if (iconSvg) {
        var clone = iconSvg.cloneNode(true);
        ctaPhone.appendChild(clone);
      }
      ctaPhone.appendChild(document.createTextNode(' ' + d.ctaPhone));
      ctaPhone.href = 'tel:' + d.phone.replace(/[^0-9]/g, '');
    }
    var phoneLinks = document.querySelectorAll('a[href*="tel:"]');
    phoneLinks.forEach(function(el) {
      if (el !== ctaPhone && el.id !== 'floating-phone') {
        el.href = 'tel:' + d.phone.replace(/[^0-9]/g, '');
        setText(el, d.phone);
      } else if (el.id === 'floating-phone') {
        el.href = 'tel:' + d.phone.replace(/[^0-9]/g, '');
      }
    });

    var desktopSrc = document.querySelector('.hero-video-desktop source');
    if (desktopSrc && d.heroVideoDesktop) desktopSrc.src = d.heroVideoDesktop;
    var mobileSrc = document.querySelector('.hero-video-mobile source');
    if (mobileSrc && d.heroVideoMobile) mobileSrc.src = d.heroVideoMobile;
  }

  function renderHours(hours) {
    var container = document.querySelector('.reservation-date-time');
    if (!container || !hours) return;
    container.innerHTML = '';
    hours.forEach(function(h) {
      var p = document.createElement('p');
      var b = document.createElement('b');
      b.textContent = h.day;
      p.appendChild(b);
      p.appendChild(document.createTextNode(' ' + h.hours));
      container.appendChild(p);
    });
  }

  function renderContact(c) {
    if (!c) return;
    var addressEl = document.querySelector('.contact-info-box:first-child .ps-3 a');
    if (addressEl) {
      addressEl.href = c.mapsUrl || '#';
      setText(addressEl, c.address);
    }
  }

  function renderFooter(d) {
    var aboutEl = document.querySelector('.content-desc p');
    if (aboutEl && d.footer) setText(aboutEl, d.footer.about);
  }

  function renderCategories(categories) {
    if (!categories) return;
    categories.forEach(function(cat) {
      var tab = document.querySelector('.menu-tab[href="#' + cat.id + '"]');
      if (tab) {
        var tabIcon = tab.querySelector('.menu-icon');
        tab.textContent = '';
        if (tabIcon) tab.appendChild(tabIcon);
        tab.appendChild(document.createTextNode(' ' + cat.name));
      }

      var section = document.getElementById(cat.id);
      if (!section) return;
      var titleEl = section.querySelector('.menu-category-title');
      if (titleEl) {
        var iconSvg = titleEl.querySelector('.menu-icon');
        titleEl.textContent = '';
        if (iconSvg) {
          titleEl.appendChild(iconSvg);
        }
        titleEl.appendChild(document.createTextNode(' ' + cat.name));
      }

      var img = section.querySelector('.food-placeholder img');
      if (img && cat.image) {
        img.src = cat.image;
        img.alt = cat.name;
      }

      var items = section.querySelectorAll('.item-wrapper');
      items.forEach(function(wrapper, idx) {
        if (idx >= cat.items.length) return;
        var item = cat.items[idx];
        var h5 = wrapper.querySelector('.item-left h5');
        var desc = wrapper.querySelector('.item-left p');
        var priceEl = wrapper.querySelector('.item-price');
        if (h5) {
          h5.textContent = item.name;
          if (item.featuredLabel) {
            var span = document.createElement('span');
            span.className = 'featured-badge';
            span.textContent = item.featuredLabel;
            h5.appendChild(document.createTextNode(' '));
            h5.appendChild(span);
          }
        }
        if (desc) setText(desc, item.description);
        if (priceEl) setText(priceEl, '' + item.price);
      });
    });
  }

  function renderInstagram(instagramUrl) {
    var instagramLink = document.querySelector('.social-icons a[href*="instagram"]');
    if (instagramLink && instagramUrl) {
      instagramLink.href = instagramUrl;
    }
  }

  fetch('./data.json', { cache: 'no-cache' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.restaurant) renderHero(data.restaurant);
      if (data.categories) renderCategories(data.categories);
      if (data.contact) renderContact(data.contact);
      if (data.hours) renderHours(data.hours);
      renderFooter(data);
      if (data.instagram) renderInstagram(data.instagram);
    })
    .catch(function(err) {
      console.warn('CMS data unavailable, using static fallback.', err);
    });
})();
