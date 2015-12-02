function LarryHead(game,tile){
	this.game = game;
	this.playground = game.playground;
	this.self = this.game.add.sprite(tile.x, tile.y, 'larryhead');
	this.frame = 0;
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



function LarryBody(game){
	this.game = game;
	this.suivant;
	this.self = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'LarryBody');
}

LarryBody.prototype.growBody = function() {
	this.suivant = new LarryBody(game);
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