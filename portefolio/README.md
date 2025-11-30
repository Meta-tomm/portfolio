# Portfolio Full Stack - Tom-Mathis Chapuis-Butel

Portfolio personnel moderne et interactif développé avec React, Node.js et MongoDB, incluant un système de commentaires avec modération et un tableau de bord d'administration.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## Fonctionnalités

### Frontend
- **Design moderne et responsive** : Interface élégante adaptée à tous les écrans
- **Mode sombre/clair** : Thème personnalisable avec préférence sauvegardée
- **Multilingue** : Support Français/Anglais avec détection automatique
- **Animations fluides** : Transitions et effets avec Framer Motion
- **Sections complètes** :
  - Hero avec présentation dynamique
  - À propos avec parcours et compétences
  - Projets avec cartes 3D interactives
  - Système de commentaires et notes
  - Formulaire de contact EmailJS
- **Navigation intuitive** : Menu sticky et scroll smooth

### Backend
- **API RESTful** : Architecture moderne et scalable
- **Système de commentaires** :
  - Soumission publique avec validation
  - Modération avant publication
  - Calcul automatique de la note moyenne
- **Sécurité renforcée** :
  - Protection Helmet contre les vulnérabilités XSS, CSRF, etc.
  - Rate limiting anti-spam (100 req/15min)
  - CORS configuré
  - Validation des données côté serveur

### Administration
- **Tableau de bord admin** :
  - Authentification sécurisée par clé secrète
  - Vue d'ensemble des statistiques
  - Gestion des commentaires (approbation/suppression)
  - Interface intuitive et responsive

---

## Technologies Utilisées

### Frontend
- **React 19** - Framework JavaScript
- **Vite** - Build tool ultra-rapide
- **React Router v7** - Navigation
- **Tailwind CSS** - Styling utility-first
- **Framer Motion** - Animations
- **React Icons** - Bibliothèque d'icônes
- **i18next** - Internationalisation
- **EmailJS** - Service d'envoi d'emails

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Express Validator** - Validation des données
- **Helmet** - Sécurité HTTP
- **CORS** - Gestion des origines croisées
- **Rate Limit** - Protection anti-spam

---

## Installation

### Prérequis
- Node.js 18+ ([Télécharger](https://nodejs.org/))
- MongoDB 6+ ([Télécharger](https://www.mongodb.com/try/download/community))
- Compte EmailJS ([S'inscrire](https://www.emailjs.com/))

### Installation rapide

1. **Cloner le repository**
```bash
git clone https://github.com/Meta-tomm/portfolio.git
cd portfolio
```

2. **Configurer le Backend**
```bash
cd backend
npm install
cp .env.example .env
# Éditez .env avec vos valeurs (MongoDB URI, ADMIN_SECRET, etc.)
npm run dev
```

3. **Configurer le Frontend**
```bash
cd ../portfolio
npm install
cp .env.example .env
# Éditez .env avec vos credentials EmailJS
npm run dev
```

4. **Accéder à l'application**
- Frontend : http://localhost:5173
- Backend : http://localhost:5000
- Admin : http://localhost:5173/admin

**Pour une installation détaillée**, consultez [SETUP.md](./SETUP.md)

---

## Structure du Projet

```
portefolio/
├── portfolio/              # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   │   ├── layout/   # Navigation, Footer
│   │   │   ├── sections/ # Hero, About, Projects, etc.
│   │   │   └── ui/       # Composants réutilisables
│   │   ├── pages/        # Pages (Admin)
│   │   ├── context/      # Context API (Theme, i18n)
│   │   ├── locales/      # Fichiers de traduction
│   │   └── main.jsx      # Point d'entrée
│   └── package.json
│
├── backend/               # Backend Express
│   ├── src/
│   │   ├── config/       # Configuration DB
│   │   ├── models/       # Schémas Mongoose
│   │   ├── controllers/  # Logique métier
│   │   ├── middleware/   # Auth, Validation
│   │   ├── routes/       # Routes API
│   │   └── server.js     # Point d'entrée
│   └── package.json
│
├── SETUP.md              # Guide d'installation détaillé
├── ARCHITECTURE.md       # Documentation technique
├── TECHNOLOGIES.md       # Stack technique détaillée
└── README.md            # Ce fichier
```

---

## API Endpoints

### Public
- `GET /api/comments` - Récupérer les commentaires approuvés
- `POST /api/comments` - Soumettre un nouveau commentaire
- `GET /api/health` - Health check

### Admin (authentification requise)
- `GET /api/admin/comments` - Tous les commentaires
- `PATCH /api/admin/comments/:id/approve` - Approuver un commentaire
- `DELETE /api/admin/comments/:id` - Supprimer un commentaire

**Authentification** : Header `x-admin-secret: votre_cle_secrete`

---

## Variables d'Environnement

### Backend (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
ADMIN_SECRET=votre_cle_secrete
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
VITE_API_URL=http://localhost:5000/api
```

---

## Utilisation

### Ajouter un commentaire
1. Naviguer vers la section "Commentaires"
2. Remplir le formulaire (nom, email, note, commentaire)
3. Soumettre → Le commentaire est en attente de modération

### Modérer les commentaires (Admin)
1. Accéder à `/admin` ou cliquer sur le point (•) dans le footer
2. Se connecter avec la clé secrète définie dans `backend/.env`
3. Voir tous les commentaires (en attente et approuvés)
4. Approuver ou supprimer selon besoin
5. Les commentaires approuvés apparaissent sur la page publique

### Changer la langue
- Cliquer sur le sélecteur de langue dans la navigation
- Choix : Français / English

### Changer le thème
- Cliquer sur l'icône soleil/lune dans la navigation
- Le choix est sauvegardé dans localStorage

---

## Déploiement

### Backend (Railway, Render, VPS)
```bash
cd backend
npm install --production
npm start
```

**Variables d'environnement à définir** :
- `MONGODB_URI` : Utiliser MongoDB Atlas
- `ADMIN_SECRET` : Clé complexe et sécurisée
- `CORS_ORIGIN` : URL du frontend en production
- `NODE_ENV=production`

### Frontend (Vercel, Netlify)
```bash
cd portfolio
npm run build
# Déployer le dossier dist/
```

**Variables d'environnement à définir** :
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_API_URL` : URL de l'API backend en production


---

## Tests

### Tester le backend
```bash
cd backend
npm run dev

# Dans un autre terminal
curl http://localhost:5000/api/health
# Devrait retourner : {"success":true,"message":"Server is running"}
```

### Tester le frontend
```bash
cd portfolio
npm run dev
# Ouvrir http://localhost:5173
```

---

## Dépannage

### Le backend ne démarre pas
- Vérifier que MongoDB est démarré : `sudo systemctl status mongod`
- Vérifier les variables d'environnement dans `.env`

### Les commentaires ne s'affichent pas
- Vérifier que le backend est démarré
- Vérifier `VITE_API_URL` dans `portfolio/.env`
- Ouvrir la console navigateur (F12) pour voir les erreurs

### CORS Error
- Vérifier que `CORS_ORIGIN` dans `backend/.env` correspond à l'URL du frontend

**Plus de solutions** : voir [SETUP.md - Section Dépannage](./SETUP.md#depannage)

---

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---
---

**Créé par Tom-Mathis Chapuis-Butel**
