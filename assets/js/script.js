/*
  Original template: Restoran (https://github.com/codewithshabbir/restoran)
  Heavily customized and extended for AYDOĞDU LOKANTASI.
*/

AOS.init({
  offset: '140', // 50% viewport height ka offset
});
document.addEventListener("DOMContentLoaded", function() {
  const loader = document.querySelector('.loader');
  const loaderText = document.querySelector('.loader-text');
  let dotCount = 0;
  const dotInterval = setInterval(function() {
    dotCount = (dotCount + 1) % 4;
    loaderText.textContent = 'Yükleniyor' + '.'.repeat(dotCount);
  }, 400);
  setTimeout(function() {
    clearInterval(dotInterval);
    loader.style.opacity = '0';
    loader.style.display = 'none';
  }, 3000);
});

// Header functionality
var getHamburgerIcon = document.getElementById("hamburger");
var getHamburgerCrossIcon = document.getElementById("hamburger-cross");
var getMobileMenu = document.getElementById("mobile-menu");

// Open the mobile menu
getHamburgerIcon.addEventListener("click", function () {
    getMobileMenu.style.transform = "translateX(0%)";
});

// Close the mobile menu
function closeMenu() {
    getMobileMenu.style.transform = "translateX(-100%)";
}

// Close the mobile menu when the close icon is clicked
getHamburgerCrossIcon.addEventListener("click", closeMenu);

// Close the mobile menu if clicking outside of it
document.addEventListener("click", function(event) {
    var isClickInsideMenu = getMobileMenu.contains(event.target);
    var isClickOnIcon = getHamburgerIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnIcon) {
        closeMenu();
    }
});




// Header scroll behavior
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const headerClass = document.querySelector('.header');

  const checkScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
      headerClass.classList.remove('my-1');
      headerClass.classList.add('my-0');
      sessionStorage.setItem('scrolled', 'true');
      
    } else {
      header.classList.remove('scrolled');
      headerClass.classList.add('my-1');
      headerClass.classList.remove('my-0');
      sessionStorage.removeItem('scrolled');
    }
  };

  // Check scroll position on page load
  if (sessionStorage.getItem('scrolled') === 'true') {
    header.classList.add('scrolled');
    headerClass.classList.remove('my-1');
    headerClass.classList.add('my-0');
  }
  window.addEventListener('scroll', checkScroll);  
  checkScroll(); // Initial check
});



// Menu tabs – sticky, scroll, active tracking
(function() {
  var tabsBar = document.querySelector('.menu-tabs');
  var tabs = document.querySelectorAll('.menu-tab');
  var categories = document.querySelectorAll('.menu-category');
  var menuSection = document.getElementById('menu');
  if (!tabsBar || !tabs.length || !categories.length || !menuSection) return;

  var spacer = null;
  var isSticky = false;
  var ticking = false;
  var naturalAbsTop = 0;
  var headerHeight = 66;
  var justClicked = false;
  var justUnstuck = false;

  function updateHeaderHeight() {
    var h = document.querySelector('header');
    if (h) headerHeight = h.getBoundingClientRect().bottom;
  }

  function createSpacer() {
    spacer = document.createElement('div');
    spacer.className = 'menu-spacer';
    tabsBar.parentNode.insertBefore(spacer, tabsBar);
  }

  function setSticky(on) {
    if (on && !isSticky) {
      if (!spacer) createSpacer();
      var barHeight = tabsBar.offsetHeight;
      spacer.style.height = barHeight + 'px';
      tabsBar.style.minHeight = barHeight + 'px';
      updateHeaderHeight();
      tabsBar.style.top = headerHeight + 'px';
      var rect = tabsBar.getBoundingClientRect();
      naturalAbsTop = rect.top + window.pageYOffset;
      isSticky = true;
      tabsBar.classList.add('is-sticky');
    } else if (!on && isSticky) {
      isSticky = false;
      tabsBar.classList.remove('is-sticky');
      tabsBar.style.minHeight = '';
      if (spacer) spacer.style.height = '0';
      justUnstuck = true;
      setTimeout(function() { justUnstuck = false; }, 200);
    }
  }

  function getMenuBottom() {
    return menuSection.offsetTop + menuSection.offsetHeight;
  }

  createSpacer();
  spacer.style.height = '0';

  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var menuBottom = getMenuBottom();

      if (!isSticky) {
        if (!justUnstuck && tabsBar.getBoundingClientRect().top <= headerHeight && window.scrollY > 200 && window.scrollY < menuBottom - 300) {
          setSticky(true);
        }
      } else {
        if (window.scrollY >= menuBottom - 260 || window.scrollY + 84 < naturalAbsTop - 50) {
          setSticky(false);
        }
      }

      var activeOffset = headerHeight + (tabsBar.offsetHeight || 50) + 25;
      var triggerLine = window.scrollY + activeOffset;
      var activeId = null;
      categories.forEach(function(cat) {
        if (cat.getBoundingClientRect().top + window.pageYOffset <= triggerLine) activeId = cat.id;
      });
      if (!justClicked) {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        if (activeId) {
          var tab = document.querySelector('.menu-tab[href="#' + activeId + '"]');
          if (tab) tab.classList.add('active');
        }
      }
      if (document.activeElement && document.activeElement.classList.contains('menu-tab')) {
        document.activeElement.blur();
      }
      ticking = false;
    });
  });

  window.addEventListener('resize', function() {
    updateHeaderHeight();
    if (isSticky) {
      tabsBar.style.top = headerHeight + 'px';
    }
  });

  // Smooth scroll on click
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      justClicked = true;
      setTimeout(function() { justClicked = false; }, 1000);
      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      updateHeaderHeight();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var offset = headerHeight + (tabsBar.offsetHeight || 50) + 15;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();

var backToTop = document.getElementById('back-to-top');
var bttTicking = false;
window.addEventListener('scroll', function() {
  if (bttTicking) return;
  bttTicking = true;
  requestAnimationFrame(function() {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
    bttTicking = false;
  });
});

document.getElementById('copyrightCurrentYear').textContent = new Date().getFullYear();


