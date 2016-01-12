function LarryPong(game,modeControle){

	  Pong.apply(this,arguments);

}

LarryPong.prototype = $.extend(true, {}, Pong.prototype);  
LarryPong.prototype.super = Pong.prototype;

LarryPong.prototype.preload = function(){
	this.super.preload.call(this);
	this.game.load.image('tile', 'assets/tile.png');
	this.game.load.spritesheet('larryhead', 'assets/larryhead.png',48,50,6);
	this.game.load.spritesheet('larrybody', 'assets/larrybody.png',36,34,4);
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
	//this.game.debug.body(this.potion.self);
	/*for(var i = 0 ; i < this.larrys.length ; i++){
		this.game.debug.body(this.larrys[i].self);
	}*/
	//this.game.debug.body(this.playground.get(0,0));

}

LarryPong.prototype.pushLarry = function(larry){
	this.larrys.push(larry);
}

LarryPong.prototype.update = function(){
	
	this.game.physics.arcade.enable(this.larrys[0]);
	this.game.physics.arcade.enable(this.potion);
	 this.super.update.call(this);
	 this.playground.update();
	 this.larrys.forEach(function(e,i,tab){e.update();});

	 //this.game.physics.arcade.collide(this.larrys[0], this.ball,function(){debugger;}, null, this);

	 /*for(var i = 0 ; i < this.playground.length ; i++){
		for(var j = 0 ; j < this.playground[i].length ; j++){
			this.game.physics.arcade.collide(this.larrys[0], this.playground[i][j], function(e1, e2) {
			        // ... collision code ...
			        debugger;
			    }, function(e1, e2) {
			      // if this returns false, then the collision is ignored, so return the value
			      // of player.body.moves to make non-moving sprites also ignore collision
			        debugger;
			        console.log("collision");
			      return false;
			},this);
		}
	}*/
	    //this.game.physics.arcade.collide(this.ball, this.larrys[0].self, function(){debugger;}, null, this);

	/*this.game.physics.arcade.collide(this.larrys[0].self, this.potion.self, function(e1, e2) {
			        // ... collision code ...
			        debugger;
			    }, function(e1, e2) {
			      // if this returns false, then the collision is ignored, so return the value
			      // of player.body.moves to make non-moving sprites also ignore collision
			        debugger;
			        console.log("collision");
			      return false;
			},this);
	 */

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
	this.larrys.push(new LarryHead(
		this,
		this.playground.get(
			this.game.rnd.integerInRange(0,this.playground.numberWidthCase-1),
			this.game.rnd.integerInRange(0, this.playground.numberHeightCase-1)))
	);
}