function UnderAttackedPong(mode,nbPoints){

	Pong.apply(this,arguments);

	this.timers = [];
	this.runners = [];
	this.cannonBalls = [];
	this.explosions = [];

	this.explosionRadius = 350;
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
	this.game.load.image('tile', 'assets/tileW2.png');
	this.game.load.spritesheet('explosion', 'assets/explosion.png',480/5,288/3);

}

UnderAttackedPong.prototype.render = function(){
	/*console.log("RENDER");

	this.runners.forEach(function(e,i,a){
		this.game.debug.body(e)
	},this);
	this.cannonBalls.forEach(function(e,i,a){
		this.game.debug.body(e)
	},this);

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
UnderAttackedPong.prototype.create = function(){
	this.super.create.call(this);
	this.playground = new UnderAttackedPlayground(this);
	this.timers.push(new TimerFire(this,1500));

	this.timers.push(new TimerGrunt(this,2000));
	this.timers.push(new TimerGrunt(this,7000));

	this.timers.push(new TimerPeon(this,4000));
	this.timers.push(new TimerPeon(this,6500));

	this.timers.push(new TimerAxeman(this,2500));

	this.timers.push(new TimerOgre(this,10000));
	//this.timers[1].accum = 10000;

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
}








UnderAttackedPong.prototype.addRunner = function(runner){
	this.runners.push(runner);
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
/////////////////////whipes//




//////////////////removes
UnderAttackedPong.prototype.removeRunner = function(runner){
	this.runners.splice(this.runners.indexOf(runner),1);
}
UnderAttackedPong.prototype.removeCannonBall = function(cannonBall){
	this.cannonBalls.splice(this.cannonBalls.indexOf(cannonBall),1);
}

//////////////////removes/

UnderAttackedPong.prototype.reinitGame = function() {
	this.whipeRunners();
	this.whipeCannonBalls();
	this.whipeExplosions();
	this.timers.forEach(function(e,i,a){
		e.reset();
	});
}



UnderAttackedPong.prototype.testOutOfBounds = function(){
	this.runners.forEach(function(e,a){
		if(this.isOutOfBounds(e)){
			this.removeRunner(e);
			e.destroy();
		}
	},this);
	this.cannonBalls.forEach(function(e,a){
		if(this.isOutOfBounds(e)){
			console.log("Cannon ball out of bound");
			this.removeCannonBall(e);
			e.destroy();
		}
	},this);
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
		for(var i = 0 ; i < this.runners.length ; i++){
			this.game.physics.arcade.collide(this.cannonBalls[j], this.runners[i], function(cannonBall,runner) {

		    }, function(cannonBall, runner) {
		      if(runner.isAlive()){
		      	runner.pong.createExplosion(cannonBall.x,cannonBall.y);
		      	runner.takeDamage();
		      	runner.pong.removeCannonBall(cannonBall);
		      	cannonBall.destroy();
		      }
		      return false;
			});
		}
	}
}


UnderAttackedPong.prototype.createExplosion = function(x,y){
	var explo = this.game.add.sprite(x, y, 'explosion');
	explo.animations.add('explosion',[0,1,2,3,4], false);
	explo.play('explosion',30);
	explo.animations.currentAnim.onComplete.add(function (sprite,anim) {
		console.log('animation complete');
		sprite.destroy();
	}, this);
	this.explosions.push(explo);
	explo.anchor.setTo(0.5, 0.5);
	var scaleW = ((this.explosionRadius) / explo.width);
    var scaleH = ((this.explosionRadius) / explo.height);
    explo.scale.setTo(scaleW,scaleH);
	var circle = new Phaser.Circle(x, y, this.explosionRadius);
	//circle.beginFill(0xFF0000, 1);
	this.runners.forEach(function(e,i,a){
		if(this.contains(e.x,e.y)){
			e.takeDamage();
		}
	},circle);

}

UnderAttackedPong.prototype.releaseBall = function() {

    
}