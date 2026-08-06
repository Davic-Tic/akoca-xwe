/* export-image.js — export du badge "J'y serai" en image HD téléchargeable */
document.addEventListener('DOMContentLoaded', () => {
  const boutonTelecharger = document.getElementById('boutonTelechargerBadge');
  if (!boutonTelecharger) return;

  boutonTelecharger.addEventListener('click', () => {
    const toile = window.__akocaToileBadge;
    if (!toile) return;

    const champNom = document.getElementById('champNomBadge');
    const nomFichier = champNom && champNom.value.trim()
      ? `jy-serai-${champNom.value.trim().toLowerCase().replace(/\s+/g, '-')}.png`
      : 'jy-serai-akoca-xwe.png';

    try {
      toile.toBlob((blob) => {
        if (!blob) {
          alerterErreurExport();
          return;
        }
        const url = URL.createObjectURL(blob);
        const lien = document.createElement('a');
        lien.href = url;
        lien.download = nomFichier;
        document.body.appendChild(lien);
        lien.click();
        lien.remove();
        URL.revokeObjectURL(url);
      }, 'image/png', 1);
    } catch (erreur) {
      alerterErreurExport();
    }
  });

  function alerterErreurExport() {
    alert(
      "Le téléchargement a été bloqué par le navigateur.\n\n" +
      "Cela arrive quand la page est ouverte directement en double-cliquant sur le fichier (adresse commençant par file://).\n\n" +
      "Solution : ouvrez le site via un serveur local, par exemple avec l'extension « Live Server » dans VS Code (clic droit sur index.html > Open with Live Server), puis réessayez."
    );
  }
});
