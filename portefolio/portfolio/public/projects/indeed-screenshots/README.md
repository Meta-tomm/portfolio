# Instructions pour ajouter les captures d'écran du site Indeed

Ce dossier contient les captures d'écran du projet "Indeed Be Like" qui seront affichées dans la galerie photo du portfolio.

## Images nécessaires

Veuillez ajouter les fichiers suivants dans ce dossier :

1. **home.png** - Page d'accueil avec recherche d'emplois
2. **search.png** - Interface de recherche et filtrage des offres
3. **job-detail.png** - Page de détail d'une offre d'emploi
4. **application.png** - Système de candidature en ligne

## Comment prendre les captures d'écran

### Option 1 : Capturer depuis le site en local

Si vous avez le site Indeed Be Like qui tourne en local :

1. Ouvrez le site dans votre navigateur
2. Utilisez l'outil de capture d'écran de votre système :
   - **Windows** : `Win + Shift + S`
   - **Mac** : `Cmd + Shift + 4`
   - **Linux** : `Shift + PrtScn` ou utilisez un outil comme `gnome-screenshot`
3. Sauvegardez les captures avec les noms exacts mentionnés ci-dessus

### Option 2 : Extraire depuis le repo GitHub

Si le repo GitHub contient déjà des captures :

```bash
# Cloner le repo temporairement
cd /tmp
git clone https://github.com/Meta-tomm/Site.git
cd Site

# Chercher les captures d'écran existantes
find . -name "*.png" -o -name "*.jpg"

# Copier les images vers ce dossier
cp path/to/screenshots/*.png /home/chapuis/Documents/epitech/Portefolio/portefolio/portfolio/public/projects/indeed-screenshots/
```

### Option 3 : Utiliser des captures d'écran de déploiement

Si le site est déployé en ligne :

1. Visitez l'URL du site déployé
2. Prenez des captures d'écran des différentes pages
3. Renommez-les selon les noms requis

## Format recommandé

- **Format** : PNG (meilleure qualité) ou JPG
- **Résolution** : 1920x1080 ou supérieure pour une qualité optimale
- **Ratio** : 16:9 recommandé pour un affichage harmonieux

## Tester la galerie

Une fois les images ajoutées :

1. Démarrez votre serveur de développement : `npm run dev`
2. Naviguez vers la section "Projets"
3. Cliquez sur le bouton "Voir les captures" de la carte "Indeed Be Like"
4. La galerie devrait s'ouvrir avec vos images

## Personnaliser les légendes

Si vous souhaitez modifier les légendes des images, éditez le fichier :
`src/components/sections/Project.jsx`

Dans l'objet du projet "Indeed Be Like", modifiez le tableau `screenshots`.
