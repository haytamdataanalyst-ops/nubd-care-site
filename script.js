// Language toggle
const langToggle = document.getElementById('langToggle');
const html = document.documentElement;

function applyLang(lang) {
  html.setAttribute('data-active-lang', lang);
  langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
  localStorage.setItem('nubd-lang', lang);
}

const savedLang = localStorage.getItem('nubd-lang') || 'fr';
applyLang(savedLang);

langToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-active-lang');
  applyLang(current === 'fr' ? 'en' : 'fr');
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// WhatsApp order links with product-specific message
document.querySelectorAll('[data-wa-product]').forEach(btn => {
  const product = btn.getAttribute('data-wa-product');
  const lang = html.getAttribute('data-active-lang');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isEn = html.getAttribute('data-active-lang') === 'en';
    const msg = isEn
      ? `Hello, I'm interested in: ${product}`
      : `Bonjour, je suis intéressé(e) par : ${product}`;
    window.open(`https://wa.me/212657743618?text=${encodeURIComponent(msg)}`, '_blank');
  });
});
