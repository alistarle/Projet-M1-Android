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

	this.score = this.getScore();
	this.health = this.maxHealth = this.getHealth();
	/*this.health = 450;
	this.maxHealth = 500;*/
	this.speed = this.getSpeed();

	//this.rect = new Phaser.Rectangle(this.x, this.y, this.width, this.height);
	this.healthBarWidth = 50;
	this.healthBar = this.game.add.graphics(0,0);
    this.healthBar.lineStyle(2, 0x00FF00, 1);
    this.healthBar.beginFill(0x00FF00, 1);
    this.healthBar.drawRect(-this.healthBarWidth/2,-Math.abs(this.height/4), this.healthBarWidth, 4);    
    this.healthBar.endFill();


   

	this.addChild(this.healthBar);

}
Runner.prototype = Object.create(Phaser.Sprite.prototype);
Runner.prototype.constructor = Runner;

Runner.prototype.updateLifeBar = function(){
	if(this.healthBar.graphicsData.length >= 4){
		//debugger;
		//this.healthBar.graphicsData.splice(3,1);
		//debugger;
		
	}

	//this.takeDamage();
 	//
//this.healthBar.clear();

	//this.healthBar = this.game.add.graphics(0,0);
    /*this.healthBar.lineStyle(2, 0x00FF00, 1);
    this.healthBar.beginFill(0x00FF00, 1);
    this.healthBar.drawRect(-this.healthBarWidth/2,-Math.abs(this.height/4), this.healthBarWidth, 4);    
    this.healthBar.endFill();*/
	//this.addChild(this.healthBar);
	;
	var widthRedBar = this.healthBarWidth - (this.health/this.maxHealth)*(this.healthBarWidth);
	var xRedBar = -this.healthBarWidth/2 + this.healthBarWidth - widthRedBar;
    this.healthBar.lineStyle(2, 0x00FF00, 1);
	this.healthBar.beginFill(0xFF0000, 1);
	this.healthBar.drawRect(xRedBar,-Math.abs(this.height/4), widthRedBar, 4);
	this.healthBar.endFill();
	

		//this.healthBar.beginFill(0xFF0000, 1);
		/*this.test= 40;
			this.test+=1;
	this.healthBar.endFill();*/
	/*this.healthBar.graphicsData[1].shape.x= xRedBar;
	this.healthBar.graphicsData[1].shape.width= widthRedBar;*/

	this.healthBar.dirty = true;
	this.healthBar.fresh =true;
	if(this.direction=="left"){
		this.healthBar.scale.x = -1;
	}
}

Runner.prototype.update = function(){
	this.normalizeHealth();
	this.updateLifeBar();
	this.locate();
	if(this.isAlive()){
		this.followPattern();
	}
	else{
		this.stop();
		this.play('dead',2);
		this.animations.currentAnim.onComplete.add(function (sprite,anim) {
			this.removeRunner(sprite);
			sprite.destroy();
		}, this.pong);
	}

}

Runner.prototype.normalizeHealth = function(){
	if(this.health < 0)
		this.health = 0;
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



Runner.prototype.getHealth = function(){
	console.log("Gethealth not overriden");
}

Runner.prototype.getSpeed = function(){
	console.log("Getspeed not overriden");
}
Runner.prototype.getScore = function(){
	console.log("Getscore not overriden");
}
Runner.prototype.getDamage = function(){
	console.log("Getdamage not overriden");
}





Runner.prototype.getTarget = function(){
	if(this.direction == "left"){
		return this.pong.playerBet;
	}
	else{
		return this.pong.computerBet;
	}
}

Runner.prototype.shootTarget = function(){
	var target = this.getTarget();
	var proj = this.getProjectile(this.x,this.y);
	var x = target.x - this.x;
	var y = target.y - this.y;
	proj.body.velocity.x = x;
	proj.body.velocity.y = y;
	
	

}

Runner.prototype.getProjectile = function(){
	var proj = this.game.add.sprite(this.x, this.y, 'ball');
	proj.anchor.setTo(0.5, 0.5);
	proj.width = this.width /2;
	proj.height = this.height/2;
	proj.tint = 0x000000;
	proj.damage = this.getDamage();
	proj.pong = this.pong;
	this.game.physics.arcade.enable(proj);
	this.pong.addEnnemyProj(proj);
	return proj;
}