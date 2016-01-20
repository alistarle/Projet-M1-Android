function Pong(mode, nbPoints) {
    //mode : [(0, IA Facile), (1, IA Normale), (2, IA Difficile), (3, Multi local)]
    this.debug = true;

    //Variables parties
    if (mode < 3) {
        this.difficulte = mode;
        this.multiLocal = false;
        if((mode==2)&&((this instanceof LarryPong)||(this instanceof FlappyPong))){
            this.difficulte = 1;
        }
    } else {
        this.multiLocal = true;
        this.pointers = [];
    }
    this.nbPoints = nbPoints;

    console.log("Difficulte : " + this.difficulte);
    console.log("Multilocal : " + this.multiLocal);
    console.log("Nb points : " + this.nbPoints);

    //variable de coordonees
    this.Y = 1000;
    this.modeControle = optionsGetModeControle();
    this.game;

    //couleurs
    this.BallColor = optionsGetCouleurBalle();
    this.BetPlayer1Color = optionsGetCouleurBarre();
    this.BetPlayer2Color = 0xff0000;
    this.backgroundColor = 0xffffff;


    //skins
    this.skinPlayer1Path = 'assets/skins/moustache.png';
    this.skinPlayer2Path = 'assets/skins/rayures.png'

    //sounds
    this.soundPlayer1;
    //variable de coordonees
    this.marge = 200;

    //scores
    this.scorePlayer = undefined;
    this.scoreCompute0 = undefined;

    //gameObjects
    this.playerBet;
    this.computerBet;
    this.ball;
    this.iaBall;
    this.iaBallIsComplete;

    this.scoreText;
    this.fps;

    //Multiplayer vars
    this.multiplayer = false;
    this.uid;
    this.otherPlayers = [];

    //valeurs pouvant être modifiees
    this.computerBetSpeed = 600;
    this.ballSpeed = 500;
    this.ballReleased = false;

    this.pseudo = optionsGetPseudo();

}

Pong.prototype.connectToServer = function(ip) {
    this.multiplayer = true;
    this.otherPlayers = [];

    NetworkManager.connect(ip, optionsGetPseudo());

    NetworkManager.onOtherPlayerConnected(function(otherPlayerInfo) {
        this.otherPlayers.push(otherPlayerInfo);
        syncPlayer(this.otherPlayers);
    });

    NetworkManager.onOtherPlayerMove(function(movementInfo) {
        /*var otherPlayerToMove = searchById(me.otherPlayers, movementInfo.uid);
        if(otherPlayerToMove){
          otherPlayerToMove.moveTo(movementInfo.x, movementInfo.y);
      }*/
        //pong.computerBet.x = movementInfo.x;
    });

    NetworkManager.onUpdatePlayerList(function(receivedList) {
        this.otherPlayers = receivedList;
        syncPlayer(receivedList);
    });

    NetworkManager.onServerLaunch(function() {
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

    NetworkManager.onServerCanLaunch(function() {
        $("#launchGame").prop('disabled', false);
    });

    NetworkManager.onServerCannotLaunch(function() {
        $("#launchGame").prop('disabled', true);
    });

    NetworkManager.onServerRoomClosed(function() {
        alert("Serveur fermé");
    });

    NetworkManager.onServerRoomFull(function() {
        alert("Serveur plein");
    });
}

Pong.prototype.createBet = function(x, y) {
    //creer une raquette
    var bet = this.game.add.sprite(x, y, 'bet');
    this.game.physics.arcade.enable(bet);
    bet.anchor.setTo(0.5, 0.5);
    bet.body.collideWorldBounds = true;
    bet.body.bounce.setTo(1, 1);
    bet.body.immovable = true;

    return bet;
};
Pong.prototype.preload = function() {
    //chargement des assets
    this.game.load.audio('soundPlayer1', 'assets/sound/chevre.wav');
    this.game.load.audio('soundPlayer2', 'assets/sound/chat.wav');
    this.game.load.image('background', 'assets/background.jpg');
    this.game.load.image('bet', 'assets/bet.png');
    this.game.load.image('ball', 'assets/ball.png');
    this.game.load.bitmapFont('font', 'assets/flappyfont.png', 'assets/flappyfont.fnt');
    this.game.load.bitmapFont('flappyfont', 'assets/flappyfont.png', 'assets/flappyfont.fnt');
    this.game.load.image('skinPlayer1', this.skinPlayer1Path);
    this.game.load.image('skinPlayer2', this.skinPlayer2Path);


}


Pong.prototype.create = function() {

    //create !
    this.game.add.tileSprite(0, 0, 1080, 1920, 'background');
    this.game.time.advancedTiming = true;
    this.scorePlayer = 0;
    this.scoreComputer = 0;
    //sounds
    this.soundPlayer1 = this.game.add.audio('soundPlayer1');
    this.soundPlayer2 = this.game.add.audio('soundPlayer2');
    //OnCreate initialisation des objets avec sprites et physique
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = this.backgroundColor;
    this.playerBet = this.createBetBot();
    this.computerBet = this.createBetTop();

    this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
    this.ball.tint = this.BallColor;
    this.game.physics.arcade.enable(this.ball);
    this.ball.anchor.setTo(0.5, 0.5);
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.setTo(1, 1);

    if(this.difficulte==2){
        this.iaBall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
        this.iaBall.tint = this.BallColor;
        this.game.physics.arcade.enable(this.iaBall);
        this.iaBall.anchor.setTo(0.5, 0.5);
        this.iaBall.body.collideWorldBounds = true;
        this.iaBall.body.bounce.setTo(1, 1);
        this.iaBall.visible = this.debug;
    }

    this.game.input.onDown.add(this.releaseBall, this);

    this.scoreText = this.game.add.bitmapText(this.game.width / 2 - 230, this.marge / 2, 'flappyfont', this.scorePlayer.toString() + ":" + this.scoreComputer.toString(), 50);
    this.scoreText.visible = true;
    this.updateScore();



    this.fps = this.game.add.text(50, 50, "Fps : ", {
        font: "65px Arial",
        fill: "#ff0044",
        align: "center"
    });
    this.fps.visible = this.debug;

    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

    //create an emitter
    this.emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
    this.emitter.makeParticles('ball');
    this.colorEmitter(this.BallColor);
    this.emitter.gravity = 200;
    this.emitter.setAlpha(1, 0, 20);
    this.emitter.setScale(1, 0, 1, 0, 400);

    this.emitter.start(false, 30, 5);

    if (this.modeControle == 1) {
        gyro.frequency = 2;
        gyro.pong = this;
        gyro.startTracking(function(o) {
            var gyroX = o.gamma * 15 + gyro.pong.game.width / 2;
            if (gyroX > 0 && gyroX < gyro.pong.game.width) {
                gyro.pong.playerBet.x = gyroX;
                if (this.multiplayer) NetworkManager.notifyMovement({
                    x: gyroX
                });
            }
        });
    }


    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

    if (this.multiLocal) {
        this.game.input.addPointer();
        this.game.input.addPointer();

        this.pointers = this.game.input.pointers;
        console.log(this.pointers.length);

    }

    //this.game.scale.startFullScreen(false);
    $('#gameArea').css('max-height', $(window).height());
    $('#gameArea').css('max-width', $(window).width());
}



Pong.prototype.colorEmitter = function(color) {
    this.emitter.forEach(function(particle) {
        particle.tint = color;
    });
}

Pong.prototype.createBetTop = function() {
    //creer une raquette
    var bet = this.game.add.sprite(this.game.world.centerX, this.marge, 'bet');
    this.game.physics.arcade.enable(bet);
    bet.anchor.setTo(0.5, 0.5);
    bet.body.collideWorldBounds = true;
    bet.body.bounce.setTo(1, 1);
    bet.body.immovable = true;
    bet.tint = this.BetPlayer2Color;

    var skin = this.game.add.sprite(-100, -20, 'skinPlayer2');

    bet.addChild(skin);
    return bet;
}

Pong.prototype.createBetBot = function() {
    //creer une raquette
    var bet = this.game.add.sprite(this.game.world.centerX, this.game.height - this.marge, 'bet');
    this.game.physics.arcade.enable(bet);
    bet.anchor.setTo(0.5, 0.5);
    bet.body.collideWorldBounds = true;
    bet.body.bounce.setTo(1, 1);
    bet.body.immovable = true;
    bet.tint = this.BetPlayer1Color;

    var skin = this.game.add.sprite(-100, -20, 'skinPlayer1');

    bet.addChild(skin);
    return bet;
}

Pong.prototype.releaseBall = function() {

    if (!this.ballReleased) {
        this.ball.body.velocity.x = this.ballSpeed;
        this.ball.body.velocity.y = -this.ballSpeed;
        this.ballReleased = true;
        this.ball.tint = this.BallColor;

        if(this.difficulte==2){
            this.iaBall.body.velocity.x = this.ballSpeed*4;
            this.iaBall.body.velocity.y = -this.ballSpeed*4; 
        }
    }
}

Pong.prototype.checkGoal = function() {
    
    this.checkIfGoal();

    if(this.difficulte==2){
        if (this.iaBall.y < this.marge + 50 ) {
            this.iaBallIsComplete = true;
            this.iaBall.body.velocity.x =0;
            this.iaBall.body.velocity.y =0;
        } else if (this.iaBall.y > this.game.height - this.marge - 50) {
            this.iaBallIsComplete = true;
            this.iaBall.body.velocity.x =0;
            this.iaBall.body.velocity.y =0;

        }
    }
}

Pong.prototype.checkIfGoal = function(){
    //si but alors score++
    if (this.ball.y < 100) {
        this.goalTop();
        this.reinitGame();
    } else if (this.ball.y > this.game.height - 100) {
        this.goalBot();
        this.reinitGame();
    }
}

Pong.prototype.reinitGame = function() {
    this.updateScore();

}
Pong.prototype.goalTop = function() {
    this.setBall();
    this.scorePlayer++;
}
Pong.prototype.goalBot = function() {
    this.setBall();
    this.scoreComputer++;
}


Pong.prototype.updateScore = function() {
    //refresh affichage du score
    this.scoreText.setText(this.pseudo + " " + this.scorePlayer.toString() + " : " + this.scoreComputer.toString() + " computer");
}

Pong.prototype.setBall = function() {

    //balle au centre
    if (this.ballReleased) {
        this.ball.x = this.game.world.centerX;
        this.ball.y = this.game.world.centerY;
        this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        this.ball.tint = this.BallColor;
        this.colorEmitter(this.BallColor);
        this.ballReleased = false;

        if(this.difficulte==2){
            this.iaBall.body.velocity.x = 0;
            this.iaBall.body.velocity.y = 0;
            this.iaBall.x = this.ball.x;
            this.iaBall.y = this.ball.y;
            this.iaBallIsComplete = false;
        }
    }

}

Pong.prototype.ballHitsBet = function(_ball, _bet) {
    if (_bet.tint == this.BetPlayer1Color)
        this.soundPlayer1.play();
    if (_bet.tint == this.BetPlayer2Color)
        this.soundPlayer2.play();

    //physique balle+raquette
    var diff = 0;
    _ball.tint = _bet.tint;
    this.colorEmitter(_ball.tint);
    this.emitter.tint
        //gauche
        if (_ball.x < _bet.x) {
            diff = _bet.x - _ball.x;
            _ball.body.velocity.x = (-10 * diff);
        //droite
    } else if (_ball.x > _bet.x) {
        diff = _ball.x - _bet.x;
        _ball.body.velocity.x = (10 * diff);
    } else {
        //The ball hit the center of the racket, let's add a little bit of a tragic accident(random) of his movement
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

    if(this.difficulte==2){
        this.iaBall.x = _ball.x;
        this.iaBall.y = _ball.y;
        this.iaBall.body.velocity.x=_ball.body.velocity.x*5;
        this.iaBall.body.velocity.y=_ball.body.velocity.y*5;
        this.iaBallIsComplete =false;
    }

}

Pong.prototype.update = function() {
    //control par le joueur
    //console.log("Update !");
    //CONTROL CLASSIQUE
    this.trail();

    if (!this.multiLocal) {
        if (this.modeControle == 0) {
            this.playerBet.x = this.game.input.x;
            if (this.multiplayer) NetworkManager.notifyMovement({
                x: this.playerBet.x
            });

                var playerBetHalfWidth = this.playerBet.width / 2;

                if (this.playerBet.x < playerBetHalfWidth) {
                    this.playerBet.x = playerBetHalfWidth;
                } else if (this.playerBet.x > this.game.width - playerBetHalfWidth) {
                    this.playerBet.x = this.game.width - playerBetHalfWidth;
                }
            }

        //control par IA
        if (!this.multiplayer) {
            if(this.difficulte==0){

                if (this.ballReleased) {
                    this.emitter.emitParticle();
                }
                if (this.computerBet.x - this.ball.x < -15) {
                    this.computerBet.body.velocity.x = this.computerBetSpeed;
                } else if (this.computerBet.x - this.ball.x > 15) {
                    this.computerBet.body.velocity.x = -this.computerBetSpeed;
                } else {
                    this.computerBet.body.velocity.x = 0;
                }



            }else{
                if(this.difficulte==1){
                    if (this.ballReleased) {
                        this.emitter.emitParticle();
                    }
                    if (this.computerBet.x - this.ball.x < -15) {
                        this.computerBet.body.velocity.x = this.computerBetSpeed*2;
                    } else if (this.computerBet.x - this.ball.x > 15) {
                        this.computerBet.body.velocity.x = -this.computerBetSpeed*2;
                    } else {
                        this.computerBet.body.velocity.x = 0;
                    }



                }else{
                    if(this.difficulte==2){


                        if(this.iaBallIsComplete){

                            if (this.ballReleased) {
                                this.emitter.emitParticle();
                            }
                            if (this.computerBet.x - this.iaBall.x < -15) {
                                this.computerBet.body.velocity.x = this.computerBetSpeed;
                            } else if (this.computerBet.x - this.iaBall.x > 15) {
                                this.computerBet.body.velocity.x = -this.computerBetSpeed;
                            } else {
                                this.computerBet.body.velocity.x = 0;
                            }
                        }else {
                            this.computerBet.body.velocity.x = 0;
                        }


                    }
                }
            }
        }

    } else {
        for (var i = 0; i < this.pointers.length; i++) {
            if (this.pointers[i].isDown) {
                if (this.pointers[i].y >= (this.game.height / 2)) {
                    this.playerBet.x = this.pointers[i].x;
                } else {
                    this.computerBet.x = this.pointers[i].x;
                }
            }
        }

        var playerBetHalfWidth = this.playerBet.width / 2;
        if (this.playerBet.x < playerBetHalfWidth) {
            this.playerBet.x = playerBetHalfWidth;
        } else if (this.playerBet.x > this.game.width - playerBetHalfWidth) {
            this.playerBet.x = this.game.width - playerBetHalfWidth;
        }

        if (this.computerBet.x < playerBetHalfWidth) {
            this.computerBet.x = playerBetHalfWidth;
        } else if (this.computerBet.x > this.game.width - playerBetHalfWidth) {
            this.computerBet.x = this.game.width - playerBetHalfWidth;
        }
    }

    //check des collisions
    this.collideCheck();
    this.checkGoal();

    //debugger;;
    this.fps.setText('Fps : ' + this.game.time.fps.toString());

}

Pong.prototype.collideCheck = function(){
    this.game.physics.arcade.collide(this.ball, this.playerBet, this.ballHitsBet, null, this);
    this.game.physics.arcade.collide(this.ball, this.computerBet, this.ballHitsBet, null, this);
}

Pong.prototype.trail = function() {

    var px = this.ball.body.velocity.x;
    var py = this.ball.body.velocity.y;

    px *= -1;
    py *= -1;

    this.emitter.emitX = this.ball.x;
    this.emitter.emitY = this.ball.y;

    this.emitter.minParticleSpeed.set(px, py);
    this.emitter.maxParticleSpeed.set(px, py);
}


Pong.prototype.init = function(create, preload, update, id, render) {
    $('#gameArea').css('max-height', $(window).height());
    $('#gameArea').css('max-width', $(window).width());
    this.game = new Phaser.Game(1080, 1920, Phaser.AUTO, id, {
        preload: preload,
        create: create,
        update: update,
        pong: this,
        render: render
    });
    this.game.pong = this;

}
