# Document Explicatif - Portfolio Full Stack

Document de présentation orale structuré pour expliquer l'architecture et les fonctionnalités du portfolio.

---

## Table des matières

1. [Backend - API REST](#1-backend---api-rest)
2. [Base de données - MongoDB](#2-base-de-données---mongodb)
3. [Frontend - Application React](#3-frontend---application-react)

---

# 1. BACKEND - API REST

Le backend est une API RESTful construite avec Node.js et Express qui gère les commentaires et l'administration.

## backend/src/config/

### database.js
**Rôle** : Connexion à la base de données MongoDB

**Ce qui a été fait** :
- Configuration de Mongoose pour se connecter à MongoDB
- Gestion des erreurs de connexion
- Utilisation des variables d'environnement pour l'URI MongoDB

**Points clés pour la présentation** :
- Mongoose est un ODM (Object Document Mapper) qui facilite les interactions avec MongoDB
- La connexion utilise des variables d'environnement pour la sécurité
- Gestion des événements de connexion (succès, erreur, déconnexion)

```javascript
// Connexion à MongoDB avec gestion d'erreurs
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));
```

---

## backend/src/models/

### Comment.js
**Rôle** : Définition du schéma de données pour les commentaires

**Ce qui a été fait** :
- Création du schéma Mongoose avec validation intégrée
- Définition de tous les champs nécessaires (nom, email, note, commentaire)
- Système de modération avec le champ `isApproved`
- Création d'index pour optimiser les performances

**Structure du schéma** :
- `name` : String, obligatoire, max 50 caractères
- `email` : String, obligatoire, validation regex
- `rating` : Number, obligatoire, entre 1 et 5
- `comment` : String, obligatoire, entre 10 et 500 caractères
- `isApproved` : Boolean, false par défaut (modération)
- `createdAt` : Date automatique

**Points clés pour la présentation** :
- Les validations au niveau du schéma garantissent l'intégrité des données
- Le champ `isApproved` permet de modérer les commentaires avant publication
- L'index composite `{isApproved: 1, createdAt: -1}` optimise les requêtes fréquentes

---

## backend/src/middleware/

### auth.js
**Rôle** : Authentification des requêtes administrateur

**Ce qui a été fait** :
- Middleware de vérification du secret administrateur
- Protection des routes admin
- Vérification du header `x-admin-secret`

**Points clés pour la présentation** :
- Le middleware intercepte toutes les requêtes admin
- Compare le secret fourni avec celui stocké dans les variables d'environnement
- Retourne 401 (Unauthorized) si le secret est invalide
- Simple mais efficace pour ce type de projet

```javascript
// Vérification du secret admin
if (adminSecret !== process.env.ADMIN_SECRET) {
  return res.status(401).json({ message: 'Unauthorized' });
}
```

---

### validation.js
**Rôle** : Validation des données entrantes

**Ce qui a été fait** :
- Utilisation d'express-validator pour valider les données
- Règles de validation pour chaque champ du formulaire
- Normalisation des données (trim, lowercase pour email)

**Validations implémentées** :
- Nom : non vide, max 50 caractères
- Email : format valide, normalisé
- Note : entier entre 1 et 5
- Commentaire : entre 10 et 500 caractères

**Points clés pour la présentation** :
- Double validation : côté client (UX) et côté serveur (sécurité)
- Express-validator fournit des messages d'erreur clairs
- La normalisation garantit la cohérence des données

---

## backend/src/controllers/

### commentController.js
**Rôle** : Logique métier de l'application

**Ce qui a été fait** :
5 fonctions principales pour gérer les commentaires :

#### 1. getApprovedComments()
- Récupère uniquement les commentaires approuvés
- Calcule la moyenne des notes
- Exclut les emails pour la confidentialité
- Trie par date décroissante

#### 2. createComment()
- Crée un nouveau commentaire
- Applique les validations
- Status par défaut : non approuvé
- Retourne 201 (Created) en cas de succès

#### 3. getAllComments() - ADMIN
- Récupère tous les commentaires (approuvés et en attente)
- Statistiques complètes
- Protégé par le middleware auth

#### 4. approveComment() - ADMIN
- Change le status d'un commentaire à approuvé
- Utilise PATCH (modification partielle)
- Retourne le commentaire mis à jour

#### 5. deleteComment() - ADMIN
- Supprime définitivement un commentaire
- Vérification d'existence avant suppression
- Retourne 204 (No Content) si succès

**Points clés pour la présentation** :
- Séparation claire entre routes publiques et admin
- Gestion d'erreurs avec try/catch sur toutes les fonctions
- Calcul de la moyenne côté serveur pour éviter les manipulations
- Respect des codes HTTP standards (200, 201, 400, 401, 404, 500)

---

## backend/src/routes/

### commentRoutes.js
**Rôle** : Définition des endpoints de l'API

**Ce qui a été fait** :
Organisation des routes en 2 catégories :

### Routes publiques
```javascript
GET  /api/comments              // Liste des commentaires approuvés
POST /api/comments              // Soumettre un commentaire
```

### Routes admin (protégées)
```javascript
GET    /api/admin/comments         // Tous les commentaires
PATCH  /api/admin/comments/:id/approve  // Approuver
DELETE /api/admin/comments/:id     // Supprimer
```

**Points clés pour la présentation** :
- Architecture RESTful claire
- Verbes HTTP appropriés (GET, POST, PATCH, DELETE)
- Middleware chaînés : validation puis controller
- Séparation public/admin pour la sécurité

---

## backend/src/server.js

**Rôle** : Point d'entrée de l'application backend

**Ce qui a été fait** :

### 1. Configuration des middlewares de sécurité
- **Helmet** : Protection contre les vulnérabilités XSS, clickjacking, etc.
- **CORS** : Autorisation uniquement du frontend défini
- **Rate Limit** : Max 100 requêtes par IP par 15 minutes

### 2. Configuration Express
- Body parser pour JSON
- Middleware de logging
- Gestion globale des erreurs

### 3. Montage des routes
```javascript
app.use('/api', commentRoutes);
```

### 4. Route de santé
```javascript
GET /api/health  // Vérifier que le serveur fonctionne
```

**Points clés pour la présentation** :
- Ordre des middlewares important (sécurité en premier)
- CORS configuré pour éviter les requêtes non autorisées
- Rate limiting contre les attaques par force brute
- Route health check pour le monitoring

---

# 2. BASE DE DONNÉES - MONGODB

## Choix de MongoDB

**Pourquoi MongoDB pour ce projet ?**
- Base NoSQL flexible pour des données semi-structurées
- Facile à mettre en place et à faire évoluer
- Parfait pour un système de commentaires
- Integration native avec Node.js via Mongoose

---

## Collection: comments

### Structure d'un document
```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  rating: 5,
  comment: "Excellent portfolio !",
  isApproved: false,
  createdAt: ISODate("2024-10-31T12:00:00Z")
}
```

### Index créé
```javascript
{ isApproved: 1, createdAt: -1 }
```

**Rôle de l'index** :
- Optimise les requêtes qui filtrent par `isApproved`
- Tri rapide par date de création
- Améliore drastiquement les performances

---

## Requêtes principales

### 1. Commentaires approuvés
```javascript
Comment.find({ isApproved: true })
  .sort({ createdAt: -1 })
  .select('-email');
```
**Ce que ça fait** : Récupère uniquement les commentaires validés, triés du plus récent au plus ancien, sans les emails

### 2. Calcul de la moyenne
```javascript
comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
```
**Ce que ça fait** : Calcule la note moyenne de tous les commentaires approuvés

### 3. Création d'un commentaire
```javascript
Comment.create({
  name, email, rating, comment
  // isApproved: false par défaut
});
```
**Ce que ça fait** : Insère un nouveau commentaire en attente de modération

### 4. Approbation
```javascript
Comment.findByIdAndUpdate(
  id,
  { isApproved: true },
  { new: true }
);
```
**Ce que ça fait** : Change le statut d'un commentaire à approuvé

---

## Gestion en ligne de commande

**Commandes MongoDB utiles** :
```bash
# Connexion
mongosh

# Sélection de la base
use portfolio

# Lister tous les commentaires
db.comments.find().pretty()

# Commentaires en attente
db.comments.find({ isApproved: false })

# Compter
db.comments.countDocuments()
```

**Points clés pour la présentation** :
- MongoDB offre flexibilité et performance
- Les index sont cruciaux pour les performances
- La structure de document permet d'ajouter facilement de nouveaux champs

---

# 3. FRONTEND - APPLICATION REACT

Le frontend est une Single Page Application (SPA) construite avec React 19, Vite, et Tailwind CSS.

---

## portfolio/src/main.jsx

**Rôle** : Point d'entrée de l'application React

**Ce qui a été fait** :
- Configuration de React Router v7
- Encapsulation dans ThemeProvider
- Définition des routes principales

### Routes configurées
```javascript
/ → App (page principale du portfolio)
/admin → Admin (tableau de bord administration)
```

**Points clés pour la présentation** :
- React Router permet la navigation sans rechargement
- ThemeProvider enveloppe tout pour que le thème soit accessible partout
- Structure modulaire facile à étendre

---

## portfolio/src/App.jsx

**Rôle** : Composant racine qui assemble toutes les sections

**Ce qui a été fait** :
- Importation de toutes les sections
- Navigation fixe en haut
- Footer en bas
- Scroll smooth entre les sections

**Sections assemblées** :
1. Hero (accueil avec animation)
2. About (présentation)
3. Skills (compétences)
4. Projects (projets avec cartes 3D)
5. CommentsSection (système de commentaires)
6. Contact (formulaire)

**Points clés pour la présentation** :
- Architecture en composants réutilisables
- Page unique avec plusieurs sections
- Navigation fluide entre les sections

---

## portfolio/src/components/layout/

### Navigation.jsx
**Rôle** : Barre de navigation principale

**Fonctionnalités** :
- Navigation sticky (reste en haut au scroll)
- Liens vers toutes les sections
- Bouton de changement de thème (soleil/lune)
- Sélecteur de langue (FR/EN)
- Animation d'apparition au scroll

**Points clés pour la présentation** :
- Scroll smooth avec JavaScript natif
- Thème persisté dans localStorage
- Détection automatique de la langue du navigateur

---

### Footer.jsx
**Rôle** : Pied de page avec liens et accès admin

**Fonctionnalités** :
- Liens vers les réseaux sociaux
- Copyright
- Point discret (•) pour accéder à /admin

**Points clés pour la présentation** :
- Accès admin caché mais accessible
- Design minimaliste et responsive

---

## portfolio/src/components/sections/

### Hero.jsx
**Rôle** : Section d'accueil avec effet "wow"

**Ce qui a été fait** :
- Animations Framer Motion
- Texte d'introduction dynamique
- Boutons CTA (Call To Action)
- Effet de gradient animé

**Points clés pour la présentation** :
- Première impression importante
- Animations fluides et professionnelles
- Responsive sur tous les écrans

---

### About.jsx
**Rôle** : Section "À propos"

**Contenu** :
- Présentation personnelle
- Parcours
- Technologies maîtrisées
- Timeline du parcours

**Points clés pour la présentation** :
- Mise en avant des compétences
- Design storytelling

---

### Skills.jsx
**Rôle** : Présentation des compétences techniques

**Ce qui a été fait** :
- Catégorisation des compétences (Frontend, Backend, Tools)
- Icônes pour chaque technologie
- Niveau de maîtrise (optionnel)

**Points clés pour la présentation** :
- Visuel clair et professionnel
- Organisation par catégories

---

### Project.jsx
**Rôle** : Galerie de projets

**Ce qui a été fait** :
- Cartes 3D avec effet de tilt (3d-card component)
- Image, titre, description, technologies
- Liens vers GitHub et démo
- Galerie d'images pour chaque projet

**Points clés pour la présentation** :
- Effet 3D impressionnant au hover
- Modal de galerie d'images
- Mise en valeur des réalisations

---

### CommentsSection.jsx
**Rôle** : Système complet de commentaires avec modération

**Ce qui a été fait** :

#### Partie 1 : Affichage
- Récupération des commentaires approuvés depuis l'API
- Affichage de la note moyenne
- Liste des commentaires avec CommentCard

#### Partie 2 : Soumission
- Formulaire CommentForm
- Système d'étoiles interactif
- Validation côté client
- Envoi à l'API

#### Partie 3 : Fond animé
- Génération de 100 étoiles aléatoires
- Animation de scintillement
- Effet de profondeur

**Flux de données** :
```
1. User remplit le formulaire
2. POST /api/comments
3. Commentaire créé avec isApproved=false
4. Message de confirmation (en attente de modération)
5. Admin approuve via /admin
6. Commentaire apparaît sur la page publique
```

**Points clés pour la présentation** :
- Système complet et fonctionnel
- Modération avant publication (évite le spam)
- Design original avec fond étoilé
- Calcul de moyenne automatique

---

### Contact.jsx
**Rôle** : Formulaire de contact

**Ce qui a été fait** :
- Formulaire avec nom, email, message
- Intégration EmailJS pour l'envoi
- Validation des champs
- Messages de succès/erreur

**Points clés pour la présentation** :
- EmailJS évite d'avoir un serveur SMTP
- Envoi direct depuis le frontend
- UX optimisée avec feedback visuel

---

## portfolio/src/components/ui/

### CommentCard.jsx
**Rôle** : Affichage d'un commentaire individuel

**Ce qui a été fait** :
- Design de carte élégante
- Affichage des étoiles selon la note
- Nom de l'auteur
- Date de publication
- Texte du commentaire

**Points clés pour la présentation** :
- Composant réutilisable
- Responsive et accessible

---

### CommentForm.jsx
**Rôle** : Formulaire de soumission de commentaire

**Ce qui a été fait** :

#### Système d'étoiles interactif
- État `rating` : note sélectionnée
- État `hoverRating` : survol temporaire
- Animation au hover
- Click pour sélectionner

#### Validation
- Tous les champs obligatoires
- Email au format valide
- Commentaire entre 10 et 500 caractères
- Note entre 1 et 5

#### Soumission
```javascript
POST /api/comments
Body: { name, email, rating, comment }
```

**Points clés pour la présentation** :
- UX excellente avec feedback visuel immédiat
- Validation client + serveur (double sécurité)
- Messages d'erreur clairs

---

### 3d-card.jsx
**Rôle** : Effet 3D au survol pour les cartes de projets

**Ce qui a été fait** :
- Calcul de la position de la souris
- Rotation 3D en fonction du survol
- Transform CSS avec perspective
- Reset au départ de la souris

**Technique** :
```javascript
// Calcul des rotations
rotateX = (mouseY - centerY) / sensibilité
rotateY = (mouseX - centerX) / sensibilité
```

**Points clés pour la présentation** :
- Effet "wow" impressionnant
- Pure CSS + JavaScript vanilla
- Améliore l'engagement utilisateur

---

### ImageGalleryModal.jsx
**Rôle** : Modal pour afficher les screenshots d'un projet

**Ce qui a été fait** :
- Modal en plein écran
- Navigation entre les images
- Fermeture avec X ou clic extérieur
- Transition fluide

**Points clés pour la présentation** :
- Permet de voir les projets en détail
- Navigation intuitive
- Responsive

---

### ScrollToTop.jsx
**Rôle** : Bouton retour en haut de page

**Ce qui a été fait** :
- Apparition après un certain scroll
- Animation de fondu
- Scroll smooth au click
- Position fixe en bas à droite

**Points clés pour la présentation** :
- Améliore la navigation sur mobile
- UX standard attendue

---

## portfolio/src/pages/

### Admin.jsx
**Rôle** : Tableau de bord d'administration complet

**Ce qui a été fait** :

### Phase 1 : Authentification
- Formulaire de connexion
- Input pour le secret admin
- Vérification avec l'API
- Stockage du secret en mémoire (non persisté)

### Phase 2 : Dashboard
Une fois connecté, l'admin voit :

#### Statistiques
- Total de commentaires
- Commentaires en attente
- Commentaires approuvés
- Note moyenne globale

#### Liste des commentaires
Pour chaque commentaire :
- Badge de statut (En attente / Approuvé)
- Nom et date
- Note en étoiles
- Texte du commentaire
- Actions : Approuver / Supprimer

#### Actions
```javascript
// Approuver
PATCH /api/admin/comments/:id/approve
Header: x-admin-secret

// Supprimer
DELETE /api/admin/comments/:id
Header: x-admin-secret
```

**Points clés pour la présentation** :
- Interface intuitive et professionnelle
- Authentification simple mais efficace
- Actions en temps réel (pas de rechargement)
- Statistiques en un coup d'oeil
- Modération rapide et efficace

---

## portfolio/src/context/

### themecontext.jsx
**Rôle** : Gestion globale du thème dark/light

**Ce qui a été fait** :

#### État du thème
```javascript
const [isDark, setIsDark] = useState(
  () => localStorage.getItem('theme') === 'dark'
);
```

#### Fonction toggle
```javascript
const toggleTheme = () => {
  setIsDark(prev => {
    const newTheme = !prev;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    return newTheme;
  });
};
```

#### Application du thème
```javascript
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark);
}, [isDark]);
```

**Points clés pour la présentation** :
- Context API de React pour état global
- Persistance avec localStorage
- Classe "dark" sur <html> pour Tailwind CSS
- Accessible partout via useTheme()

---

## portfolio/src/locales/

### fr.json et en.json
**Rôle** : Fichiers de traduction pour l'internationalisation

**Structure** :
```json
{
  "nav": {
    "home": "Accueil",
    "about": "À propos",
    ...
  },
  "hero": {
    "title": "Développeur Full Stack",
    ...
  }
}
```

**Ce qui a été fait** :
- Traduction complète FR/EN
- Organisation par sections
- Utilisation avec i18next

**Points clés pour la présentation** :
- Site bilingue professionnel
- Facile d'ajouter d'autres langues
- Détection automatique de la langue du navigateur

---

## portfolio/src/i18n.js

**Rôle** : Configuration d'i18next

**Ce qui a été fait** :
- Import des traductions
- Configuration du détecteur de langue
- Langue de fallback (anglais)
- Intégration React

**Points clés pour la présentation** :
- i18next est le standard pour React
- Détection automatique intelligente
- Changement de langue instantané

---

## Résumé des Technologies Utilisées

### Backend
- Node.js - Runtime JavaScript
- Express - Framework web
- MongoDB - Base de données NoSQL
- Mongoose - ODM pour MongoDB
- Helmet - Sécurité HTTP
- Express Validator - Validation
- Express Rate Limit - Anti-spam

### Frontend
- React 19 - Framework JavaScript
- Vite - Build tool moderne
- React Router v7 - Navigation SPA
- Tailwind CSS - Styling utility-first
- Framer Motion - Animations
- i18next - Internationalisation
- EmailJS - Service d'emails
- React Icons - Bibliothèque d'icônes

### Base de données
- MongoDB - Base NoSQL
- Mongoose - ODM

---

## Points forts du projet

### Architecture
- Séparation claire Frontend/Backend
- Architecture RESTful
- Code modulaire et maintenable

### Sécurité
- Validation double (client + serveur)
- Protection CORS
- Rate limiting
- Helmet pour headers sécurisés
- Modération des commentaires

### UX/UI
- Design moderne et responsive
- Animations fluides
- Thème dark/light
- Bilingue FR/EN
- Feedback visuel sur toutes les actions

### Fonctionnalités
- Système de commentaires complet avec modération
- Tableau de bord admin intuitif
- Galerie de projets avec effet 3D
- Formulaire de contact fonctionnel
- Calcul automatique de la moyenne des notes

---

## Architecture de déploiement

### Backend
- Hébergement : Railway / Render / VPS
- Base de données : MongoDB Atlas (cloud)
- Variables d'environnement sécurisées

### Frontend
- Hébergement : Vercel / Netlify
- Build optimisé avec Vite
- CDN automatique

---

## Conclusion

Ce portfolio démontre la maîtrise du développement Full Stack moderne :
- Architecture professionnelle et scalable
- Sécurité prise au sérieux
- UX/UI soignée
- Code propre et maintenable
- Prêt pour la production
