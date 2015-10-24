// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    ionic.Platform.fullScreen(true, false);
})

.controller('MainCtrl', function ($scope, $ionicHistory)  {
    $scope.modesControle = [{
        id: "0",
        nom: "Contrôle tactile",
    }, {
        id: "1",
        nom: "Contrôle gyroscope",
    }];

    $scope.couleurs = [{
        code: 0xFF0000,
        nom: "Rouge"
    }, {
        code: 0x3300FF,
        nom: "Bleu"
    }];

    //Mode de contrôle
    $scope.modeControle = optionsGetModeControle();
    $scope.modeControleNom = $scope.modesControle[parseInt($scope.modeControle)].nom;

    $scope.setModeControle = function(mode) {
        $scope.modeControle = mode;
        optionsSetModeControle($scope.modeControle);
        $scope.modeControleNom = $scope.modesControle[parseInt($scope.modeControle)].nom;
    }

    //Couleur de la balle
    $scope.rangCouleurBalle = optionsGetRangCouleurBalle();
    $scope.couleurBalle = optionsGetCouleurBalle();
    $scope.nomCouleurBalle = $scope.couleurs[parseInt($scope.rangCouleurBalle)].nom;

    $scope.setCouleurBalle = function(rang) {
        $scope.rangCouleurBalle = rang;
        $scope.couleurBalle = $scope.couleurs[rang].code;
        $scope.nomCouleurBalle = $scope.couleurs[rang].nom;

        optionsSetRangCouleurBalle(rang);
        optionsSetCouleurBalle($scope.couleurBalle);
    }

    //Couleur de sa barre
    $scope.rangCouleurBarre = optionsGetRangCouleurBarre();
    $scope.couleurBalle = optionsGetCouleurBarre();
    $scope.nomCouleurBarre = $scope.couleurs[parseInt($scope.rangCouleurBarre)].nom;

    $scope.setCouleurBarre = function(rang) {
        $scope.rangCouleurBarre = rang;
        $scope.couleurBarre = $scope.couleurs[rang].code;
        $scope.nomCouleurBarre = $scope.couleurs[rang].nom;

        optionsSetRangCouleurBarre(rang);
        optionsSetCouleurBarre($scope.couleurBarre);
    }

    //Pseudo
    $scope.pseudo = optionsGetPseudo();
    if ($scope.pseudo == 0) {
        $scope.pseudo = "Vertilol";
    }
    $scope.oldPseudo = $scope.pseudo;

    $scope.setPseudo = function(pseudo) {
        $scope.pseudo = pseudo;
        optionsSetPseudo(pseudo);
        $ionicHistory.goBack();
    }
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
    })
    $stateProvider.state('jeux', {
        url: '/jeux',
        templateUrl: 'templates/jeux.html'
    })
    $stateProvider.state('options', {
        url: '/options',
        templateUrl: 'templates/options.html'
    })
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'templates/about.html'
    })

    //Jeux
    $stateProvider.state('jeux-solo', {
        url: '/jeux/solo',
        templateUrl: 'templates/jeux/solo.html'
    })
    $stateProvider.state('jeux-multi', {
        url: '/jeux/multi',
        templateUrl: 'templates/jeux/multi.html'
    })
    $stateProvider.state('jeux-mode', {
        url: '/jeux/mode',
        templateUrl: 'templates/jeux/mode.html'
    })

    //Options
    $stateProvider.state('options-controle', {
        url: '/options/controle',
        templateUrl: 'templates/options/controle.html'
    })
    $stateProvider.state('options-couleurBalle', {
        url: '/options/couleurBalle',
        templateUrl: 'templates/options/couleurBalle.html'
    })
    $stateProvider.state('options-couleurBarre', {
        url: '/options/couleurBarre',
        templateUrl: 'templates/options/couleurBarre.html'
    })
    $stateProvider.state('options-pseudo', {
        url: '/options/pseudo',
        templateUrl: 'templates/options/pseudo.html'
    })

    $stateProvider.state('jeux-heberger', {
        url: '/jeux/heberger',
        templateUrl: 'templates/jeux/multi/heberger.html'
    })
    $stateProvider.state('jeux-rejoindre', {
        url: '/jeux/rejoindre',
        templateUrl: 'templates/jeux/multi/rejoindre.html'
    })

    $urlRouterProvider.otherwise('/home')
})
