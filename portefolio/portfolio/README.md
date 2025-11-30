# Portfolio

Portfolio personnel développé avec React et Vite.

## Technologies utilisées

### Frontend
- React 19
- Vite 7
- Tailwind CSS
- Framer Motion (animations)
- React Router DOM (navigation)
- React Icons

### Internationalisation
- i18next
- react-i18next
- i18next-browser-languagedetector

### Outils de développement
- ESLint
- Autoprefixer
- PostCSS

## Installation

```bash
npm install
```

## Démarrage

Mode développement :
```bash
npm run dev
```

Build de production :
```bash
npm build
```

Prévisualisation du build :
```bash
npm run preview
```

Linter :
```bash
npm run lint
```

## Structure du projet

```
portfolio/
├── public/           # Fichiers statiques
├── src/
│   ├── components/   # Composants React
│   ├── context/      # Contexts React (theme, etc.)
│   ├── hooks/        # Hooks personnalisés
│   └── ...
├── .env             # Variables d'environnement
└── package.json     # Dépendances du projet
```

## Configuration

Créer un fichier `.env` à partir de `.env.example` et configurer les variables d'environnement nécessaires.

## Licence

Projet personnel
