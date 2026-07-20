(function() {
  'use strict';

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  var iconCache = {};

  function inlineIcons() {
    var els = document.querySelectorAll('[data-icon]');
    els.forEach(function(el) {
      var name = el.getAttribute('data-icon');
      if (!name) return;
      if (iconCache[name]) {
        el.innerHTML = iconCache[name];
        return;
      }
      var xhr = new XMLHttpRequest();
      xhr.open('GET', './assets/icons/' + name + '.svg', true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          iconCache[name] = xhr.responseText;
          var svgEl = el;
          svgEl.innerHTML = iconCache[name];
        }
      };
      xhr.send();
    });
  }

  function renderHero(d) {
    setText(document.querySelector('.badge-years'), d.sinceBadge);
    setText(document.querySelector('.hero-subtitle'), d.tagline);
    setText(document.querySelector('.hero-desc'), d.description);
    var ctaMenu = document.querySelector('.book-a-table a');
    if (ctaMenu) ctaMenu.textContent = d.ctaMenu;
    var ctaPhone = document.querySelector('.btn-hero-phone');
    if (ctaPhone) {
      var iconSpan = ctaPhone.querySelector('[data-icon]');
      ctaPhone.innerHTML = '';
      if (iconSpan) {
        var newIcon = document.createElement('span');
        newIcon.setAttribute('data-icon', 'phone');
        newIcon.className = 'menu-icon me-2';
        ctaPhone.appendChild(newIcon);
      }
      ctaPhone.appendChild(document.createTextNode(' ' + d.ctaPhone));
      ctaPhone.href = 'tel:' + d.phone.replace(/[^0-9]/g, '');
    }
    var phoneLinks = document.querySelectorAll('a[href*="tel:"]');
    phoneLinks.forEach(function(el) {
      if (el !== ctaPhone) {
        el.href = 'tel:' + d.phone.replace(/[^0-9]/g, '');
        setText(el, d.phone);
      }
    });
    var video = document.querySelector('.banner-video-bg video source');
    if (video && d.heroVideo) video.src = d.heroVideo;
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
      var section = document.getElementById(cat.id);
      if (!section) return;
      var titleEl = section.querySelector('.menu-category-title');
      if (titleEl) {
        var iconEl = titleEl.querySelector('[data-icon]');
        titleEl.textContent = '';
        if (iconEl) {
          var newIcon = document.createElement('span');
          newIcon.setAttribute('data-icon', cat.id);
          newIcon.className = 'menu-icon';
          titleEl.appendChild(newIcon);
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
          var badge = h5.querySelector('.featured-badge');
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

  fetch('./data.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.restaurant) renderHero(data.restaurant);
      if (data.categories) renderCategories(data.categories);
      if (data.contact) renderContact(data.contact);
      if (data.hours) renderHours(data.hours);
      renderFooter(data);
      if (data.instagram) renderInstagram(data.instagram);
      inlineIcons();
    })
    .catch(function(err) {
      console.warn('CMS data unavailable, using static fallback.', err);
    });
})();
