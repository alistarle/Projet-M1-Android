function LarryHead(game){
	debugger;
	this.game = game;
	this.playground = game.playground;
	this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'LarryHead');
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




function LarryBody(game){
	this.game = game;
	this.suivant;
	this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'LarryBody');
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