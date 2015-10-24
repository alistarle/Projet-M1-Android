function Pong(modeControle){
//variable de coordonees 
        this.Y = 1000;

        this.modeControle = optionsGetModeControle();
        
        

        //scores
        this.scorePlayer = undefined;
        this.scoreCompute0 = undefined;

        //gameObjects
        this.playerBet = undefined;
        this.computerBet = undefined;
        this.ball = undefined;
        this.emitter = undefined;
        this.scoreText = undefined;

        //valeurs pouvant être modifiees
        this.computerBetSpeed = 400;
        this.ballSpeed = 500;
        this.ballReleased = false;


debugger;
        createBet : function(x, y) {
            //creer une raquette
            /*var bet = game.add.sprite(x, y, 'bet');
            game.physics.arcade.enable(bet);
            bet.anchor.setTo(0.5, 0.5);
            bet.body.collideWorldBounds = true;
            bet.body.bounce.setTo(1, 1);
            bet.body.immovable = true;
            
            return bet;*/
        };
debugger;
        this.preload = function() {
            //hihi 
            //chargement des assets
            
            this.game.load.image('bet', 'assets/bet.png');
            this.game.load.image('ball', 'assets/ball.png');
            this.game.load.bitmapFont('font', 'assets/flappyfont.png', 'assets/flappyfont.fnt');
            this.game.load.bitmapFont('flappyfont', 'assets/flappyfont.png', 'assets/flappyfont.fnt');
        }


        this.create = function() {
            debugger;
            //create !
            this.scorePlayer = 0;
            this.scoreComputer = 0;
            //OnCreate initialisation des objets avec sprites et physique
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#DDDDDD';
            this.playerBet = this.createBet(this.game.world.centerX, this.game.height - 80);
            this.computerBet = this.createBet(this.game.world.centerX, 80);
            this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
            this.game.physics.arcade.enable(ball);

            this.ball.anchor.setTo(0.5, 0.5);
            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce.setTo(1, 1);
            this.game.input.onDown.add(releaseBall, this);

            this.game.scoreText = this.game.add.bitmapText(game.width / 2 - 230, 0, 'flappyfont', game.scorePlayer.toString() + ":" + game.scoreComputer.toString(), 50);
            this.game.scoreText.visible = true;

            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;


            //create an emitter
            this.emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);
            this.emitter.makeParticles('ball');


            this.emitter.gravity = 200;
            this.emitter.setAlpha(1, 0, 20);
            this.emitter.setScale(1, 0, 1, 0, 400);

            this.emitter.start(false, 30, 5);

            if (this.modeControle == 2) {
                gyro.frequency = 2;
                gyro.startTracking(function(o) {
                    var gyroX = o.gamma * 15 + game.width / 2;
                    if (gyroX > 0 && gyroX < game.width) {
                        playerBet.x = gyroX;
                    }

                });
            }

            this.scale.startFullScreen(false);

        }

        

        


        this.releaseBall = function() {

            /*if (!ballReleased) {
                ball.body.velocity.x = ballSpeed;
                ball.body.velocity.y = -ballSpeed;
                ballReleased = true;
            }*/
        }

        this.checkGoal = function() {
           
            //si but alors score++
            /*if (ball.y < 80) {
                setBall();
                game.scorePlayer++;
            } else if (ball.y > game.height - 80) {
                setBall();
                game.scoreComputer++;
            }
            updateScore();*/
        }

        this.updateScore = function() {
           
            //refresh affichage du score
            //game.scoreText.setText("player " + game.scorePlayer.toString() + " : " + game.scoreComputer.toString() + " computer");
        }

        this.setBall = function() {
           
            //balle au centre
            /*if (ballReleased) {
                ball.x = game.world.centerX;
                ball.y = game.world.centerY;
                ball.body.velocity.x = 0;
                ball.body.velocity.y = 0;
                ballReleased = false;
            }*/
        }

        this.ballHitsBet = function(_ball, _bet) {
           
            //physique balle+raquette
            /*var diff = 0;

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
            }*/
        }

        this.update = function() {
            //update !
            //control par le joueur

            //CONTROL GYROSCOPE
            if(this.game == undefined || this.trail == undefined)
                return;

            //CONTROL CLASSIQUE

            if (this.modeControle == 1) {
                playerBet.x = game.input.x;


                var playerBetHalfWidth = playerBet.width / 2;

                if (playerBet.x < playerBetHalfWidth) {
                    playerBet.x = playerBetHalfWidth;
                } else if (playerBet.x > game.width - playerBetHalfWidth) {
                    playerBet.x = game.width - playerBetHalfWidth;
                }
            }
            this.trail();

            //control par IA
            if (computerBet.x - ball.x < -15) {
                computerBet.body.velocity.x = computerBetSpeed;
            } else if (computerBet.x - ball.x > 15) {
                computerBet.body.velocity.x = -computerBetSpeed;
            } else {
                computerBet.body.velocity.x = 0;
            }
            emitter.emitParticle();



            //check des collisions
            game.physics.arcade.collide(ball, playerBet, ballHitsBet, null, this);
            game.physics.arcade.collide(ball, computerBet, ballHitsBet, null, this);
            checkGoal();
            


        }

        this.trail = function() {
            /*var px = this.ball.body.velocity.x;
            var py = this.ball.body.velocity.y;

            px *= -1;
            py *= -1;
            emitter.emitX = ball.x;
            emitter.emitY = ball.y;

            emitter.minParticleSpeed.set(px, py);
            emitter.maxParticleSpeed.set(px, py);*/
        }

        this.init = function(){
            this.game = new Phaser.Game(1080, 1920, Phaser.AUTO, '', {
            preload: this.preload,
            create: this.create,
            update: this.update
            });
        }


}