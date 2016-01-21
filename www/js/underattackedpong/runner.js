function Runner(pong,direction,playground,skin,speed){
	this.pong = pong;
	this.game = pong.game;
	this.direction = direction;
	this.playground = playground;
	Phaser.Sprite.call(this, pong.game, 250, 250, skin);
	this.game.physics.arcade.enable(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

	playground.scaleSpriteToTile(this);
	if(direction == 'right'){
		this.playground.spawnTop(this);
	}
	else if(direction == 'left'){
		this.playground.spawnBot(this);
	}
	this.game.add.existing(this);

	//pattern stuff
	this.pattern = this.getPattern();
	this.currentPattern = 0;
	this.tileObjective;
	this.tileCurrent;

	this.speed = speed;
}
Runner.prototype = Object.create(Phaser.Sprite.prototype);
Runner.prototype.constructor = Runner;


Runner.prototype.update = function(){
	this.followPattern();
}

Runner.prototype.followPattern = function(){
	if(this.pattern == []){
		console.log("PAS DE PATTERN POUR ",this);
		return;
	}
	if(this.tileObjective == this.tileCurrent){
		this.currentPattern++;
	}

	if(this.currentPattern > this.pattern.length)
		this.currentPattern = 0;

	this.doPattern(this.pattern[this.currentPattern]);
	

}


Runner.prototype.doPattern = function(patternName){
	this[patternName].call(this);
}


Runner.prototype.getPattern = function(){
	return [];
}

Runner.prototype.goTop = function(){
	this.body.velocity.x = 0;
	this.body.velocity.y = this.speed;
}
Runner.prototype.goBot = function(){
	this.body.velocity.x = 0;
	this.body.velocity.y = -this.speed;
}

Runner.prototype.goLeft = function(){
	this.body.velocity.x = -this.speed;
	this.body.velocity.y = 0;
}

Runner.prototype.goRight = function() {
	this.body.velocity.x = this.speed;
	this.body.velocity.y = 0;
}