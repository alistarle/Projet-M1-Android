// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var pong;

angular.module('starter', ['ionic', 'ionic-native-transitions'])

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

.controller('MainCtrl', function($scope, $ionicHistory, $timeout) {
    $scope.modesControle = [{
        id: "0",
        nom: "Contrôle tactile",
    }, {
        id: "1",
        nom: "Contrôle gyroscope",
    }];

    $scope.couleurs = [{
        code: 0xFF0000,
        nom: "Rouge",
        hexa: "#FF0000"
    }, {
        code: 0x0000FF,
        nom: "Bleu",
        hexa: "#0000FF"
    }, {
        code: 0xFFEB3B,
        nom: "Jaune",
        hexa: "#FFEB3B"
    }, {
        code: 0xF57F17,
        nom: "Orange",
        hexa: "#F57F17"
    }, {
        code: 0x673AB7,
        nom: "Violet",
        hexa: "#573AB7"
    }, {
        code: 0x76FF03,
        nom: "Vert",
        hexa: "#76FF03"
    }];

    $scope.sons = [{
        type: "piano",
        nom: "DO",
        fichier: "assets/sound/DO.wav"
    }, {
        type: "piano",
        nom: "DO#",
        fichier: "assets/sound/DODiese.wav"
    }, {
        type: "piano",
        nom: "RE",
        fichier: "assets/sound/RE.wav"
    }, {
        type: "piano",
        nom: "RE#",
        fichier: "assets/sound/REDiese.wav"
    }, {
        type: "piano",
        nom: "MI",
        fichier: "assets/sound/MI.wav"
    }, {
        type: "piano",
        nom: "FA",
        fichier: "assets/sound/FA.wav"
    }, {
        type: "animaux",
        nom: "Chat",
        fichier: "assets/sound/chat.wav"
    }];

    $scope.helps = [{
        titre: "Normal",
        description: "Jeux de pong basique."
    }, {
        titre: "FlappyPong",
        description: "Pong basique et la balle devient un FlappyBird."
    }, {
        titre: "MultiPong",
        description: "Pong basique mais il y a plusieurs balles."
    }, {
        titre: "LarryPong",
        description: "Pong basique mais il y a un obstacle, un serpent voulant grandir et qui peut se diviser."
    }, {
        titre: "FakeBallsPong",
        description: "Une seule balle est vraie arriverais vous à la suivre."
    }, {
        titre: "UnderAttackedPong",
        description: "Le but est de tirer sur les monstres et d'esquiver les tirs ennemies."
    }]

    $scope.helpSelec = 0;

    $scope.getSons = function(type) {
        var listeSons = [];
        for (var i = 0; i < $scope.sons.length; i++) {
            if ($scope.sons[i].type == type) {
                listeSons.push($scope.sons[i]);
            }
        }
        return listeSons;
    }

    $scope.sons_piano = $scope.getSons('piano');
    $scope.sons_animaux = $scope.getSons('animaux');
    //Sons
    $scope.rangSons = optionsGetRangSons();
    $scope.sonsSelec = optionsGetSonsSelec();
    $scope.nomSonsSelec = $scope.sons[parseInt($scope.rangSons)].nom;


    $scope.setSons = function(rang) {
        console.log('appel');
        $scope.rangSons = rang;
        $scope.sonsSelec = $scope.sons[rang].fichier;
        $scope.nomSonsSelec = $scope.sons[parseInt($scope.rangSons)].nom;

        optionsSetRangSons(rang);
        optionsSetSonsSelec($scope.sonsSelec);

        $scope.$apply;
        setTimeout(function() {
            $scope.playSons();
        }, 100);
    }

    $scope.playSons = function() {
        var target = document.getElementById('audio');
        target.play();
    }

    $scope.$on('$ionicView.loaded', function() {
        if ($scope.estPremierLancement()) {
            $scope.setCouleurBalle(0);
            $scope.setCouleurBarre(0);
            $scope.setSons(0);
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
    pong = new Pong(4, 5);
    $scope.$on("$ionicView.beforeEnter", function() {
        initJXCore(pong);
        $("#launchGame").click(function() {
            NetworkManager.notifyLaunch();
        });
        NetworkManager.requestPlayerList();
    });
})

.controller('client-controller', function($scope) {
    pong = new Pong(4, 5);
    $scope.$on("$ionicView.beforeEnter", function() {
        $("#connectToServeur").click(function() {
            var ip = $("#serveurIp").val();
            pong.connectToServer(ip, false);
        });
    });
    $scope.$on("$ionicView.enter", function() {
        if (pong.multiplayer) NetworkManager.requestPlayerList();
    });
})

.controller('pong-solo', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var difficulte = $stateParams.difficulte;
        var nbPoints = $stateParams.nbPoints;

        pong = new Pong(difficulte, nbPoints);
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

.controller('flappypong-solo', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var difficulte = $stateParams.difficulte;
        var nbPoints = $stateParams.nbPoints;


        pong = new FlappyPong(difficulte, nbPoints);

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

.controller('fakeballs-solo', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var difficulte = $stateParams.difficulte;
        var nbPoints = $stateParams.nbPoints;


        pong = new FakeBallsPong(difficulte, nbPoints);

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


.controller('larrypong-solo', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var difficulte = $stateParams.difficulte;
        var nbPoints = $stateParams.nbPoints;


        pong = new LarryPong(difficulte, nbPoints);

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }

        function render() {
            pong.render();
        }
        pong.init(create, preload, update, 'gameArea', render);
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });
    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
})

.controller('multipong-solo', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var difficulte = $stateParams.difficulte;
        var nbPoints = $stateParams.nbPoints;


        pong = new MultiPong(difficulte, nbPoints);

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

.controller('underattackedpong-solo', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var difficulte = $stateParams.difficulte;
        var nbPoints = $stateParams.nbPoints;

        pong = new UnderAttackedPong(difficulte, nbPoints);

        function create() {
            pong.create();
        }

        function preload() {
            pong.preload();
        }

        function update() {
            pong.update();
        }

        function render() {
            pong.render();
        }
        pong.init(create, preload, update, 'gameArea', render);
    });
    $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
        $ionicLoading.hide();
    });
    $scope.$parent.$parent.$on("$ionicView.leave", function() {
        pong.game.destroy();
    });
})

.controller('normal-mutlilocal', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var nbPoints = $stateParams.nbPoints;
        pong = new Pong(3, nbPoints);

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

.controller('fin', function($scope, $stateParams, $ionicHistory) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicHistory.clearHistory();
        $scope.gagnant = $stateParams.gagnant;

        $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {});
    $scope.$parent.$parent.$on("$ionicView.leave", function() {});
})

.controller('homeCtrl', function($scope, $ionicHistory, $rootScope) {
    $scope.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicHistory.clearHistory();
    });
})


.controller('flappypong-multilocal', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var nbPoints = $stateParams.nbPoints;
        pong = new FlappyPong(3, nbPoints);

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

.controller('larrypong-multilocal', function($scope, $ionicLoading, $stateParams) {
    $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
        $ionicLoading.show({
            template: 'Chargement...'
        });
    });
    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        var nbPoints = $stateParams.nbPoints;
        pong = new LarryPong(3, nbPoints);

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

.controller('fakeballs-multilocal', function($scope, $ionicLoading, $stateParams) {
        $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
            $ionicLoading.show({
                template: 'Chargement...'
            });
        });
        $scope.$parent.$parent.$on("$ionicView.enter", function() {
            var nbPoints = $stateParams.nbPoints;
            pong = new FakeBallsPong(3, nbPoints);

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
    .controller('underattackedpong-multilocal', function($scope, $ionicLoading, $stateParams) {
        $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
            $ionicLoading.show({
                template: 'Chargement...'
            });
        });
        $scope.$parent.$parent.$on("$ionicView.enter", function() {
            var nbPoints = $stateParams.nbPoints;
            pong = new UnderAttackedPong(3, nbPoints);

            function create() {
                pong.create();
            }

            function preload() {
                pong.preload();
            }

            function update() {
                pong.update();
            }

            function render() {
                pong.render();
            }
            pong.init(create, preload, update, 'gameArea', render);
        });
        $scope.$parent.$parent.$on("$ionicView.afterEnter", function() {
            $ionicLoading.hide();
        });
        $scope.$parent.$parent.$on("$ionicView.leave", function() {
            pong.game.destroy();
        });
    })
    .controller('multipong-multilocal', function($scope, $ionicLoading, $stateParams) {
        $scope.$parent.$parent.$on("$ionicView.beforeEnter", function() {
            $ionicLoading.show({
                template: 'Chargement...'
            });
        });
        $scope.$parent.$parent.$on("$ionicView.enter", function() {
            var nbPoints = $stateParams.nbPoints;
            pong = new MultiPong(3, nbPoints);

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

.controller('jeux-config', function($scope) {
    $scope.modes = ["Normal", "FlappyPong", "MultiPong", "LarryPong", "FakeBallsPong", "UnderAttackedPong"];
    $scope.joueurs = ["Joueur", "IA facile", "IA normale", "IA difficile"];

    $scope.joueurHaut = 1;
    $scope.joueurBas = 0;
    $scope.nbPoints = 5;
    $scope.mode = 0;
    var scoreMax = 20;
    $scope.url;

    var urlBase = "#/jeux/";
    var urlModes = ["normal", "flappypong", "multipong", "larrypong", "fakeballs", "underattackedpong"];
    var urlJoueurs = ["solo", "multilocal"];

    $scope.$parent.$parent.$on("$ionicView.enter", function() {
        constructionUrl();
    });

    function constructionUrl() {
        var j;
        if ($scope.joueurHaut == 0) {
            j = 1;
        } else {
            j = 0;
        }
        if (j == 0) { // Solo
            $scope.url = urlBase + urlJoueurs[j] + "/" + urlModes[$scope.mode] + "?difficulte=" + ($scope.joueurHaut - 1) + "&nbPoints=" + $scope.nbPoints;
        } else {
            $scope.url = urlBase + urlJoueurs[j] + "/" + urlModes[$scope.mode] + "?nbPoints=" + $scope.nbPoints;
        }
        console.log($scope.url);
    }

    $scope.clicJoueurMoins = function(pos) {
        if (pos == 0) {
            $scope.joueurHaut -= 1;
            if ($scope.joueurHaut < 0) {
                $scope.joueurHaut = $scope.joueurs.length - 1;
            }
        } else if (pos == 1) {
            /* 
            $scope.joueurBas -= 1;
            if ($scope.joueurBas < 0) {
                $scope.joueurBas = $scope.joueurs.length - 1;
            }
            */
        }
        constructionUrl();
    }
    $scope.clicJoueurPlus = function(pos) {
        if (pos == 0) {
            $scope.joueurHaut += 1;
            if ($scope.joueurHaut >= $scope.joueurs.length) {
                $scope.joueurHaut = 0;
            }
        } else if (pos == 1) {
            /*
            $scope.joueurBas += 1;
            if ($scope.joueurBas >= $scope.joueurs.length) {
                $scope.joueurBas = 0;
            }
            */
        }
        constructionUrl();
    }

    $scope.clicPointsMoins = function() {
        if ($scope.nbPoints > 1) {
            $scope.nbPoints -= 1;
        }
        constructionUrl();
    }

    $scope.clicPointsPlus = function() {
        if ($scope.nbPoints + 1 > scoreMax) {
            $scope.nbPoints = 1;
        } else {
            $scope.nbPoints += 1;
        }
        constructionUrl();
    }

    $scope.clicModePlus = function() {
        $scope.mode += 1;
        if ($scope.mode >= $scope.modes.length) {
            $scope.mode = 0;
        }
        constructionUrl();
    }

    $scope.clicModeMoins = function() {
        $scope.mode -= 1;
        if ($scope.mode < 0) {
            $scope.mode = $scope.modes.length - 1;
        }
        constructionUrl();
    }
})

.config(function($stateProvider, $urlRouterProvider, $ionicNativeTransitionsProvider) {
    $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'slide',
        direction: 'left'
    });
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
    })
    $stateProvider.state('jeux', {
        url: '/jeux',
        nativeTransitions: {
            "type": "fade"
        },
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

    $stateProvider.state('help', {
        url: '/help',
        templateUrl: 'templates/help.html'
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
    $stateProvider.state('jeux-fin', {
        url: '/jeux/fin?:gagnant',
        templateUrl: 'templates/jeux/fin.html'
    })



    //Solo
    $stateProvider.state('solo-normal', {
        url: '/jeux/solo/normal?:difficulte&:nbPoints',
        templateUrl: 'templates/jeux/solo/normal.html'
    })
    $stateProvider.state('solo-flappypong', {
        url: '/jeux/solo/flappypong?:difficulte&:nbPoints',
        templateUrl: 'templates/jeux/solo/flappypong.html'
    })
    $stateProvider.state('solo-larrypong', {
        url: '/jeux/solo/larrypong?:difficulte&:nbPoints',
        templateUrl: 'templates/jeux/solo/larrypong.html'
    })
    $stateProvider.state('solo-multipong', {
        url: '/jeux/solo/multipong?:difficulte&:nbPoints',
        templateUrl: 'templates/jeux/solo/multipong.html'
    })
    $stateProvider.state('solo-fakeballs', {
        url: '/jeux/solo/fakeballs?:difficulte&:nbPoints',
        templateUrl: 'templates/jeux/solo/fakeballs.html'
    })
    $stateProvider.state('solo-underattackedpong', {
        url: '/jeux/solo/underattackedpong?:difficulte&:nbPoints',
        templateUrl: 'templates/jeux/solo/underattackedpong.html'
    })

    //Mutlijoueur local
    $stateProvider.state('multilocal-normal', {
        url: '/jeux/multilocal/normal?:nbPoints',
        templateUrl: 'templates/jeux/multilocal/normal.html'
    })
    $stateProvider.state('multilocal-flappypong', {
        url: '/jeux/multilocal/flappypong?:nbPoints',
        templateUrl: 'templates/jeux/multilocal/flappypong.html'
    })
    $stateProvider.state('multilocal-larrypong', {
        url: '/jeux/multilocal/larrypong?:nbPoints',
        templateUrl: 'templates/jeux/multilocal/larrypong.html'
    })
    $stateProvider.state('multilocal-multipong', {
        url: '/jeux/multilocal/multipong?:nbPoints',
        templateUrl: 'templates/jeux/multilocal/multipong.html'
    })
    $stateProvider.state('multilocal-fakeballs', {
        url: '/jeux/multilocal/fakeballs?:nbPoints',
        templateUrl: 'templates/jeux/multilocal/fakeballs.html'
    })
    $stateProvider.state('multilocal-underattackedpong', {
        url: '/jeux/multilocal/underattackedpong?:nbPoints',
        templateUrl: 'templates/jeux/multilocal/underattackedpong.html'
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
    $stateProvider.state('options-sons', {
        url: '/options/sons',
        templateUrl: 'templates/options/sons.html'
    })

    $stateProvider.state('jeux-heberger', {
        url: '/jeux/heberger',
        templateUrl: 'templates/jeux/multi/heberger.html'
    })
    $stateProvider.state('jeux-rejoindre', {
            url: '/jeux/rejoindre',
            templateUrl: 'templates/jeux/multi/rejoindre.html'
        })
        //config partie
    $stateProvider.state('solo-config', {
        url: '/jeux/solo/config',
        templateUrl: 'templates/jeux/config.html'
    })


    $urlRouterProvider.otherwise('/home')
})
