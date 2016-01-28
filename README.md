# Preparation de l'environnement

## Installer cordova

* Installer node.js : https://nodejs.org/en/download/
* Installer cordova : https://cordova.apache.org/#getstarted
```
npm install -g cordova
```
* Installer ripple : 
```
npm install -g ripple-emulator
```
* Ajouter cordova et ripple dans le path si besoin

## Installer ionic

* Installer ionic : http://ionicframework.com/getting-started/
```
npm install -g ionic
```
* Ajouter ionic dans le path si besoin
* Créer le projet :
```
ionic start myApp blank
cd myApp
ionic platform add android
ionic platform add ios
rm -R www
```

## Recuperer le repository
Se mettre a la racine du projet ionic
```
git init
git remote add origin https://github.com/alistarle/Projet-M1-Android.git
git branch --set-upstream master origin/master
rm .gitignore
git pull origin master
```

## Installer JXCore

* Installer JXCore : http://jxcore.com/downloads/
* Installer JXCore cordova :
```
sudo jx install -g download-cli (unix)
jx install -g download-cli (windows)
cd myApp
download https://github.com/jxcore/jxcore-cordova-release/raw/master/0.0.5/io.jxcore.node.jx
jx io.jxcore.node.jx
cordova plugins add io.jxcore.node/
```

## Installer Plugin JXCore 
* Installer express
```
jx install express
```
* Installer socket.io
```
jx install socket.io
```

Et ensuite prendre le dossier "node_module" et le déplacer dans www/jxcore.

# Utilisation de l'application
Les fichiers à modifier sont le repertoire www et notamment l'index.html pour le client, et les fichiers www/jxcore avec notamment app.js pour le serveur.

Pour lancer l'application, brancher un téléphone et utiliser la commande
```
ionic run android
```

# Plugins Cordova à installer
```
cordova plugin add cordova-plugin-statusbar
ionic plugin add https://github.com/Telerik-Verified-Plugins/NativePageTransitions#0.5.5

```

