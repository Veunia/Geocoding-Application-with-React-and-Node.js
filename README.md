# Geocoding Application

  ## Description
  Cette application permet de géocoder des adresses manuellement ou en les important depuis un fichier CSV ou JSON. Les résultats sont affichés dans un tableau et peuvent être téléchargés au format CSV.

  ## Installation
  1. Clonez ce dépôt.
  2. Exécutez `npm install` pour installer les dépendances.

  ## Configuration
  - Pour utiliser OpenStreetMap's Nominatim API, aucune configuration supplémentaire n'est nécessaire.
  - Si vous souhaitez utiliser une autre API de géocodage, modifiez le point de terminaison dans `server.js`.

  ## Lancement en local
  1. Exécutez `npm run dev` pour démarrer le serveur de développement front-end.
  2. Ouvrez un autre terminal et exécutez `npm start` pour démarrer le serveur back-end.

  ## Déploiement en production
  - Utilisez un service cloud comme Heroku, Vercel, ou Netlify pour déployer l'application.
  - Assurez-vous que le serveur back-end est également déployé et accessible.

  ## Utilisation
  1. Saisissez les adresses manuellement dans le champ de texte (format: Nom,Adresse).
  2. Ou importez un fichier CSV ou JSON contenant des adresses.
  3. Cliquez sur le bouton « Géocoder » pour obtenir les coordonnées géographiques.
  4. Les résultats s'afficheront dans un tableau.
  5. Cliquez sur « Télécharger CSV » pour télécharger les résultats au format CSV.

  ## Exemple de fichier CSV
  ```
  Nom,Adresse
  Eiffel Tower,Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France
  Statue de la Liberté,Liberty Island, New York, NY 10004, USA
  ```
