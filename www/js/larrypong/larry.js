function LarryHead(larrypong,tile){
	this.larrypong = larrypong;
	this.game = larrypong.game;
	this.playground = this.larrypong.playground;
	this.self = this.game.add.sprite(tile.x, tile.y, 'larryhead');
	this.self.self = this;

	this.larrybody = [];

	this.scaleW; scaleW = (tile.width / this.self.width);
	this.scaleH; scaleH = (tile.height / this.self.height);
	this.self.scale.setTo(scaleW,scaleH);


	this.self.anchor.x=0.5;
	this.self.anchor.y=0.5;

	this.animations = {
		'walkright' : this.self.animations.add('walkright', [0,1], true),
		'walkleft' : this.self.animations.add('walkleft', [0,1], true),
		'walkup' : this.self.animations.add('walkup', [2,5], true),
		'walkdown' : this.self.animations.add('walkdown', [3,4], true)
	};

	//deplacement vers tile du playground
	this.tileObjective = undefined;

	//tile ou se trouve le larryhead
	this.tileCurrent = tile;

	

	this.self.animations.play('walkdown',3,true);

	this.game.physics.enable(this.self, Phaser.Physics.ARCADE);

	//this.self.body.setSize(0.8,0.8);
	this.self.body.width = this.self.width/2;
	this.self.body.height = this.self.height/2;




}

LarryHead.prototype.onTouchPotion = function(){
	debugger;

}

LarryHead.prototype.randomPlacement = function(){
	var rand = this.game.rnd.integerInRange(0, this.playground.length);

	if(this.body != undefined){
		this.body.placement();
	}
}

LarryHead.prototype.onHitBall = function(){
	;
}

LarryHead.prototype.kill = function(){
	this.self.kill();
}
LarryHead.prototype.onSuccess = function(){
	this.produceBody();
}

LarryHead.prototype.produceBody = function(){
	//this.flappy = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'larrybody');

	this.test;
	if(this.larrybody.length == 0){
		this.test= new LarryBody(this);
	}
	else{
		this.test = new LarryBody(this.larrybody[this.larrybody.length-1]);
	}
	this.larrybody.push(this.test);
	this.larrypong.pushLarry(this.test);
}

LarryHead.prototype.update = function(){

	if(this.tileObjective != undefined){
		if(this.objectiveReached()){
			//this.onSuccess();
			this.tileObjective = undefined;

		}
		else{
			this.move();
		}
	}
	if(this.tileObjective == undefined){
		if(this.findObjective()){

		}
	}

	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j = 0 ; j < this.playground.numberHeightCase ; j++){
			this.game.physics.arcade.collide(
				this.self, this.playground.get(i,j),
				function(){
					console.log("collide test");
				},
				function(larry,tile){
					arguments[0].self.setCurrentTile(arguments[1])
					return false;
				}
				, this);

		}
	}

	this.game.physics.arcade.collide(this.self, this.larrypong.potion.self,
		function(){
			console.log("collide test 2");
		}, 
		function(larry,potion){
			larry.self.onSuccess();
			potion.self.placement();
			return false;
		}, this);



}

LarryHead.prototype.move = function(){
	if(this.tileCurrent == undefined){
		return;
	}
	if(this.tileCurrent.posX != this.tileObjective.posX){
		;
		if(this.tileCurrent.posX > this.tileObjective.posX){
			this.self.body.velocity.x = -100;
			this.self.body.velocity.y = 0;
			this.self.animations.play('walkright',3,true);

		}
		else{
			this.self.body.velocity.x = 100;
			this.self.body.velocity.y = 0;
			this.self.animations.play('walkleft',3,true);
		}
	}
	else if(this.tileCurrent.posY != this.tileObjective.posY){
		;
		if(this.tileCurrent.posY < this.tileObjective.posY){
			this.self.body.velocity.y = 100;
			this.self.body.velocity.x = 0;
			this.self.animations.play('walkdown',3,true);

		}
		else{
			this.self.body.velocity.y = -100;
			this.self.body.velocity.x = 0;
			this.self.animations.play('walkup',3,true);

		}
	}
}

LarryHead.prototype.setCurrentTile = function(tile){
	this.tileCurrent = tile;
}

LarryHead.prototype.objectiveReached = function(){
	return (this.tileCurrent == this.tileObjective);
}

/*essaye de trouver une case vers laquelle se deplacer, renvoie faux si aucune ne correspond*/
LarryHead.prototype.findObjective = function(){
	var xToGo = this.tileCurrent.posX-this.larrypong.potion.tileCurrent.posX;
	var yToGo = this.tileCurrent.posY-this.larrypong.potion.tileCurrent.posY;
	var randBehaviour = this.game.rnd.integerInRange(0, 1);

	//more dynamic behaviour
	if(xToGo < -1)
		xToGo = -1;
	else if(xToGo > 1)
		xToGo = 1;
	if(yToGo < -1)
		yToGo = -1;
	else if(yToGo > 1)
		yToGo = 1;

	//x first
	if((randBehaviour == 0 &&  xToGo != 0) || yToGo == 0){
		this.tileObjective = this.larrypong.playground.get(this.tileCurrent.posX-xToGo,this.tileCurrent.posY);
	}
	//y first
	else{
		this.tileObjective = this.larrypong.playground.get(this.tileCurrent.posX,this.tileCurrent.posY-yToGo);
	}
	console.log("On a trouve la case ",this.tileObjective);
	if(this.tileObjective == undefined)
		debugger;
	else if(this.tileObjective == this.tileCurrent && this.tileCurrent != this.larrypong.potion.tileCurrent)
		debugger;
	return false;
}






function LarryBody(larrymember){
	debugger;
	this.game = larrymember.game;
	this.suivant = larrymember;

	var distance = 200;
	var determineX = larrymember.self.x;
	var determineY = larrymember.self.y;
	if(larrymember.self.body.velocity.x < 0){
		determineX += distance;
	}
	else if(larrymember.self.body.velocity.x > 0){
		determineX -= distance;
	}
	else if(larrymember.self.body.velocity.y > 0){
		determineY += distance;
	}
	else if(larrymember.self.body.velocity.y < 0){
		determineY -= distance;
	}

	this.self = this.game.add.sprite(250, 250, 'larrybody');
	this.self.self = this;
	this.self.scale.setTo(larrymember.scaleW,larrymember.scaleH);
	this.game.physics.enable(this.self, Phaser.Physics.ARCADE);


	this.self.anchor.x=0.5;
	this.self.anchor.y=0.5;
	this.animations = {
		'walkright' : this.self.animations.add('walkright', [0,1], true),
		'walkleft' : this.self.animations.add('walkleft', [0,1], true),
		'walkup' : this.self.animations.add('walkup', [0,1], true),
		'walkdown' : this.self.animations.add('walkdown', [0,1], true)
	};

	this.self.animations.play('walkdown',3,true);



}

LarryBody.prototype.growBody = function() {
	//this.suivant = new LarryBody(game);
};

LarryBody.prototype.onHitBall = function() {

}

LarryBody.prototype.placement = function (){
	if(this.suivant != undefined){
		this.suivant.placement();
	}
}
LarryBody.prototype.kill = function (){
	this.self.kill();
}
LarryBody.prototype.update = function() {

}