function UnderAttackedPong(mode,nbPoints){

	Pong.apply(this,arguments);

	this.timers = [];
	this.runners = [];
	this.cannonBalls = [];
	this.explosions = [];
	this.ennemyProj = [];

	this.pointWin = 100;
	this.point1 = 0;
	this.point2 = 0;
	this.scoreText2 = undefined;

	this.explosionRadius = 350;
	this.explosionRadiusEnnemy = 125;
	this.frameCount = 0;
}

UnderAttackedPong.prototype = $.extend(true, {}, Pong.prototype);  
UnderAttackedPong.prototype.super = Pong.prototype;     




UnderAttackedPong.prototype.preload = function(){
	this.super.preload.call(this);
	this.game.load.spritesheet('cannon', 'assets/Cannon.png',120,108,3);
	this.game.load.spritesheet('grunt', 'assets/grunt2.png',66,66);
	this.game.load.spritesheet('axeman', 'assets/axeman.png',65,65);
	this.game.load.spritesheet('peon', 'assets/peon2.png',54,54);
	this.game.load.spritesheet('ogre', 'assets/ogre2.png',73,73);
	this.game.load.spritesheet('catapulte', 'assets/catapulte.png',68,68);
	this.game.load.image('tile', 'assets/tileW2.png');
	//debugger;
	//this.game.load.tileSprite('tileTexture', 'assets/tileW2.png');
	this.game.load.spritesheet('explosion', 'assets/explosion.png',480/5,288/3);

}

UnderAttackedPong.prototype.render = function(){
	/*this.game.debug.body(this.computerBet);
	this.game.debug.body(this.playerBet);*/

	/*console.log("RENDER");

	this.runners.forEach(function(e,i,a){
		this.game.debug.body(e)
	},this);*/
	/*this.cannonBalls.forEach(function(e,i,a){
		this.game.debug.body(e)
	},this);*/
/*
	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j = 0 ; j < this.playground.numberHeightCase ; j++){
			this.game.debug.body(this.playground.get(i,j));
		}
	}
	*/


}

UnderAttackedPong.prototype.createBetTop = function() {
    //creer une raquette
    var bet = this.game.add.sprite(this.game.world.centerX, this.marge, 'cannon');
    this.game.physics.arcade.enable(bet);
    bet.anchor.setTo(0.5, 0.5);
    bet.body.collideWorldBounds = true;
    bet.body.bounce.setTo(1, 1);
    bet.body.immovable = true;
    bet.tint = this.BetPlayer2Color;
    bet.angle = 180
    var skin = this.game.add.sprite(-100, -20, 'skinPlayer2');

    bet.addChild(skin);
    return bet;
}

UnderAttackedPong.prototype.createBetBot = function() {
    //creer une raquette
    var bet = this.game.add.sprite(this.game.world.centerX, this.game.height - this.marge, 'cannon');
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


UnderAttackedPong.prototype.updateScore = function(){
	this.super.updateScore.call(this);
	var string = this.point1.toString() + " " + this.pointWin.toString() +" : " +this.point2.toString()+ " "+ this.pointWin.toString();
	if(this.scoreText2!=undefined)
		this.scoreText2.setText(string);

}



UnderAttackedPong.prototype.create = function(){
	this.super.create.call(this);
	//this.scoreText2 = this.game.add.bitmapText(this.scoreText.x,this.scoreText.y, 'flappyfont', 'aazze', 50);
	this.scoreText2 = this.game.add.bitmapText(this.game.width / 2 - 230, this.scoreText.y, 'flappyfont', "ar", 50);
	this.scoreText.y -= 70;
	this.scoreText.anchor.setTo(0.5, 0.5);
	this.scoreText2.anchor.setTo(0.5, 0.5);
	this.scoreText.x = this.game.width /2;
	this.scoreText2.x = this.game.width /2;
	

	this.playground = new UnderAttackedPlayground(this);
	this.timers.push(new TimerFire(this,1000));
	this.timers.push(new TimerPeon(this,5000));
	this.timers[1].accum= 6000;
	this.timers.push(new TimerCatapulte(this,40000));
	this.timers.push(new TimerGrunt(this,8500));
	this.timers.push(new TimerAxeman(this,12000));
	this.timers.push(new TimerOgre(this,19000));
	/*this.timers.push(new TimerGrunt(this,2000));
	this.timers.push(new TimerGrunt(this,7000));

	this.timers.push(new TimerPeon(this,4000));
	this.timers.push(new TimerPeon(this,6500));

	*/
	this.updateScore();

}

UnderAttackedPong.prototype.update = function(){
	this.super.update.call(this);
	
	this.testOutOfBounds();
	this.testCollision();
	this.timers.forEach(function(e,i,a){
		e.update();
	},this);
	this.runners.forEach(function(e,a){
		e.update();
	},this);
	
	if(this.frameCount % 3 == 1){
		this.updateScore();
		this.checkWin();
	}

	this.frameCount++;
	if(this.frameCount > 3)
		this.frameCount = 0;
}



UnderAttackedPong.prototype.checkWin = function(){
	if(this.point1 >= this.pointWin){
	    this.scorePlayer++;
		this.reinitGame();
	}
	else if(this.point2 >= this.pointWin){
		this.scoreComputer++;
		this.reinitGame();
	}
	this.super.checkWin.call(this);

}




UnderAttackedPong.prototype.addRunner = function(runner){
	this.runners.push(runner);
}
UnderAttackedPong.prototype.addCannonBall = function(cannonBall){
	this.cannonBalls.push(cannonBall);
}

UnderAttackedPong.prototype.addEnnemyProj = function(proj){
	this.ennemyProj.push(proj);
}




////////////////////whipes
//enleve les runners
UnderAttackedPong.prototype.whipeRunners = function(){
	this.runners.forEach(function(e,a){
		e.destroy();
	});
	this.runners = [];
}

UnderAttackedPong.prototype.whipeCannonBalls = function(){
	this.cannonBalls.forEach(function(e,a){
		e.destroy();
	});
	this.cannonBalls = [];
}
UnderAttackedPong.prototype.whipeExplosions = function(){
	this.explosions.forEach(function(e,a){
		e.destroy();
	});
	this.explosions = [];
}
UnderAttackedPong.prototype.whipeEnnemyProj = function(){
	this.ennemyProj.forEach(function(e,a){
		e.destroy();
	});
	this.ennemyProj = [];
}
/////////////////////whipes//




//////////////////removes
UnderAttackedPong.prototype.removeRunner = function(runner){
	this.runners.splice(this.runners.indexOf(runner),1);
}
UnderAttackedPong.prototype.removeCannonBall = function(cannonBall){
	this.cannonBalls.splice(this.cannonBalls.indexOf(cannonBall),1);
}
UnderAttackedPong.prototype.removeEnnemyProj = function(proj){
	this.ennemyProj.splice(this.ennemyProj.indexOf(proj),1);
}

//////////////////removes/

UnderAttackedPong.prototype.reinitGame = function() {
	this.whipeRunners();
	this.whipeCannonBalls();
	this.whipeExplosions();
	this.whipeEnnemyProj();
	this.timers.forEach(function(e,i,a){
		e.reset();
	});
	this.point1 = 0;
	this.point2 = 0;
	this.updateScore();
}



UnderAttackedPong.prototype.testOutOfBounds = function(){
	if(this.frameCount % 2==0){
		this.runners.forEach(function(e,a){
			if(this.isOutOfBounds(e)){
				this.removeRunner(e);
				e.destroy();
			}
		},this);
	}	
	else{
		this.cannonBalls.forEach(function(e,a){
			if(this.isOutOfBounds(e)){
				this.removeCannonBall(e);
				e.destroy();
			}
		},this);
	}
}

UnderAttackedPong.prototype.isOutOfBounds = function(sprite){
	if(sprite.x < 0-Math.abs(sprite.width)-50){
		return true;
	}
	if(sprite.x > this.game.width+Math.abs(sprite.width)+50){
		return true;
	}
	if(sprite.y < 0-Math.abs(sprite.height)-50){		
		return true;
	}
	if(sprite.y > this.game.height+Math.abs(sprite.height)+50){		
		return true;
	}
	return false;
}


UnderAttackedPong.prototype.testCollision = function(){
		for(var j = 0 ; j < this.cannonBalls.length ; j++){
			if(this.frameCount%3==2){
				for(var i = 0 ; i < this.runners.length ; i++){
					//test runner hit
					this.game.physics.arcade.collide(this.cannonBalls[j], this.runners[i], function(cannonBall,runner) {

				    }, function(cannonBall, runner) {
				      if(runner.isAlive()){
				      	runner.pong.createExplosion(cannonBall,runner.pong.explosionRadius);
				      	runner.takeDamage();
				      	if(!runner.isAlive()){
							runner.pong.kill(cannonBall.player,runner.score);
				      	}
				      	runner.pong.removeCannonBall(cannonBall);
				      	cannonBall.destroy();
				      }
				      
				      return false;
					});
				}
			}
			//test player hit
				if(this.cannonBalls[j] != undefined){
					this.game.physics.arcade.collide(this.cannonBalls[j], this.playerBet, function(cannonBall,player) {
						cannonBall.pong.createExplosion(cannonBall,cannonBall.pong.explosionRadius);
						cannonBall.pong.playerHitByCannonBall(player,20);
						cannonBall.pong.removeCannonBall(cannonBall);
						cannonBall.pong.point2 += 25;
						cannonBall.destroy();
					});
					this.game.physics.arcade.collide(this.cannonBalls[j], this.computerBet, function(cannonBall,player) {
						cannonBall.pong.createExplosion(cannonBall,cannonBall.pong.explosionRadius);
						cannonBall.pong.playerHitByCannonBall(player,20);
						cannonBall.pong.removeCannonBall(cannonBall);
						cannonBall.pong.point1 += 25;
						cannonBall.destroy();
					});
				}
			
		}

	
		this.ennemyProj.forEach(function(e,i,a){
			this.game.physics.arcade.collide(e, this.computerBet, function(proj,player) {
					proj.pong.createExplosion(proj,100);
					proj.pong.playerHitByCannonBall(player,proj.damage);
					proj.pong.removeEnnemyProj(proj);
					proj.destroy();
				});
			this.game.physics.arcade.collide(e, this.playerBet, function(proj,player) {
					proj.pong.createExplosion(proj,100);
					proj.pong.playerHitByCannonBall(player,proj.damage);
					proj.pong.removeEnnemyProj(proj);
					proj.destroy();
				});

		},this);
	
}

UnderAttackedPong.prototype.kill = function(player,score){
	if(player == this.computerBet){
		this.point2 += score;
	}
	else if(player == this.playerBet){
		this.point1+= score;
	}
}


UnderAttackedPong.prototype.playerHitByCannonBall = function(player,damage){
	if(player == this.playerBet){
		this.point1 -= damage;
		if(this.point1 < 0)
			this.point1 = 0;
	}
	else if(player == this.computerBet){
		this.point2 -= damage;
		if(this.point2 < 0)
			this.point2 = 0;
	}
}


UnderAttackedPong.prototype.createExplosion = function(spriteSrc,power){
	var explo = this.game.add.sprite(spriteSrc.x, spriteSrc.y, 'explosion');
	explo.animations.add('explosion',[0,1,2,3,4], false);
	explo.play('explosion',30);
	explo.animations.currentAnim.onComplete.add(function (sprite,anim) {
		sprite.destroy();
	}, this);
	this.explosions.push(explo);
	explo.anchor.setTo(0.5, 0.5);
	var scaleW = ((power) / explo.width);
    var scaleH = ((power) / explo.height);
    explo.scale.setTo(scaleW,scaleH);
	var circle = new Phaser.Circle(spriteSrc.x, spriteSrc.y, this.explosionRadius);
	//circle.beginFill(0xFF0000, 1);
	this.runners.forEach(function(e,i,a){
		if(this.contains(e.x,e.y)){
			e.takeDamage();
		}
	},circle);

}

UnderAttackedPong.prototype.releaseBall = function() {

    
}