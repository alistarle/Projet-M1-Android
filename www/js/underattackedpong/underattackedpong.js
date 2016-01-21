function UnderAttackedPong(mode,nbPoints){

	Pong.apply(this,arguments);

	//temps pour chaque cannon avant le tire
	this.timerFireRate = 4000;

	//temps avant debut de pop
	this.timerSpawnPeonRate = 1000;
	this.timerSpawnGruntRate = 5000;


	//temps entre chaque pop
	this.timerSpawnPeonAccum = 0;
	this.timerspawnGruntAccum = 0;
	this.timerFireAccum = 0;


	this.runners = [];
}

UnderAttackedPong.prototype = $.extend(true, {}, Pong.prototype);  
UnderAttackedPong.prototype.super = Pong.prototype;     




UnderAttackedPong.prototype.preload = function(){
	this.super.preload.call(this);
	//this.game.load.spritesheet('grunt', 'assets/grunt.png',48,50,6);
	this.game.load.spritesheet('cannon', 'assets/Cannon.png',120,108,3);
	this.game.load.spritesheet('grunt', 'assets/grunt.png',120,108,3);
	this.game.load.spritesheet('peon', 'assets/peon.png',51,41,55);
	this.game.load.image('tile', 'assets/tile.png');

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
	this.timerFireRate += accum


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
	});
}

//cannons tirent
UnderAttackedPong.prototype.fire = function() {
	console.log("Feu !");
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
UnderAttackedPong.prototype.whipeRunner = function(){
	this.runners.forEach(function(e,a){
		e.destroy();
	});
	this.runners = [];
}


UnderAttackedPong.prototype.reinitGame = function() {
	//this.super.reinitGame.call(this);
	this.timerSpawnPeonAccum = 0;
	this.timerSpawnGruntAccum = 0;
	this.timerFireAccum = 0;

	this.whipeRunner();
}