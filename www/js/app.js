// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var pong;

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

.controller('MainCtrl', function($scope, $ionicHistory) {
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



    $scope.$on('$ionicView.loaded', function() {
        if ($scope.estPremierLancement()) {
            $scope.setCouleurBalle(0);
            $scope.setCouleurBarre(0)
        }
    })

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
    $scope.couleurBarre = $scope.couleurs[parseInt($scope.rangCouleurBarre)].code;
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
        $scope.pseudo = ""
    }
    $scope.oldPseudo = $scope.pseudo;

    $scope.setPseudo = function(pseudo) {
        if (pseudo !== "") {
            $scope.setCouleurBarre
            $scope.pseudo = pseudo;
            $scope.oldPseudo = pseudo;
            optionsSetPseudo(pseudo);
            $ionicHistory.goBack();
            optionsSetPremierLancement();
        }
    }

    $scope.estPremierLancement = function() {
        return optionsGetPremierLancement();
    }

})

.controller('serveur-controller', function($scope) {
    pong = new Pong();
    $scope.$on("$ionicView.beforeEnter", function() {
        initJXCore(pong);
        $("#launchGame").click(function() {
            NetworkManager.notifyLaunch();
        });
    });
    $scope.$on("$ionicView.enter", function() {
        if (pong.multiplayer) NetworkManager.requestPlayerList();

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }
        pong.init(create, preload, update, 'gameArea');
    });
})

.controller('client-controller', function($scope) {
    pong = new Pong();
    $scope.$on("$ionicView.beforeEnter", function() {
        $("#connectToServeur").click(function() {
            var ip = $("#serveurIp").val();
            pong.connectToServer(ip);
        });
    });
    $scope.$on("$ionicView.enter", function() {
        if (pong.multiplayer) NetworkManager.requestPlayerList();
    });
})

.controller('pong-solo', function($scope, $ionicLoading) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        pong = new Pong();
        pong.multiplayer = false;

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }
        pong.init(create, preload, update, 'gameArea');
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });

    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
})

.controller('flappypong-solo', function($scope, $ionicLoading) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        pong = new FlappyPong();

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }
        pong.init(create, preload, update, 'gameArea');
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });
    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
})

.controller('fakeballs-solo', function($scope, $ionicLoading) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
         pong = new FakeBallsPong();

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }
        pong.init(create, preload, update, 'gameArea');
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });
    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
})


.controller('larrypong-solo', function($scope, $ionicLoading) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        pong = new LarryPong();

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }
        function render(){
            pong.render();
        }
        pong.init(create, preload, update, 'gameArea',render);
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });
    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
})

.controller('solo-multipong', function($scope, $ionicLoading) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        pong = new MultiPong();

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }
        pong.init(create, preload, update, 'gameArea');
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });
    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
})

.controller('normal-mutlilocal', function($scope, $ionicLoading) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        debugger;
        pong = new PongMultiLocalNormal();

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }
        pong.init(create, preload, update, 'gameArea');
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });
    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
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
    $stateProvider.state('jeux-multilocal', {
        url: '/jeux/multilocal',
        templateUrl: 'templates/jeux/multilocal.html'
    })


    //Solo
    $stateProvider.state('solo-normal', {
        url: '/jeux/solo/normal',
        templateUrl: 'templates/jeux/solo/normal.html'
    })
    $stateProvider.state('solo-flappypong', {
        url: '/jeux/solo/flappypong',
        templateUrl: 'templates/jeux/solo/flappypong.html'
    })
    $stateProvider.state('solo-larrypong', {
        url: '/jeux/solo/larrypong',
        templateUrl: 'templates/jeux/solo/larrypong.html'
    })
    $stateProvider.state('solo-multipong', {
        url: '/jeux/solo/multipong',
        templateUrl: 'templates/jeux/solo/multipong.html'
    })
    $stateProvider.state('solo-fakeballs', {
        url: '/jeux/solo/fakeballs',
        templateUrl: 'templates/jeux/solo/fakeballs.html'
    })

    //Mutlijoueur local
    $stateProvider.state('multilocal-normal', {
        url: '/jeux/multilocal/normal',
        templateUrl: 'templates/jeux/multilocal/normal.html'
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
