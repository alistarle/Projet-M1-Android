function LarryPong(mode, nbPoints){
	  Pong.apply(this,arguments);
}

LarryPong.prototype = $.extend(true, {}, Pong.prototype);  
LarryPong.prototype.super = Pong.prototype;

LarryPong.prototype.preload = function(){
	this.super.preload.call(this);
	this.game.load.image('tile', 'assets/tile.png');
	this.game.load.spritesheet('larryhead', 'assets/larryhead.png',48,50,6);
	this.game.load.spritesheet('larrybody', 'assets/larrybody.png',31,30,8);
	this.game.load.image('potion','assets/potion.png');
}

LarryPong.prototype.create = function(){


	this.playground = new Playground(this);
	this.super.create.call(this);

	this.potion = new Potion(this);


	this.larrys = new Array();
	this.popLarry();
	//this.larrys[0].produceBody(this.larrys[0]);



}
/*
LarryPong.prototype.placementPlayground = function(){
	
	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j = 0 ; j < this.playground.numberHeightCase ; j++){
			this.playground.get(i,j).x = this.playground.xPlayground + this.playground.widthCase/2 + i * this.playground.widthCase;
			this.playground.get(i,j).y = this.playground.yPlayground + this.playground.heightCase/2 + j * this.playground.heightCase;
											
			/*var tile = this.game.add.sprite(this.xPlayground + this.widthCase/2 + i * this.widthCase,
											this.yPlayground + this.heightCase/2 + j * this.heightCase,
											'tile');
			tile.anchor.setTo(0.5, 0.5);
			tile.scale.setTo(scaleW,scaleH);
			this.playground.push(tile);
		}
	}
}*/

LarryPong.prototype.render = function(){
	/*this.game.debug.body(this.potion.self);
	for(var i = 0 ; i < this.larrys.length ; i++){
		this.game.debug.body(this.larrys[i].self);
	}
	this.game.debug.body(this.playground.get(0,0));
	this.game.debug.body(this.playground.get(1,1));
	//this.game.debug.body(this.ball);

	this.numberWidthCase = 6;
	this.numberHeightCase = 6;
	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j = 0 ; j < this.playground.numberHeightCase ; j++){
			this.game.debug.body(this.playground.get(i,j));
		}
	}*/

}

LarryPong.prototype.pushLarry = function(larry){
	this.larrys.push(larry);
}

LarryPong.prototype.update = function(){
	//this.ball.y = 100;
	//this.game.physics.arcade.enable(this.larrys[0]);
	//this.game.physics.arcade.enable(this.potion);
	 this.super.update.call(this);
	 this.playground.update();
	 this.larrys.forEach(function(e,i,tab){e.update();});

}

LarryPong.prototype.setBall = function(){
	this.super.setBall.call(this);
	this.popLarry();	
}

LarryPong.prototype.initGame = function() {
	this.super.goal.call(this);
	this.killLarrys();
	this.popLarry();
}
LarryPong.prototype.killLarrys = function(){
	while(this.larrys.length != 0){
		this.larrys.pop().kill();

	}
}

LarryPong.prototype.popLarry = function() {
	this.larrys.push(new LarryHead(
		this,
		this.playground.get(
			this.game.rnd.integerInRange(0,this.playground.numberWidthCase-1),
			this.game.rnd.integerInRange(0, this.playground.numberHeightCase-1)))
	);
}
LarryPong.prototype.remove = function(larry) {
	var i = this.larrys.indexOf(larry);
	this.larrys.splice(i,1);
}