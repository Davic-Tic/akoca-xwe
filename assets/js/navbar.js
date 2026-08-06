/* navbar.js — menu mobile + rétrécissement au défilement */
document.addEventListener('DOMContentLoaded', () => {
  const entete = document.querySelector('.entete');
  const burger = document.querySelector('.navbar__burger');
  const liens = document.querySelector('.navbar__liens');

  if (entete) {
    window.addEventListener('scroll', () => {
      entete.classList.toggle('retrecie', window.scrollY > 30);
    });
  }

  if (burger && liens) {
    burger.addEventListener('click', () => {
      const ouvert = liens.classList.toggle('ouvert');
      burger.classList.toggle('ouvert', ouvert);
      burger.setAttribute('aria-expanded', String(ouvert));
    });
    liens.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      liens.classList.remove('ouvert');
      burger.classList.remove('ouvert');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }
});
