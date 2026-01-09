// Mobile nav toggle + progressive image reveal + contact helper (mailto)
(() => {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('show');
    });

    mainNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && mainNav.classList.contains('show')) {
        mainNav.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Progressive reveal using IntersectionObserver
  const ioAvailable = 'IntersectionObserver' in window;
  const revealImgs = document.querySelectorAll('img');

  if (ioAvailable) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.transition = 'opacity .6s ease, transform .6s ease';
          img.style.opacity = '1';
          img.style.transform = 'none';
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px', threshold: 0.05 });

    revealImgs.forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'translateY(6px)';
      io.observe(img);
    });
  } else {
    revealImgs.forEach(img => {
      img.style.opacity = '1';
      img.style.transform = 'none';
    });
  }

  // Contact helper: opens mailto with product inquiry
  window.openContact = function openContact(productName) {
    const email = 'hello@furryfurniture';
    const subject = encodeURIComponent(productName ? `Product inquiry — ${productName}` : 'Product inquiry — furryfurniture');
    const body = encodeURIComponent(`Hi furryfurniture,\n\nI am interested in the product: ${productName || ''}. Please send details about pricing, delivery, and availability.\n\nThanks,`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };
})();