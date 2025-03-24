# Guide d'administration du catalogue TGen Robotics

Ce guide explique comment utiliser l'interface d'administration pour gérer le catalogue de robots sur le site TGen Robotics.

## Accéder au mode administrateur

1. Rendez-vous sur la page du catalogue : [https://taikibonnet.github.io/tgen-robotics-website/catalog.html](https://taikibonnet.github.io/tgen-robotics-website/catalog.html)
2. Double-cliquez sur le titre "Our Robotic Solutions" en haut de la page
3. Entrez le mot de passe administrateur lorsqu'il vous est demandé : `admin123`

> Note : Pour des raisons de sécurité, vous pouvez changer ce mot de passe en modifiant le fichier `assets/js/catalog-admin.js` (recherchez "admin123" et remplacez-le par votre mot de passe).

## Interface d'administration

Une fois connecté en tant qu'administrateur, vous verrez apparaître un panneau d'administration avec les options suivantes :

- **Ajouter un Robot** : Permet d'ajouter un nouveau robot au catalogue
- **Exporter les Changements** : Génère le code JSON à copier pour sauvegarder vos modifications
- **Quitter Mode Admin** : Quitte le mode administrateur

Vous remarquerez également que chaque produit du catalogue affiche maintenant des boutons d'édition et de suppression.

## Ajouter un robot

1. Cliquez sur le bouton "Ajouter un Robot"
2. Remplissez le formulaire avec les informations du robot :
   - **Nom du Robot** : Le nom complet du modèle
   - **Catégorie** : Choisissez parmi les catégories disponibles
   - **Prix** : Le prix (avec le symbole €) ou "Contact pour prix"
   - **Image URL** : Chemin vers l'image (utiliser `/api/placeholder/400/300` si aucune image n'est disponible)
   - **Description Courte** : Un résumé bref des caractéristiques du robot
   - **Description Détaillée** : Une description plus complète
   - **Produit Vedette** : Cochez "Oui" pour mettre en avant ce robot
   - **Spécifications** : Entrez les spécifications techniques, une par ligne, au format "Nom: Valeur"

3. Cliquez sur "Enregistrer" pour ajouter le robot au catalogue

## Modifier un robot existant

1. Cliquez sur le bouton "Éditer" (icône crayon) sur la carte du robot que vous souhaitez modifier
2. Modifiez les informations dans le formulaire
3. Cliquez sur "Enregistrer" pour mettre à jour le robot

## Supprimer un robot

1. Cliquez sur le bouton "Supprimer" (icône poubelle) sur la carte du robot que vous souhaitez supprimer
2. Confirmez la suppression dans la boîte de dialogue

## Sauvegarder les modifications

Les modifications que vous effectuez sont temporaires jusqu'à ce que vous les sauvegardiez dans le fichier de données. Pour enregistrer définitivement vos modifications :

1. Cliquez sur le bouton "Exporter les Changements"
2. Copiez le code JSON qui s'affiche (Ctrl+A puis Ctrl+C)
3. Allez sur GitHub et accédez au fichier `assets/js/catalog-data.js` dans votre dépôt
4. Cliquez sur le bouton "Edit" (crayon)
5. Trouvez le tableau `CATALOG_PRODUCTS` et remplacez son contenu par le JSON que vous avez copié
   - Assurez-vous de conserver les lignes avant `[` et après `]` du tableau
6. Ajoutez un message de commit comme "Mise à jour du catalogue de robots"
7. Cliquez sur "Commit changes"

Les modifications seront visibles sur votre site après quelques minutes (le temps que GitHub Pages se mette à jour).

## Bonnes pratiques

- **Images** : Pour une présentation optimale, utilisez des images de dimensions similaires (idéalement 400x300 pixels)
- **Descriptions** : Les descriptions courtes devraient faire 1-2 phrases, tandis que les descriptions détaillées peuvent être plus longues
- **Spécifications** : Essayez de maintenir un format cohérent pour tous les robots d'une même catégorie
- **Produits vedettes** : Ne marquez que quelques produits comme "vedettes" pour mettre en avant vos meilleurs modèles

## Dépannage

### Problème : Les modifications ne sont pas visibles après sauvegarde
- Assurez-vous d'avoir correctement remplacé le contenu du tableau dans le fichier catalog-data.js
- Patientez quelques minutes pour que GitHub Pages mette à jour le site
- Essayez de vider le cache de votre navigateur

### Problème : L'interface d'administration ne s'affiche pas
- Vérifiez que vous avez bien double-cliqué sur le titre
- Assurez-vous que JavaScript est activé dans votre navigateur
- Vérifiez que le mot de passe saisi est correct

## Support technique

Si vous rencontrez des difficultés avec l'interface d'administration, contactez l'équipe de développement à l'adresse suivante : [tgen.robotics@gmail.com](mailto:tgen.robotics@gmail.com)