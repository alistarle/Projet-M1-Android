function Potion(larrypong){
	this.larrypong = larrypong;
	this.game = larrypong.game;
	this.playground = this.larrypong.playground;
	this.self = this.game.add.sprite(0, 0, 'potion');
	this.self.self = this;

	this.self.anchor.x=0.5;
	this.self.anchor.y=0.5;

	//tile ou se trouve la potion
	this.tileCurrent = undefined;
	this.placement();

	var scaleW; scaleW = (this.tileCurrent.width / this.self.width);
	var scaleH; scaleH = (this.tileCurrent.height / this.self.height);
	this.self.scale.setTo(scaleW,scaleH);
	this.game.physics.enable(this.self, Phaser.Physics.ARCADE);


	//reduce hitbox
	this.self.body.width = this.self.width/5;
	this.self.body.height = this.self.height/5;

}




Potion.prototype.placement = function(){
	var i = this.game.rnd.integerInRange(0,this.playground.numberWidthCase-1);
	var j = this.game.rnd.integerInRange(0, this.playground.numberHeightCase-1);
	this.tileCurrent = this.playground.get(i,j);
	this.self.x = this.tileCurrent.x;
	this.self.y = this.tileCurrent.y;
}