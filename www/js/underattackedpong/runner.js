function Runner(pong,direction,playground,skin,scaleWPlayground,scaleHPlayground){
	this.pong = pong;
	this.game = pong.game;
	this.direction = direction;
	this.playground = playground;

	//scale par rapport aux tile
	this.scaleWPlayground = scaleWPlayground;
	this.scaleHPlayground = scaleHPlayground;

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
    this.body.setSize( (this.width * 1)/ 5, (this.height * 1) / 5, 0, 0);


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
	this.locate();
	if(this.isAlive()){
		this.followPattern();
	}
	else{
		this.stop();
		this.play('dead',2);
		this.animations.currentAnim.onComplete.add(function (sprite,anim) {
			console.log('animation complete');
			this.removeRunner(sprite);
			sprite.destroy();
		}, this.pong);
	}

}

Runner.prototype.locate = function(){
	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j = 0 ; j < this.playground.numberHeightCase ; j++){
			this.game.physics.arcade.collide(this, this.playground.get(i,j), function(runner,tile) {

		    }, function(runner, tile) {
		      runner.tileCurrent = tile;
		      return false;
			});
			 /*if(this.playground.get(i,j).getBounds().contains(this.x,this.y)){
			 	this.tileCurrent = this.playground.get(i,j);
			 }*/
		}
	}
}


Runner.prototype.followPattern = function(){
	if(this.pattern == []){
		console.log("PAS DE PATTERN POUR ",this);
		return;
	}
	/*if(this.tileObjective == this.tileCurrent){
		this.currentPattern++;
	}

	if(this.currentPattern > this.pattern.length)
		this.currentPattern = 0;*/

	this.doPattern(this.pattern[this.currentPattern]);
	

}
Runner.prototype.nextPattern = function(){
	this.currentPattern++;
	if(this.currentPattern >= this.pattern.length)
		this.currentPattern = 0;
}

Runner.prototype.takeDamage = function(){
	this.health--;
}
Runner.prototype.isAlive = function(){
	return this.health > 0;
}


Runner.prototype.doPattern = function(patternName){
	if(patternName == undefined)
		debugger;
	if(this[patternName].call(this)){
		this.nextPattern();
		this.doPattern(this.pattern[this.currentPattern]);
	}
}


Runner.prototype.getPattern = function(){
	return [];
}

Runner.prototype.stop = function(){
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
}

Runner.prototype.goTop = function(){
	if(this.tileObjective == undefined){
		var tile = this.playground.get(this.tileCurrent.posX,this.tileCurrent.posY-1);
		if(tile == undefined)
			return true;
		else
			this.tileObjective = tile;
	}

	if(this.tileCurrent == this.tileObjective){
		this.tileObjective = undefined;
		return true;
	}

	this.body.velocity.x = 0;
	this.body.velocity.y = -this.speed;
	this.animations.play('walkup', 5, true);
	return false;
}
Runner.prototype.goBot = function(){
	if(this.tileObjective == undefined){
		var tile = this.playground.get(this.tileCurrent.posX,this.tileCurrent.posY+1);
		if(tile == undefined)
			return true;
		else
			this.tileObjective = tile;
	}

	if(this.tileCurrent == this.tileObjective){
		this.tileObjective = undefined;
		return true;
	}
	this.body.velocity.x = 0;
	this.body.velocity.y = this.speed;
	this.animations.play('walkdown', 5, true);
	return false;
}

Runner.prototype.goLeft = function(){
	if(this.tileObjective == undefined && this.tileCurrent != undefined){
		var tile = this.playground.get(this.tileCurrent.posX-1,this.tileCurrent.posY);
		this.tileObjective = tile;
	}

	if(this.tileCurrent == this.tileObjective){
		this.tileObjective = undefined;
		return true;
	}
	this.body.velocity.x = -this.speed;
	this.body.velocity.y = 0;
	this.animations.play('walkleft', 5, true);
	this.scale.setTo(-Math.abs(this.scale.x),this.scale.y);
	return false;
}

Runner.prototype.goRight = function() {
	if(this.tileObjective == undefined && this.tileCurrent != undefined){
		var tile = this.playground.get(this.tileCurrent.posX+1,this.tileCurrent.posY);
		this.tileObjective = tile;
	}

	if(this.tileCurrent == this.tileObjective){
		this.tileObjective = undefined;
		return true;
	}
	this.body.velocity.x = this.speed;
	this.body.velocity.y = 0;
	this.animations.play('walkright', 5, true);
	this.scale.setTo(Math.abs(this.scale.x),this.scale.y);
	return false;
}