// Flexbyte Solutions — small behaviours shared by every page.

(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  // Hero product window: switch between the three sample screens
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.demo-tabs [role="tab"]'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab); });
    tab.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(next);
      next.focus();
    });
  });

  // The till's M-Pesa request settles to "Paid" shortly after the page loads
  var pay = document.querySelector('.pay[data-settles]');
  if (pay) {
    setTimeout(function () {
      pay.classList.add('is-paid');
      pay.querySelector('.pay-text').textContent = 'Paid by M-Pesa. Receipt printed.';
    }, 2200);
  }

  // Founder portrait: show the photo only if the file exists
  var portrait = document.querySelector('.portrait[data-photo]');
  if (portrait) {
    var img = new Image();
    img.onload = function () {
      portrait.style.backgroundImage = 'url("' + portrait.dataset.photo + '")';
      portrait.classList.add('has-photo');
    };
    img.src = portrait.dataset.photo;
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
