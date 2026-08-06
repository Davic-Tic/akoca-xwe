/* app.js — utilitaires partagés sur toutes les pages :
   mode sombre, révélation au défilement, bouton retour en haut, année du pied de page */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initReveal();
  initRetourHaut();
  initAnneeCourante();
});

/* --- Mode sombre --- */
function initTheme() {
  const bouton = document.querySelector('[data-bouton-theme]');
  const racine = document.documentElement;
  const stocke = localStorage.getItem('akoca-theme');
  if (stocke === 'sombre') racine.setAttribute('data-theme', 'sombre');

  if (!bouton) return;
  majIconeTheme(bouton, racine.getAttribute('data-theme') === 'sombre');

  bouton.addEventListener('click', () => {
    const estSombre = racine.getAttribute('data-theme') === 'sombre';
    if (estSombre) {
      racine.removeAttribute('data-theme');
      localStorage.setItem('akoca-theme', 'clair');
    } else {
      racine.setAttribute('data-theme', 'sombre');
      localStorage.setItem('akoca-theme', 'sombre');
    }
    majIconeTheme(bouton, !estSombre);
  });
}
function majIconeTheme(bouton, sombre) {
  bouton.innerHTML = sombre
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  bouton.setAttribute('aria-label', sombre ? 'Passer au mode clair' : 'Passer au mode sombre');
}

/* --- Révélation au défilement --- */
function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;
  const observateur = new IntersectionObserver((entries) => {
    entries.forEach((entree, i) => {
      if (entree.isIntersecting) {
        setTimeout(() => entree.target.classList.add('visible'), i * 60);
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observateur.observe(el));
}

/* --- Bouton retour en haut --- */
function initRetourHaut() {
  const bouton = document.querySelector('[data-retour-haut]');
  if (!bouton) return;
  window.addEventListener('scroll', () => {
    bouton.classList.toggle('visible', window.scrollY > 500);
  });
  bouton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* --- Année courante dans le pied de page --- */
function initAnneeCourante() {
  document.querySelectorAll('[data-annee]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}
