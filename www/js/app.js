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

.controller('MainCtrl', function($scope) {
    $scope.modesControle = [{
        id: "0",
        nom: "Contrôle tactile",
    }, {
        id: "1",
        nom: "Contrôle gyroscope",
    }];

    $scope.couleurs = [{
        code : 0xFF0000,
        nom : "Rouge" 
    },{
        code : 0x3300FF,
        nom : "Bleu" 
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
    $scope.couleurBalle = optionsGetCouleurBalle();
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
