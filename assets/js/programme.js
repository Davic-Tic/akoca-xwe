/* programme.js — bascule entre les jours du programme (onglets) */
document.addEventListener('DOMContentLoaded', () => {
  const onglets = document.querySelectorAll('[data-onglet-jour]');
  const jours = document.querySelectorAll('[data-jour-contenu]');
  if (!onglets.length) return;

  onglets.forEach(onglet => {
    onglet.addEventListener('click', () => {
      const cible = onglet.getAttribute('data-onglet-jour');

      onglets.forEach(o => o.classList.remove('actif'));
      onglet.classList.add('actif');

      jours.forEach(j => {
        j.classList.toggle('actif', j.getAttribute('data-jour-contenu') === cible);
      });
    });
  });
});
