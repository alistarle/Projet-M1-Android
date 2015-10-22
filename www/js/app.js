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

.controller('OptionsCtrl', function($scope) {

    $scope.modeControle;

    $scope.setModeControle = function(mode) {
        $scope.modeControle = mode;
        optionsSetModeControle(mode);
    }
})

.controller('MainCtrl', function($scope) {
    $scope.modeControle = optionsGetModeControle();
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

    $stateProvider.state('jeux-heberger',  {
        url: '/jeux/heberger',
        templateUrl: 'templates/jeux/multi/heberger.html'
    })

    $stateProvider.state('jeux-rejoindre',  {
        url: '/jeux/rejoindre',
        templateUrl: 'templates/jeux/multi/rejoindre.html'
    })

    $urlRouterProvider.otherwise('/home')
})
