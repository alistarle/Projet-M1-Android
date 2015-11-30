function LarryPong(game,modeControle){

	  Pong.apply(this,arguments);
	  //larry's playground
}

LarryPong.prototype = $.extend(true, {}, Pong.prototype);  
LarryPong.prototype.super = Pong.prototype;

LarryPong.prototype.create = function(){
	/*this.flappy = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flappy');
	this.game.physics.arcade.enable(this.flappy);
	this.flappy.visible = false;
	this.flappy.anchor.setTo(0.5,0.5);
	this.flappy.body.moves = false;*/

	

	//this.flappy.body.setSize()
	//this.ball.addChild(this.flappy);

	this.numberWidthCase = 10;
	this.numberHeightCase = 10;
	this.widthPlayground = this.game.width;
	this.heightPlayground = this.game.height/4;

	this.widthCase = this.widthPlayground / this.numberWidthCase;
	this.heightCase = this.heightPlayground / this.numberHeightCase;

	this.xPlayground = 0;
	this.yPlayground = (this.game.height / 2) - (this.heightPlayground / 2);

	var scaleW = this.widthCase / 20;
	var scaleH = this.heightCase / 20;
	

	this.playground = {};
	for(var i = 0 ; i < this.numberWidthCase ; i++){
		for(var j=0 ; j < this.numberHeightCase ; j++){
			var tile = this.game.add.sprite(0,0,'tile');
			tile.anchor.setTo(0.5, 0.5);
			tile.scale.setTo(scaleW,scaleH);
			this.playground[i.toString()+" "+j.toString()] = tile;
		}
		
	}
	for(var i = 0 ; i < this.numberWidthCase ; i++){
		for(var j = 0 ; j < this.numberHeightCase ; j++){
			this.playground[i+" "+j].top = this.playground[i+" "+(j-1)];
			this.playground[i+" "+j].bot = this.playground[i+" "+(j+1)];
			this.playground[i+" "+j].left = this.playground[(i-1)+" "+j];
			this.playground[i+" "+j].right = this.playground[(i+1)+" "+j];
			this.playground[i+" "+j].posY = j;
			this.playground[i+" "+j].posX = i;
		}
	}
	this.placementPlayground();
	this.super.create.call(this);


}

LarryPong.prototype.placementPlayground = function(){
	/*for(var i = 0 ; i < this.numberWidthCase*this.numberHeightCase ; i++){
		console.log()
	}*/
debugger;
	for(var i = 0 ; i < this.numberWidthCase ; i++){
		for(var j = 0 ; j < this.numberHeightCase ; j++){
			this.playground[i+" "+j].x = this.xPlayground + this.widthCase/2 + i * this.widthCase;
			this.playground[i+" "+j].y = this.yPlayground + this.heightCase/2 + j * this.heightCase;
											
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