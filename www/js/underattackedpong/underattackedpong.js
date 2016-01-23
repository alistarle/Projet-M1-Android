function UnderAttackedPong(mode,nbPoints){

	Pong.apply(this,arguments);

	//temps pour chaque cannon avant le tire
	this.timerFireRate = 1500;
	this.speedCannonBall = 400;
	this.explosionRadius = 200;

	//temps avant debut de pop
	this.timerSpawnPeonRate = 1000;
	this.timerSpawnGruntRate = 5000;


	//temps entre chaque pop
	this.timerSpawnPeonAccum = 0;
	this.timerspawnGruntAccum = 0;
	this.timerFireAccum = 0;


	this.runners = [];
	this.cannonBalls = [];
	this.explosions = [];
}

UnderAttackedPong.prototype = $.extend(true, {}, Pong.prototype);  
UnderAttackedPong.prototype.super = Pong.prototype;     




UnderAttackedPong.prototype.preload = function(){
	this.super.preload.call(this);
	//this.game.load.spritesheet('grunt', 'assets/grunt.png',48,50,6);
	this.game.load.spritesheet('cannon', 'assets/Cannon.png',120,108,3);
	this.game.load.spritesheet('grunt', 'assets/grunt.png',120,108,3);
	this.game.load.spritesheet('peon', 'assets/peon.png',51,40);
	this.game.load.image('tile', 'assets/tile.png');
	this.game.load.spritesheet('explosion', 'assets/explosion.png',480/5,288/3);

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
	this.ball.bringToTop();

}

UnderAttackedPong.prototype.update = function(){
	this.super.update.call(this);

	var accum = this.game._deltaTime;
	this.timerSpawnPeonAccum += accum;
	this.timerSpawnGruntAccum += accum;
	this.timerFireAccum += accum

	this.testOutOfBounds();
	this.testCollision();

	if(this.timerSpawnPeonAccum > this.timerSpawnPeonRate){
		this.spawnPeon();
		this.timerSpawnPeonAccum -= this.timerSpawnPeonRate;
	}

	if(this.timerSpawnGruntAccum > this.timerSpawnGruntRate){
		this.spawnGrunt();
		this.timerSpawnGruntAccum -= this.timerSpawnGruntRate;
	}

	if(this.timerFireAccum > this.timerFireRate){
		this.fire();
		this.timerFireAccum -= this.timerFireRate;
	}

	this.runners.forEach(function(e,a){
		e.update();

	},this);
}

//cannons tirent
UnderAttackedPong.prototype.fire = function() {
	console.log("Feu !");
	this.createCannonBall(this.playerBet.x,this.playerBet.y-this.playerBet.height+20,-this.speedCannonBall);
	this.createCannonBall(this.computerBet.x,this.computerBet.y,this.speedCannonBall);
}
UnderAttackedPong.prototype.createCannonBall = function(x,y,velocityY){
	var cannonBall = this.game.add.sprite(x,y, 'ball');
	cannonBall.anchor.setTo(0.5, 0.5);
    cannonBall.tint = 0x000000;
    this.game.physics.arcade.enable(cannonBall);
    cannonBall.body.width = (cannonBall.width * 3)/ 5;
    cannonBall.body.height = (cannonBall.height * 3) / 5;
    cannonBall.body.velocity.y = velocityY;
    this.cannonBalls.push(cannonBall);
}



//spawn grunt
UnderAttackedPong.prototype.spawnGrunt = function() {
	console.log("Spawn grunt");
	
	//placementBot(new Grunt());
	//placementTop(new Grunt());
}

//spawn peon
UnderAttackedPong.prototype.spawnPeon = function() {
	console.log("Spawn peon");
	this.runners.push(new Peon(this,'right',this.playground));
	this.runners.push(new Peon(this,'left',this.playground));
}


UnderAttackedPong.prototype.addRunner = function(runner){
	this.runners.push(runner);
}

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

UnderAttackedPong.prototype.removeRunner = function(runner){
	this.runners.splice(this.runners.indexOf(runner),1);
}
UnderAttackedPong.prototype.removeCannonBall = function(cannonBall){
	this.cannonBalls.splice(this.cannonBalls.indexOf(cannonBall),1);
}

UnderAttackedPong.prototype.reinitGame = function() {
	//this.super.reinitGame.call(this);
	this.timerSpawnPeonAccum = 0;
	this.timerSpawnGruntAccum = 0;
	this.timerFireAccum = 0;

	this.whipeRunners();
	this.whipeCannonBalls();
	this.whipeExplosions();
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
			this.removeCannonBall(e);
			e.destroy();
		}
	},this);
}

UnderAttackedPong.prototype.isOutOfBounds = function(sprite){
	if(this.x < 0-Math.abs(this.width)){
		return true;
	}
	if(this.x > this.game.width+Math.abs(this.width)){
		return true;
	}
	if(this.y < 0-Math.abs(this.height)){
		return true;
	}
	if(this.y > this.game.height-Math.abs(this.height)){
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
		      	runner.pong.createExplosion(runner.x,runner.y);
		      	runner.takeDamage();
		      	cannonBall.destroy();
		      }
		      return false;
			});
		}
	}
}


UnderAttackedPong.prototype.createExplosion = function(x,y){
	var explo = this.game.add.sprite(x, y, 'explosion');
	explo.animations.add('explosion',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], false);
	explo.play('explosion',15);
	explo.animations.currentAnim.onComplete.add(function (sprite,anim) {
		console.log('animation complete');
		sprite.destroy();
	}, this);
	this.explosions.push(explo);
	explo.anchor.setTo(0.5, 0.5);
	var scaleW = ((this.explosionRadius*2) / explo.width);
    var scaleH = ((this.explosionRadius*2) / explo.height);
    explo.scale.setTo(scaleW,scaleH);
	var circle = new Phaser.Circle(x, y, this.explosionRadius);
	//circle.beginFill(0xFF0000, 1);
	this.runners.forEach(function(e,i,a){
		if(this.contains(e.x,e.y)){
			e.takeDamage();
		}
	},circle);

}
