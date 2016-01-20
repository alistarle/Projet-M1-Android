function UnderAttackedPong(mode,nbPoints){

	  Pong.apply(this,arguments);
	  
}

UnderAttackedPong.prototype = $.extend(true, {}, Pong.prototype);  
UnderAttackedPong.prototype.super = Pong.prototype;     




UnderAttackedPong.prototype.preload = function(){
	this.super.preload.call(this);
	//this.game.load.spritesheet('grunt', 'assets/grunt.png',48,50,6);
	this.game.load.spritesheet('cannon', 'assets/Cannon.png',48,50,6);
}

UnderAttackedPong.prototype.createBet = function(x, y) {
    //creer une raquette
    debugger;
    var bet = this.game.add.sprite(x, y, 'cannon');
    this.game.physics.arcade.enable(bet);
    bet.anchor.setTo(0.5, 0.5);
    bet.body.collideWorldBounds = true;
    bet.body.bounce.setTo(1, 1);
    bet.body.immovable = true;
    return bet;
}

UnderAttackedPong.prototype.create = function(){
	this.super.create.call(this);

}

UnderAttackedPong.prototype.update = function(){
	 this.super.update.call(this);


}


UnderAttackedPong.prototype.reinitGame = function() {
	//this.super.reinitGame.call(this);

}