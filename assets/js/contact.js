/* contact.js — validation du formulaire de contact (côté client uniquement) */
document.addEventListener('DOMContentLoaded', () => {
  const formulaire = document.getElementById('formulaireContact');
  if (!formulaire) return;
  const statut = document.getElementById('statutFormulaire');

  formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    let valide = true;

    const nom = document.getElementById('champNom');
    const email = document.getElementById('champEmail');
    const message = document.getElementById('champMessage');

    valide = validerChamp(nom, v => v.trim().length >= 2, 'Merci d\'indiquer votre nom.') && valide;
    valide = validerChamp(email, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Merci d\'indiquer un e-mail valide.') && valide;
    valide = validerChamp(message, v => v.trim().length >= 10, 'Votre message doit contenir au moins 10 caractères.') && valide;

    if (!valide) {
      statut.className = 'form-statut erreur';
      statut.textContent = 'Merci de corriger les champs indiqués ci-dessus.';
      return;
    }

    // Pas de backend connecté : on informe simplement l'utilisateur.
    // Pour activer un envoi réel, relier ce formulaire à un service
    // (Formspree, EmailJS, ou un petit script côté serveur).
    statut.className = 'form-statut succes';
    statut.textContent = 'Merci ! Votre message a bien été préparé. Nous vous répondrons rapidement sur WhatsApp ou par e-mail.';
    formulaire.reset();
  });

  function validerChamp(champ, testeur, messageErreur) {
    const conteneur = champ.closest('.form-champ');
    const erreur = conteneur.querySelector('.form-champ__erreur');
    const ok = testeur(champ.value);
    conteneur.classList.toggle('invalide', !ok);
    if (erreur) erreur.textContent = messageErreur;
    return ok;
  }
});
