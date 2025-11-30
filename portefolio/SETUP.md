# 🚀 Guide de Configuration et Installation

Ce guide vous accompagne pas à pas pour installer et configurer le portfolio complet (frontend + backend).

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **MongoDB** (version 6 ou supérieure) - [Télécharger](https://www.mongodb.com/try/download/community)
- **npm** ou **yarn** (généralement installé avec Node.js)
- Un compte **EmailJS** pour le formulaire de contact - [S'inscrire](https://www.emailjs.com/)

### Vérifier les installations

```bash
node --version    # Doit afficher v18.x.x ou supérieur
npm --version     # Doit afficher 9.x.x ou supérieur
mongod --version  # Doit afficher 6.x.x ou supérieur
```

---

## 📁 Structure du Projet

```
portefolio/
├── portfolio/          # Frontend React + Vite
│   ├── src/
│   ├── public/
│   ├── .env           # Variables d'environnement frontend
│   └── package.json
├── backend/           # Backend Express + MongoDB
│   ├── src/
│   ├── .env          # Variables d'environnement backend
│   └── package.json
└── SETUP.md          # Ce fichier
```

---

## 🗄️ Étape 1 : Configuration de MongoDB

### Option A : MongoDB Local (Recommandé pour le développement)

1. **Démarrer MongoDB** :
   ```bash
   # Linux/Mac
   sudo systemctl start mongod
   # ou
   sudo service mongod start

   # Windows
   # MongoDB démarre automatiquement ou via Services
   ```

2. **Vérifier que MongoDB fonctionne** :
   ```bash
   mongosh
   # Vous devriez voir une connexion réussie
   # Tapez 'exit' pour quitter
   ```

3. **L'URI de connexion sera** :
   ```
   mongodb://localhost:27017/portfolio
   ```

### Option B : MongoDB Atlas (Cloud - Recommandé pour la production)

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un nouveau cluster (gratuit)
3. Créez un utilisateur de base de données
4. Ajoutez votre IP à la whitelist (ou 0.0.0.0/0 pour autoriser toutes les IPs)
5. Récupérez votre URI de connexion :
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio
   ```

---

## ⚙️ Étape 2 : Configuration du Backend

1. **Naviguer vers le dossier backend** :
   ```bash
   cd backend
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Créer le fichier `.env`** :
   ```bash
   cp .env.example .env
   ```

4. **Configurer les variables d'environnement** dans `.env` :
   ```env
   # Port du serveur backend
   PORT=5000

   # URI MongoDB (choisir selon votre option)
   # Local:
   MONGODB_URI=mongodb://localhost:27017/portfolio
   # OU Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio

   # Environnement
   NODE_ENV=development

   # Clé secrète admin (CHANGEZ CETTE VALEUR !)
   ADMIN_SECRET=votre_cle_secrete_super_complexe_ici

   # Origine CORS (URL du frontend)
   CORS_ORIGIN=http://localhost:5173
   ```

   ⚠️ **IMPORTANT** : Pour la production, changez `ADMIN_SECRET` par une valeur complexe et sécurisée !

5. **Démarrer le serveur backend** :
   ```bash
   # Mode développement (avec auto-reload)
   npm run dev

   # OU mode production
   npm start
   ```

6. **Vérifier que le backend fonctionne** :
   - Ouvrez http://localhost:5000/api/test dans votre navigateur
   - Vous devriez voir un message de succès

---

## 🎨 Étape 3 : Configuration du Frontend

1. **Ouvrir un nouveau terminal** et naviguer vers le dossier frontend :
   ```bash
   cd portfolio
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Créer le fichier `.env`** :
   ```bash
   cp .env.example .env
   ```

4. **Configurer EmailJS** :

   a. Connectez-vous sur [EmailJS](https://dashboard.emailjs.com/)

   b. Créez un service email (Gmail, Outlook, etc.)

   c. Créez un template d'email avec ces variables :
      - `{{from_name}}` : Nom de l'expéditeur
      - `{{from_email}}` : Email de l'expéditeur
      - `{{message}}` : Message

   d. Récupérez vos identifiants dans le dashboard

5. **Configurer les variables d'environnement** dans `.env` :
   ```env
   # Configuration EmailJS
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx

   # URL de l'API backend
   VITE_API_URL=http://localhost:5000/api
   ```

6. **Démarrer le serveur frontend** :
   ```bash
   npm run dev
   ```

7. **Accéder au portfolio** :
   - Ouvrez http://localhost:5173 dans votre navigateur
   - Le portfolio devrait s'afficher correctement

---

## 🔐 Étape 4 : Accès à l'Administration

1. **Accéder à la page admin** :
   - URL directe : http://localhost:5173/admin
   - OU cliquez sur le point (•) discret dans le footer

2. **Se connecter** :
   - Entrez la clé secrète définie dans `backend/.env` (variable `ADMIN_SECRET`)
   - Par défaut en développement : `123` (⚠️ À CHANGER pour la production !)

3. **Fonctionnalités admin** :
   - Voir tous les commentaires (approuvés et en attente)
   - Approuver les nouveaux commentaires
   - Supprimer les commentaires
   - Statistiques en temps réel

---

## 🧪 Étape 5 : Vérification Complète

### Test 1 : Backend
```bash
# Tester l'API des commentaires
curl http://localhost:5000/api/comments
# Devrait retourner un JSON avec success: true
```

### Test 2 : Frontend
1. Ouvrez http://localhost:5173
2. Naviguez vers la section "Commentaires"
3. Remplissez le formulaire et soumettez un commentaire
4. Le commentaire doit être créé (en attente d'approbation)

### Test 3 : Admin
1. Allez sur http://localhost:5173/admin
2. Connectez-vous avec la clé secrète
3. Vous devriez voir le commentaire en attente
4. Approuvez-le
5. Retournez sur la page principale
6. Le commentaire devrait maintenant être visible

---

## 🚀 Déploiement en Production

### Backend (sur Railway, Render, ou VPS)

1. **Préparer les variables d'environnement** :
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://...  (utilisez MongoDB Atlas)
   NODE_ENV=production
   ADMIN_SECRET=votre_cle_super_securisee
   CORS_ORIGIN=https://votre-domaine.com
   ```

2. **Build et démarrage** :
   ```bash
   npm install --production
   npm start
   ```

### Frontend (sur Vercel, Netlify, ou VPS)

1. **Mettre à jour `.env.production`** :
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxx
   VITE_EMAILJS_PUBLIC_KEY=xxx
   VITE_API_URL=https://votre-api-backend.com/api
   ```

2. **Build** :
   ```bash
   npm run build
   ```

3. **Déployer le dossier `dist/`** sur votre hébergeur

---

## 🐛 Dépannage

### Problème : MongoDB ne démarre pas
```bash
# Vérifier le statut
sudo systemctl status mongod

# Regarder les logs
sudo journalctl -u mongod -f
```

### Problème : Le backend ne se connecte pas à MongoDB
- Vérifiez que MongoDB est démarré
- Vérifiez l'URI dans `.env`
- Pour Atlas, vérifiez que votre IP est whitelistée

### Problème : CORS Error
- Vérifiez que `CORS_ORIGIN` dans `backend/.env` correspond à l'URL du frontend
- Exemple : `http://localhost:5173` (sans slash final)

### Problème : Les commentaires ne s'affichent pas
- Vérifiez que le backend est démarré
- Vérifiez `VITE_API_URL` dans `portfolio/.env`
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Problème : EmailJS ne fonctionne pas
- Vérifiez vos identifiants EmailJS
- Vérifiez que le service email est activé
- Vérifiez le template et les variables

### Problème : Cannot find module
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Commandes Utiles

### Backend
```bash
cd backend
npm install              # Installer les dépendances
npm run dev             # Démarrer en mode développement
npm start               # Démarrer en mode production
```

### Frontend
```bash
cd portfolio
npm install              # Installer les dépendances
npm run dev             # Démarrer le serveur de développement
npm run build           # Builder pour la production
npm run preview         # Prévisualiser le build de production
npm run lint            # Vérifier le code
```

### MongoDB
```bash
mongosh                 # Ouvrir le shell MongoDB
use portfolio           # Sélectionner la base de données
db.comments.find()      # Voir tous les commentaires
db.comments.countDocuments()  # Compter les commentaires
```

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez que toutes les étapes ont été suivies
2. Consultez les logs des serveurs (backend et frontend)
3. Vérifiez la console du navigateur (F12)
4. Assurez-vous que MongoDB est bien démarré

---

##  Checklist de Configuration

- [ ] Node.js installé (v18+)
- [ ] MongoDB installé et démarré
- [ ] Backend : dépendances installées
- [ ] Backend : `.env` configuré
- [ ] Backend : serveur démarré (http://localhost:5000)
- [ ] Frontend : dépendances installées
- [ ] Frontend : `.env` configuré avec EmailJS
- [ ] Frontend : serveur démarré (http://localhost:5173)
- [ ] Test : Formulaire de contact fonctionne
- [ ] Test : Formulaire de commentaires fonctionne
- [ ] Test : Page admin accessible et fonctionnelle

 **Bravo ! Votre portfolio est maintenant configuré et opérationnel !**


rajouté la possibilité de géré la page projet directement depuis la page admin 

rajouté le scroll le scroll automatique 

navbar immobile lors du changement des fr en 

changement blanc noir mettre tout en animation car sinon ca perturbe guillaume



