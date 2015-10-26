function Pong(game) {
    //variable de coordonees 
    this.Y = 1000;
    this.modeControle = optionsGetModeControle();
    this.game = game;

    //couleurs
    this.BallColor = optionsGetCouleurBalle();
    this.BetPlayer1Color = optionsGetCouleurBarre();
    this.BetPlayer2Color = 0xff00ff;
    this.backgroundColor = 0xffffff;

    //skins
    this.skinPlayer1Path = 'assets/skins/moustache.png';
    this.skinPlayer2Path = 'assets/skins/yeux.png'

    //variable de coordonees 
    this.marge = 200;

    //scores
    this.scorePlayer = undefined;
    this.scoreCompute0 = undefined;

    //gameObjects
    this.playerBet;
    this.computerBet;
    this.ball;

    this.scoreText;

    //valeurs pouvant être modifiees
    this.computerBetSpeed = 600;
    this.ballSpeed = 500;
    this.ballReleased = false;

    this.pseudo = optionsGetPseudo();

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
    this.game.load.image('bet', 'assets/bet.png');
    this.game.load.image('ball', 'assets/ball.png');
    this.game.load.bitmapFont('font', 'assets/flappyfont.png', 'assets/flappyfont.fnt');
    this.game.load.bitmapFont('flappyfont', 'assets/flappyfont.png', 'assets/flappyfont.fnt');
    this.game.load.image('skinPlayer1', this.skinPlayer1Path);
    this.game.load.image('skinPlayer2', this.skinPlayer2Path);

}


Pong.prototype.create = function() {
    //create !
    this.scorePlayer = 0;
    this.scoreComputer = 0;
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

    this.game.input.onDown.add(this.releaseBall, this);

    this.scoreText = this.game.add.bitmapText(this.game.width / 2 - 230, this.marge / 2, 'flappyfont', this.scorePlayer.toString() + ":" + this.scoreComputer.toString(), 50);
    this.scoreText.visible = true;


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
            }

        });
    }

    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;


    this.game.scale.startFullScreen(false);
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
    }
}

Pong.prototype.checkGoal = function() {
    //si but alors score++
    if (this.ball.y < 100) {
        this.setBall();
        this.scorePlayer++;
    } else if (this.ball.y > this.game.height - 100) {

        this.setBall();
        this.scoreComputer++;
    }
    this.updateScore();

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
    }

}

Pong.prototype.ballHitsBet = function(_ball, _bet) {
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

}

Pong.prototype.update = function() {
    //control par le joueur
    //console.log("Update !");
    //CONTROL CLASSIQUE
    if (this.modeControle == 0) {
        this.playerBet.x = this.game.input.x;


        var playerBetHalfWidth = this.playerBet.width / 2;

        if (this.playerBet.x < playerBetHalfWidth) {
            this.playerBet.x = playerBetHalfWidth;
        } else if (this.playerBet.x > this.game.width - playerBetHalfWidth) {
            this.playerBet.x = this.game.width - playerBetHalfWidth;
        }
    }
    this.trail();

    //control par IA

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



    //check des collisions
    this.game.physics.arcade.collide(this.ball, this.playerBet, this.ballHitsBet, null, this);
    this.game.physics.arcade.collide(this.ball, this.computerBet, this.ballHitsBet, null, this);
    this.checkGoal();
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


Pong.prototype.init = function(create, preload, update, id) {
    $('#gameArea').css('max-height', $(window).height());
    $('#gameArea').css('max-width', $(window).width());
    this.game = new Phaser.Game(1080, 1920, Phaser.AUTO, id, {
        preload: preload,
        create: create,
        update: update,
        pong: this
    });
}
