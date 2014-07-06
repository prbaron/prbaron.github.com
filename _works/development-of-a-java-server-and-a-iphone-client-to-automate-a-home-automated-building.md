---
tagline  : "Serveur Java et client iPhone pour domotiser un bâtiment"
client   : ESIR
duration : 4 mois
skills   : Objective-C, Java
keywords : ESIR, application mobile, REST, client, serveur
---

Le but de ce projet est de domotiser le laboratoire domotique de notre école. Nous avons coupé le projet en trois parties :

  1. Produits : les étudiants devaient créer les trames permettant aux divers produits domestiques de communiquer entre eux.
  2. Algorithme : l'algorithme doit pouvoir choisir les meilleurs commandes à effectuer par rapport aux données reçues des clients mobiles et des produits physiques
  3. Clients mobiles : les clients mobiles doivent pouvoir récupérer les états des produits physiques et envoyer les commandes à ces derniers.
  
 Mon rôle était de créer le serveur Java se connectant à l'algorithme et permettant de recevoir des informations depuis le client iPhone et Android, ainsi que l'application iPhone contrôlant le laboratoire.
 
 Nous avons décidé d'utiliser REST pour la communication client/serveur. J'ai choisis d'utiliser [Restlet](http://restlet.org/) par rapport à sa communauté. The serveur peut envoyer des informations et recevoir des commandes depuis les appareils iPhone/Android.
 
 L'application iPhone possède 4 vues :
 
  1. Informations générales (température intérieure/extérieure, présence dans le laboratoire, consommation électrique, …)
  2. Informations détaillées (courbe de température par jour pour plusieurs mois, …)
  3. Commandes
  4. Réglages