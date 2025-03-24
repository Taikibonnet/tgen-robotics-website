# Guide d'administration du catalogue TGen Robotics

Ce guide explique comment utiliser le système d'administration du catalogue pour ajouter, modifier et supprimer des robots dans le catalogue de TGen Robotics.

## Accéder au mode administrateur

1. Allez sur la page du catalogue : [https://taikibonnet.github.io/tgen-robotics-website/catalog.html](https://taikibonnet.github.io/tgen-robotics-website/catalog.html)
2. Double-cliquez sur le titre "Our Robotic Solutions" en haut de la page
3. Entrez le mot de passe administrateur : `admin123`
4. Le panneau d'administration apparaîtra sous les filtres de catégories

> **Note** : Pour des raisons de sécurité, vous pouvez changer le mot de passe dans le fichier `assets/js/catalog-admin.js` (ligne 25).

## Interface d'administration

Une fois en mode administrateur, vous verrez apparaître un panneau de contrôle avec les boutons suivants :

- **Ajouter un Robot** : Ajoute un nouveau robot au catalogue
- **Exporter les Changements** : Génère le code JSON à copier dans le fichier `data/robots.json`
- **Quitter Mode Admin** : Désactive le mode administrateur

Vous remarquerez également que des boutons d'édition et de suppression apparaissent sur chaque carte de robot du catalogue.

## Ajouter un nouveau robot

1. Cliquez sur le bouton **Ajouter un Robot**
2. Remplissez le formulaire avec les informations du robot :
   - **Nom du Robot** : Nom complet du modèle
   - **Catégorie** : Sélectionnez parmi les options disponibles (Industriel, Construction, Domestique, Médical)
   - **Prix** : Prix avec devise ou mention "Contactez-nous pour le prix"
   - **Image URL** : Chemin vers l'image ou URL placeholder (`/api/placeholder/400/300`)
   - **Description Courte** : Brève description pour la carte du catalogue
   - **Description Détaillée** : Description complète pour la fenêtre modale
   - **Produit Vedette** : Sélectionnez "Oui" pour mettre en avant ce robot
   - **Spécifications** : Liste des spécifications au format "Nom: Valeur" (une par ligne)
3. Cliquez sur **Enregistrer**

## Modifier un robot existant

1. Cliquez sur le bouton **Éditer** (icône crayon) sur la carte du robot que vous souhaitez modifier
2. Le formulaire se remplira automatiquement avec les données actuelles du robot
3. Modifiez les champs souhaités
4. Cliquez sur **Enregistrer**

## Supprimer un robot

1. Cliquez sur le bouton **Supprimer** (icône poubelle) sur la carte du robot que vous souhaitez supprimer
2. Confirmez la suppression dans la boîte de dialogue
3. Le robot sera immédiatement retiré de l'affichage

## Sauvegarder les modifications

Comme le site est hébergé sur GitHub Pages (hébergement statique), les modifications ne sont pas sauvegardées automatiquement sur le serveur. Vous devez mettre à jour manuellement le fichier JSON dans votre dépôt GitHub.

1. Après avoir effectué vos modifications, cliquez sur **Exporter les Changements**
2. Une fenêtre modale s'ouvrira avec le code JSON à jour
3. Cliquez sur **Copier le JSON** pour copier le code dans le presse-papiers
4. Dans votre dépôt GitHub, accédez au fichier `data/robots.json`
5. Cliquez sur le crayon (Éditer) pour modifier le fichier
6. Supprimez tout le contenu et collez le nouveau code JSON
7. Ajoutez un message de commit (par exemple, "Mise à jour du catalogue de robots")
8. Cliquez sur **Commit changes**

Vos modifications seront visibles sur le site dès que GitHub aura terminé le déploiement (généralement en quelques secondes).

## Gestion des images

Les images peuvent être stockées de deux façons :

1. **Images locales** : Téléchargez vos images dans le dossier `images/` de votre dépôt GitHub et utilisez un chemin relatif (par exemple, `images/robot-industrial.jpg`)
2. **Images placeholder** : Utilisez `/api/placeholder/400/300` pour les images temporaires en attendant les vraies images

Pour mettre à jour une image :
1. Téléchargez la nouvelle image dans le dossier `images/` de votre dépôt
2. Modifiez le robot concerné et mettez à jour le chemin de l'image
3. Exportez et sauvegardez comme expliqué précédemment

## Problèmes courants et solutions

### Les images ne s'affichent pas
- Vérifiez que le chemin est correct (sensible à la casse)
- Assurez-vous que l'image existe bien à l'emplacement spécifié
- Utilisez temporairement une image placeholder pendant le dépannage

### Les modifications ne sont pas visibles après avoir mis à jour le fichier JSON
- Videz le cache de votre navigateur (Ctrl+F5 ou Cmd+Shift+R)
- Attendez quelques minutes pour que GitHub Pages déploie les changements
- Vérifiez que le JSON est correctement formaté et ne contient pas d'erreurs de syntaxe

### Le formulaire d'édition ne s'ouvre pas
- Assurez-vous d'être en mode administrateur
- Vérifiez que le robot existe bien dans le tableau `workingProductsData`
- Rafraîchissez la page et reconnectez-vous en mode administrateur

## Assistance technique

Si vous rencontrez des problèmes avec le système d'administration du catalogue, consultez le code source des fichiers suivants :

- `assets/js/catalog-admin.js` : Logique d'administration du catalogue
- `assets/css/catalog-admin.css` : Styles pour l'interface d'administration
- `data/robots.json` : Données du catalogue
- `catalog.html` : Structure HTML de la page catalogue
