// Nav on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// Typing animation
const phrases = [
  'AI-powered tools.',
  'intelligence dashboards.',
  'RAG pipelines.',
  'cybersecurity solutions.',
  'data-driven decisions.',
  'things that matter.',
];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  typedEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  if (!deleting && ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 350); return; }
  setTimeout(type, deleting ? 38 : 68);
}
setTimeout(type, 900);

// Active nav link
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      links.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${entries[0].target.id}"]`);
      if (a) a.classList.add('active');
    }
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s)
);

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Hero entrance
window.addEventListener('DOMContentLoaded', () => {
  [['htxt', '-20px'], ['hphoto', '20px']].forEach(([id, tx], i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.cssText = `opacity:0;transform:translateX(${tx});transition:opacity .9s ease ${i*120}ms,transform .9s ease ${i*120}ms`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1'; el.style.transform = 'translateX(0)';
    }));
  });
});
