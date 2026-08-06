/* jy-serai.js — logique de l'outil "J'y serai" :
   import photo, déplacement, zoom, rotation, sur le cadre officiel */

document.addEventListener('DOMContentLoaded', () => {
  const toile = document.getElementById('toileBadge');
  if (!toile) return;
  const ctx = toile.getContext('2d');

  const conteneur = document.querySelector('.jys__toile-conteneur');
  const zoneVide = document.querySelector('[data-zone-vide]');
  const zoneDepot = document.querySelector('[data-zone-depot]');
  const entreeFichier = document.getElementById('entreeFichierPhoto');

  const curseurZoom = document.getElementById('curseurZoom');
  const curseurRotation = document.getElementById('curseurRotation');
  const valeurZoom = document.getElementById('valeurZoom');
  const valeurRotation = document.getElementById('valeurRotation');
  const champNom = document.getElementById('champNomBadge');
  const boutonReinitialiser = document.getElementById('boutonReinitialiser');

  // Dimensions intrinsèques du cadre officiel (assets/images/jy-serai-cadre.png)
  const LARGEUR_CADRE = 1149;
  const HAUTEUR_CADRE = 1369;
  toile.width = LARGEUR_CADRE;
  toile.height = HAUTEUR_CADRE;

  // Zone "photo" du cadre, exprimée en fractions (repérée sur le visuel officiel)
  const ZONE_PHOTO = { x: 0.0957, y: 0.3419, w: 0.3725, h: 0.3557 };

  const cadre = new Image();
  cadre.src = 'assets/images/jy-serai-cadre.png';

  let photoUtilisateur = null;
  let etat = { x: 0, y: 0, echelle: 1, rotation: 0 };
  let echelleMin = 1;

  cadre.onload = dessiner;

  function rectanglePhotoPixels() {
    return {
      x: ZONE_PHOTO.x * LARGEUR_CADRE,
      y: ZONE_PHOTO.y * HAUTEUR_CADRE,
      w: ZONE_PHOTO.w * LARGEUR_CADRE,
      h: ZONE_PHOTO.h * HAUTEUR_CADRE,
    };
  }

  function dessiner() {
    ctx.clearRect(0, 0, LARGEUR_CADRE, HAUTEUR_CADRE);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, LARGEUR_CADRE, HAUTEUR_CADRE);

    // 1. Le cadre officiel est dessiné en premier (bordures, logo, textes).
    if (cadre.complete) ctx.drawImage(cadre, 0, 0, LARGEUR_CADRE, HAUTEUR_CADRE);

    const rect = rectanglePhotoPixels();

    // 2. La photo de l'utilisateur est dessinée PAR-DESSUS, mais uniquement
    //    à l'intérieur de la zone "PLACE DE PHOTO" (grâce au clip) : elle
    //    recouvre l'icône appareil photo sans jamais déborder sur les bordures.
    if (photoUtilisateur) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(rect.x, rect.y, rect.w, rect.h);
      ctx.clip();

      const centreX = rect.x + rect.w / 2 + etat.x;
      const centreY = rect.y + rect.h / 2 + etat.y;

      ctx.translate(centreX, centreY);
      ctx.rotate((etat.rotation * Math.PI) / 180);
      ctx.scale(etat.echelle, etat.echelle);
      ctx.drawImage(
        photoUtilisateur,
        -photoUtilisateur.largeurAffichage / 2,
        -photoUtilisateur.hauteurAffichage / 2,
        photoUtilisateur.largeurAffichage,
        photoUtilisateur.hauteurAffichage
      );
      ctx.restore();
    }

    // Nom optionnel : placé dans la bande blanche libre juste sous le cadre
    // photo (au-dessus de la ligne dates/localisation), centré sous la
    // photo elle-même (donc décalé à gauche par rapport au centre du
    // visuel complet) pour ne jamais recouvrir le slogan imprimé en bas.
    if (champNom && champNom.value.trim()) {
      ctx.save();
      ctx.font = '600 34px "Work Sans", sans-serif';
      ctx.fillStyle = '#0B2E6B';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centreTexteX = rect.x + rect.w / 2;
      ctx.fillText(champNom.value.trim(), centreTexteX, HAUTEUR_CADRE * 0.727);
      ctx.restore();
    }

    zoneVide.style.display = photoUtilisateur ? 'none' : 'grid';
  }

  function chargerPhoto(fichier) {
    if (!fichier || !fichier.type.startsWith('image/')) return;
    const lecteur = new FileReader();
    lecteur.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const rect = rectanglePhotoPixels();
        // On calcule l'échelle minimale pour que la photo recouvre toute la zone
        const ratioCouverture = Math.max(rect.w / img.width, rect.h / img.height);
        img.largeurAffichage = img.width * ratioCouverture;
        img.hauteurAffichage = img.height * ratioCouverture;

        photoUtilisateur = img;
        etat = { x: 0, y: 0, echelle: 1, rotation: 0 };
        echelleMin = 1;
        curseurZoom.value = 1;
        curseurRotation.value = 0;
        valeurZoom.textContent = '100%';
        valeurRotation.textContent = '0°';
        dessiner();
      };
      img.src = e.target.result;
    };
    lecteur.readAsDataURL(fichier);
  }

  /* --- Zone de dépôt / sélection de fichier --- */
  if (zoneDepot) {
    zoneDepot.addEventListener('click', () => entreeFichier.click());
    zoneDepot.addEventListener('dragover', (e) => { e.preventDefault(); zoneDepot.classList.add('survol'); });
    zoneDepot.addEventListener('dragleave', () => zoneDepot.classList.remove('survol'));
    zoneDepot.addEventListener('drop', (e) => {
      e.preventDefault();
      zoneDepot.classList.remove('survol');
      if (e.dataTransfer.files[0]) chargerPhoto(e.dataTransfer.files[0]);
    });
  }
  if (entreeFichier) {
    entreeFichier.addEventListener('change', (e) => chargerPhoto(e.target.files[0]));
  }

  /* --- Curseurs zoom / rotation --- */
  if (curseurZoom) {
    curseurZoom.addEventListener('input', () => {
      etat.echelle = parseFloat(curseurZoom.value);
      valeurZoom.textContent = Math.round(etat.echelle * 100) + '%';
      dessiner();
    });
  }
  if (curseurRotation) {
    curseurRotation.addEventListener('input', () => {
      etat.rotation = parseFloat(curseurRotation.value);
      valeurRotation.textContent = etat.rotation + '°';
      dessiner();
    });
  }
  if (champNom) champNom.addEventListener('input', dessiner);

  /* --- Déplacement (souris + tactile) --- */
  let enTrain = false;
  let depart = { x: 0, y: 0 };
  function positionPointeur(e) {
    const rectToile = conteneur.getBoundingClientRect();
    const pointX = (e.touches ? e.touches[0].clientX : e.clientX) - rectToile.left;
    const pointY = (e.touches ? e.touches[0].clientY : e.clientY) - rectToile.top;
    // conversion coordonnées écran -> coordonnées intrinsèques du canvas
    return { x: pointX * (LARGEUR_CADRE / rectToile.width), y: pointY * (HAUTEUR_CADRE / rectToile.height) };
  }
  function debutDeplacement(e) {
    if (!photoUtilisateur) return;
    enTrain = true;
    conteneur.classList.add('saisi');
    const p = positionPointeur(e);
    depart = { x: p.x - etat.x, y: p.y - etat.y };
  }
  function pendantDeplacement(e) {
    if (!enTrain) return;
    e.preventDefault();
    const p = positionPointeur(e);
    etat.x = p.x - depart.x;
    etat.y = p.y - depart.y;
    dessiner();
  }
  function finDeplacement() {
    enTrain = false;
    conteneur.classList.remove('saisi');
  }
  if (conteneur) {
    conteneur.addEventListener('mousedown', debutDeplacement);
    window.addEventListener('mousemove', pendantDeplacement);
    window.addEventListener('mouseup', finDeplacement);
    conteneur.addEventListener('touchstart', debutDeplacement, { passive: true });
    conteneur.addEventListener('touchmove', pendantDeplacement, { passive: false });
    conteneur.addEventListener('touchend', finDeplacement);

    // Molette = zoom rapide
    conteneur.addEventListener('wheel', (e) => {
      if (!photoUtilisateur) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      etat.echelle = Math.min(3, Math.max(echelleMin, etat.echelle + delta));
      curseurZoom.value = etat.echelle;
      valeurZoom.textContent = Math.round(etat.echelle * 100) + '%';
      dessiner();
    }, { passive: false });
  }

  /* --- Réinitialiser --- */
  if (boutonReinitialiser) {
    boutonReinitialiser.addEventListener('click', () => {
      photoUtilisateur = null;
      etat = { x: 0, y: 0, echelle: 1, rotation: 0 };
      curseurZoom.value = 1;
      curseurRotation.value = 0;
      valeurZoom.textContent = '100%';
      valeurRotation.textContent = '0°';
      if (champNom) champNom.value = '';
      entreeFichier.value = '';
      dessiner();
    });
  }

  // Rendu initial (cadre seul, en attendant une photo)
  cadre.addEventListener('error', () => {
    ctx.fillStyle = '#F5F7FA';
    ctx.fillRect(0, 0, LARGEUR_CADRE, HAUTEUR_CADRE);
    ctx.fillStyle = '#5B6472';
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Cadre introuvable : assets/images/jy-serai-cadre.png', LARGEUR_CADRE / 2, HAUTEUR_CADRE / 2);
  });

  // Expose pour export-image.js
  window.__akocaToileBadge = toile;
});
