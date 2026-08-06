/* gallery.js — filtrage par album + boîte lumière (lightbox) */
document.addEventListener('DOMContentLoaded', () => {
  const filtres = document.querySelectorAll('[data-filtre-album]');
  const items = document.querySelectorAll('[data-album]');
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxFermer = document.querySelector('[data-lightbox-fermer]');

  filtres.forEach(bouton => {
    bouton.addEventListener('click', () => {
      const album = bouton.getAttribute('data-filtre-album');
      filtres.forEach(b => b.classList.remove('actif'));
      bouton.classList.add('actif');

      items.forEach(item => {
        const correspond = album === 'tous' || item.getAttribute('data-album') === album;
        item.hidden = !correspond;
      });
    });
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox) return;
      const img = item.querySelector('img');
      const legende = item.getAttribute('data-legende') || '';
      lightboxImage.innerHTML = img ? img.outerHTML : `<p>${legende}</p>`;
      lightbox.classList.add('ouverte');
    });
  });

  if (lightboxFermer) {
    lightboxFermer.addEventListener('click', () => lightbox.classList.remove('ouverte'));
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('ouverte');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('ouverte');
    });
  }
});
