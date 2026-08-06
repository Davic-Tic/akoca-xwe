/* countdown.js — compte à rebours jusqu'au début de la fête
   Date cible modifiable ci-dessous : vendredi 28 août (édition en cours) */
document.addEventListener('DOMContentLoaded', () => {
  const conteneur = document.querySelector('[data-compte-rebours]');
  if (!conteneur) return;

  const anneeCible = new Date().getMonth() > 7 ? new Date().getFullYear() + 1 : new Date().getFullYear();
  const dateCible = new Date(`${anneeCible}-08-28T09:00:00`);

  const jours = conteneur.querySelector('[data-jours]');
  const heures = conteneur.querySelector('[data-heures]');
  const minutes = conteneur.querySelector('[data-minutes]');
  const secondes = conteneur.querySelector('[data-secondes]');

  function majCompte() {
    const maintenant = new Date();
    let diff = dateCible - maintenant;

    if (diff <= 0) {
      conteneur.innerHTML = '<p class="compte-rebours__termine">🎉 La fête a commencé, bienvenue à AKƆCA XWE !</p>';
      clearInterval(intervalle);
      return;
    }

    const j = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (jours) jours.textContent = String(j).padStart(2, '0');
    if (heures) heures.textContent = String(h).padStart(2, '0');
    if (minutes) minutes.textContent = String(m).padStart(2, '0');
    if (secondes) secondes.textContent = String(s).padStart(2, '0');
  }

  majCompte();
  const intervalle = setInterval(majCompte, 1000);
});
