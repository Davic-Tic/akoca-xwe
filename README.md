# Site officiel — AKƆCA XWE MOUZOUNKPOKPOHOUE

Site vitrine de la fête annuelle **AKƆCA XWE** du village de Mouzounkpokpohoué
(commune de Djakotomey, Bénin), organisée par le groupement **Les Jeunes Modèles**.

Construit en **HTML5 / CSS3 / JavaScript vanilla**, sans framework — léger, rapide
et facile à modifier dans n'importe quel éditeur (VS Code recommandé).

## Structure du projet

```
AKOCA-XWE/
├── index.html          Accueil
├── historique.html     Historique de la fête
├── programme.html      Programme des 3 jours (onglets)
├── association.html    Présentation des Jeunes Modèles
├── jy-serai.html        Outil "J'y serai" (badge photo personnalisé)
├── galerie.html         Galerie photos/vidéos (filtres + boîte lumière)
├── contact.html         Formulaire de contact + carte
│
├── assets/
│   ├── css/    Styles séparés par fonctionnalité
│   ├── js/     Scripts séparés par fonctionnalité
│   ├── images/ Photos du site (à compléter)
│   ├── logos/  Logo officiel + favicon
│   ├── icons/  (libre, non utilisé pour le moment — icônes en SVG inline)
│   └── fonts/  (libre — les polices sont chargées via Google Fonts)
│
├── documents/   PDF téléchargeables (programme, règlement...)
└── README.md
```

## Pour commencer

1. Ouvrez le dossier `AKOCA-XWE` dans VS Code.
2. Ouvrez `index.html` avec l'extension **Live Server** (ou double-cliquez
   dessus pour l'ouvrir directement dans votre navigateur).
3. Modifiez les textes directement dans les fichiers `.html` — chaque
   section est commentée pour être facile à repérer.

Aucune installation, aucune dépendance : tout fonctionne dans le navigateur.

## Ce qui est déjà fonctionnel

- ✅ Menu responsive avec menu mobile animé
- ✅ Mode sombre (bouton dans la barre de navigation, mémorisé localement)
- ✅ Compte à rebours automatique jusqu'au 28 août
- ✅ Animations au défilement (apparition progressive des sections)
- ✅ Bouton "Retour en haut"
- ✅ Programme avec onglets par jour (vendredi / samedi / dimanche)
- ✅ Galerie avec filtres par édition + boîte lumière (lightbox)
- ✅ Outil **J'y serai** : import de photo, déplacement, zoom, rotation,
  export en PNG haute définition — construit directement sur le cadre
  officiel de l'affiche 14ᵉ édition (`assets/images/jy-serai-cadre.png`)
- ✅ Formulaire de contact avec validation (nom, e-mail, message)
- ✅ Logo officiel et favicon déjà intégrés (`assets/logos/akoca-xwe.jpg`)

## Ce qu'il reste à compléter

- 🖼️ **Photos réelles** : remplacez les cadres avec pointillés (galerie,
  aperçu accueil, photos anciennes) par de vraies photos, aux mêmes
  emplacements dans `assets/images/`.
- 👤 **Noms réels** : fondateurs (historique.html), responsables
  (association.html), à la place des initiales A/B/C et P/S/T.
- ☎️ **Coordonnées réelles** : téléphone, WhatsApp, e-mail dans
  `contact.html` (actuellement des espaces réservés `+229 XX XX XX XX`).
- 📄 **Documents PDF** : programme, règlement, liste des partenaires —
  à déposer dans `documents/` (des fichiers d'exemple y sont déjà présents,
  à remplacer par les vrais documents).
- 📧 **Envoi réel du formulaire de contact** : actuellement le formulaire
  valide les champs mais n'envoie rien (pas de serveur). Pour recevoir
  vraiment les messages, reliez-le à un service gratuit comme
  [Formspree](https://formspree.io) ou [EmailJS](https://www.emailjs.com/),
  ou à un petit script côté serveur si vous en hébergez un.
- 🗺️ **Carte Google Maps** : la carte dans `contact.html` pointe sur
  "Djakotomey, Bénin" par défaut — remplacez le lien par les coordonnées
  GPS exactes du lieu de la fête si vous les avez.

## Palette de couleurs

| Élément | Couleur |
|---|---|
| Bleu principal | `#0B2E6B` |
| Orange | `#E97A1F` |
| Blanc | `#FFFFFF` |
| Gris clair | `#F5F7FA` |
| Texte | `#1F2937` |

Toutes les couleurs sont centralisées en variables CSS dans
`assets/css/style.css` (section `:root`) — les modifier là suffit à
changer tout le site.

## Mise en ligne

Ce site est 100% statique : il peut être publié gratuitement sur
**GitHub Pages**, **Netlify** ou **Vercel** en quelques minutes, ou
simplement déposé sur un hébergement web classique par FTP.
