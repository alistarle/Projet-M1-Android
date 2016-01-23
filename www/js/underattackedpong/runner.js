function Runner(pong,direction,playground,skin){
	this.pong = pong;
	this.game = pong.game;
	this.direction = direction;
	this.playground = playground;
	Phaser.Sprite.call(this, pong.game, 250, 250, skin);
	this.game.physics.arcade.enable(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.body.width = (this.width * 3)/ 5;
    this.body.height = (this.height * 3) / 5;
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

	this.speed = 1;
	this.health = 1;
}
Runner.prototype = Object.create(Phaser.Sprite.prototype);
Runner.prototype.constructor = Runner;


Runner.prototype.update = function(){
	/*if(this.isOutOfBounds()){
		console.log("Out of bounds !" );
		this.destroy();
		this.pong.removeRunner(this);
		return;
	}*/
	if(this.isAlive()){
		this.followPattern();
	}
	else{
		this.stop();

	}

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


Runner.prototype.takeDamage = function(){
	this.health--;
}
Runner.prototype.isAlive = function(){
	return this.health > 0;
}


Runner.prototype.doPattern = function(patternName){
	this[patternName].call(this);
}


Runner.prototype.getPattern = function(){
	return [];
}

Runner.prototype.stop = function(){
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
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
	this.animations.play('walkleft', 5, true);
	this.scale.setTo(-Math.abs(this.scale.x),this.scale.y);

}

Runner.prototype.goRight = function() {
	this.body.velocity.x = this.speed;
	this.body.velocity.y = 0;
	this.animations.play('walkright', 5, true);
	this.scale.setTo(Math.abs(this.scale.x),this.scale.y);

}