function LarryPong(game,modeControle){

	  Pong.apply(this,arguments);
}

LarryPong.prototype = $.extend(true, {}, Pong.prototype);  
LarryPong.prototype.super = Pong.prototype;

LarryPong.prototype.create = function(){


	//Background stuff
	this.playground = {};
	this.playground.get = function(x,y){
		return this[x+""+y];
	}

	this.playground.numberWidthCase = 10;
	this.playground.numberHeightCase = 10;
	this.playground.widthPlayground = this.game.width;
	this.playground.heightPlayground = this.game.height/4;

	this.playground.widthCase = this.playground.widthPlayground / this.playground.numberWidthCase;
	this.playground.heightCase = this.playground.heightPlayground / this.playground.numberHeightCase;

	this.playground.xPlayground = 0;
	this.playground.yPlayground = (this.game.height / 2) - (this.playground.heightPlayground / 2);

	var scaleW = this.playground.widthCase / 20;
	var scaleH = this.playground.heightCase / 20;
	

	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j=0 ; j < this.playground.numberHeightCase ; j++){
			var tile = this.game.add.sprite(0,0,'tile');
			tile.anchor.setTo(0.5, 0.5);
			tile.scale.setTo(scaleW,scaleH);
			this.playground[i.toString()+""+j.toString()] = tile;
		}
		
	}
	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j = 0 ; j < this.playground.numberHeightCase ; j++){
			this.playground.get(i,j).topCase = this.playground.get(i,j-1);
			this.playground.get(i,j).botCase = this.playground.get(i,j+1);
			this.playground.get(i,j).leftCase = this.playground.get(i-1,j);
			this.playground.get(i,j).rightCase = this.playground.get(i+1,j);
			this.playground.get(i,j).posY = j;
			this.playground.get(i,j).posX = i;
		}
	}
	this.placementPlayground();

	this.super.create.call(this);

	this.larrys = new Array();
	this.popLarry();



}

LarryPong.prototype.placementPlayground = function(){
	/*for(var i = 0 ; i < this.numberWidthCase*this.numberHeightCase ; i++){
		console.log()
	}*/
	for(var i = 0 ; i < this.playground.numberWidthCase ; i++){
		for(var j = 0 ; j < this.playground.numberHeightCase ; j++){
			this.playground.get(i,j).x = this.playground.xPlayground + this.playground.widthCase/2 + i * this.playground.widthCase;
			this.playground.get(i,j).y = this.playground.yPlayground + this.playground.heightCase/2 + j * this.playground.heightCase;
											
			/*var tile = this.game.add.sprite(this.xPlayground + this.widthCase/2 + i * this.widthCase,
											this.yPlayground + this.heightCase/2 + j * this.heightCase,
											'tile');
			tile.anchor.setTo(0.5, 0.5);
			tile.scale.setTo(scaleW,scaleH);
			this.playground.push(tile);*/
		}
	}
}

LarryPong.prototype.preload = function(){
	this.super.preload.call(this);
	this.game.load.image('tile', 'assets/tile.png');
	this.game.load.image('larryhead', 'assets/larryhead.png',48,50,6);
	this.game.load.image('larrybody', 'assets/larrybody.png',36,36,8);

}

LarryPong.prototype.update = function(){
	
	 this.super.update.call(this);
	 /*this.doFlappyUpdate();
	 if(this.animatingFlappy) this.recenterFlappy();

	 this.game.physics.arcade.collide(this.ball, this.flappy, function(ball, flappy) {
	        // ... collision code ...
	        //debugger;
	    }, function(ball, flappy) {
	      // if this returns false, then the collision is ignored, so return the value
	      // of player.body.moves to make non-moving sprites also ignore collision
	        //debugger;
	        console.log("collision");
	      return false;
	});
	 this.game.physics.arcade.collide(this.flappy, this.ball, function(flappy, ball) {
	        // ... collision code ...
	        //debugger;
	    }, function(flappy, ball) {
	      // if this returns false, then the collision is ignored, so return the value
	      // of player.body.moves to make non-moving sprites also ignore collision
	        //debugger;
	        console.log("collision");
	      return false;
	});*/

}

LarryPong.prototype.setBall = function(){
	this.super.setBall.call(this);
	this.popLarry();	
}

LarryPong.prototype.goal = function() {
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
	this.larrys.push(new LarryHead(this.game,
		this.playground.get(
			this.game.rnd.integerInRange(0,this.playground.numberWidthCase-1),
			this.game.rnd.integerInRange(0, this.playground.numberHeightCase-1))));
}