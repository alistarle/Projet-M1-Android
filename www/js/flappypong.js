function FlappyPong(mode, nbPoints){

	  Pong.apply(this,arguments);

	  //flappy stuff
	  this.accumulateTimeFlappy = 0;//accumulateur de temps dedie au flappy
	  this.capTimeFlappy = 2500;//periode au bout de laquelle l'event se passe

	  //dedie a l'animation
	  this.accumulateTimeAnimationFlappy = 0; // accumulateur de temps dedie a l'arret de l'anim
	  this.capTimeFlappyAnimation = 1100;//temps d'animation
	  this.animatingFlappy = false;//booleen qui decrit l'etat de la situation
	  this.capAnimation1 = 500;//separateur d'anim
	  this.capAnimation2 = 600;
}
FlappyPong.prototype = $.extend(true, {}, Pong.prototype);
FlappyPong.prototype.super = Pong.prototype;


FlappyPong.prototype.create = function(){
	this.super.create.call(this);
	this.flappy = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flappy');
	this.game.physics.arcade.enable(this.flappy);
	this.flappy.visible = false;
	this.flappy.anchor.setTo(0.5,0.5);
	this.flappy.body.moves = false;



	//this.flappy.body.setSize()
	//this.ball.addChild(this.flappy);


}

FlappyPong.prototype.connectToServer = function(ip) {
  this.super.connectToServer.call(this);

}

FlappyPong.prototype.preload = function(){
	this.super.preload.call(this);
	this.game.load.image('flappy', 'assets/Flappy_Bird_sprite.png');

}

FlappyPong.prototype.update = function(){
	 this.super.update.call(this);
	 this.doFlappyUpdate();
	 if(this.animatingFlappy) this.recenterFlappy();

	 this.game.physics.arcade.collide(this.ball, this.flappy, function(ball, flappy) {
	        // ... collision code ...
	        //debugger;
	    }, function(ball, flappy) {
	      // if this returns false, then the collision is ignored, so return the value
	      // of player.body.moves to make non-moving sprites also ignore collision
	        //debugger;
	      return false;
	});
	 this.game.physics.arcade.collide(this.flappy, this.ball, function(flappy, ball) {
	        // ... collision code ...
	        //debugger;
	    }, function(flappy, ball) {
	      // if this returns false, then the collision is ignored, so return the value
	      // of player.body.moves to make non-moving sprites also ignore collision
	        //debugger;
	      return false;
	});

}


//update propre au mode
FlappyPong.prototype.doFlappyUpdate = function(){
	if(! this.animatingFlappy){
		this.determineIfFlappy();
	}
	else{
		this.animateFlappy();
	}
}



//recentre le flappy sur la balle
FlappyPong.prototype.recenterFlappy = function(){
	this.flappy.x = this.ball.x;
	this.flappy.y = this.ball.y;
}


//s'occupe dans lancer l'event
FlappyPong.prototype.determineIfFlappy = function(){
	if(this.ballReleased){
		this.accumulateTimeFlappy += this.game._deltaTime;
		if(this.accumulateTimeFlappy > this.capTimeFlappy){
			this.doFlappy();
			this.accumulateTimeFlappy -= this.capTimeFlappy;
		}
	}
}



FlappyPong.prototype.setBall = function(){
	this.super.setBall.call(this);
	this.resetFlappy();
}



FlappyPong.prototype.resetFlappy = function(){
	this.animatingFlappy = false;
	this.flappy.visible = false;
	this.ball.alpha = 1;
	this.accumulateTimeFlappy = 0;
	this.accumulateTimeAnimationFlappy = 0;

}

//////////////////////////////////////
/////////////////////////////Animation
/////////////////////////////////////
//debut de l'animation
FlappyPong.prototype.doFlappy = function(){
	//	Math.random();
	this.accumulateTimeAnimationFlappy = 0;
	this.animatingFlappy = true;
	this.ball.alpha = 255;
	this.flappy.visible = true;
	this.ball.body.velocity.x=0;
	this.ball.body.velocity.y=0;

}
//fin de l'animation
FlappyPong.prototype.stopFlappy = function(){
	this.animatingFlappy = false;
	this.flappy.visible = false;
	this.ball.alpha = 1;
}
//animation en cours
FlappyPong.prototype.animateFlappy = function(){
	this.accumulateTimeAnimationFlappy += this.game._deltaTime;
	if(this.accumulateTimeAnimationFlappy > this.capTimeFlappyAnimation){
		this.stopFlappy();
	}
	else{
		if(this.isAnimPart1())	this.animatePart1();
		else if(this.isAnimPart2()) this.animatePart2();
		else this.animatePart3();
	}
}

FlappyPong.prototype.animatePart1 = function(){
	this.flappy.angle += this.game.rnd.realInRange(18, 22);
  //SEND PACKET ANGLE
	this.recenterFlappy();
}
FlappyPong.prototype.animatePart2 = function(){
	;
}
FlappyPong.prototype.animatePart3 = function(){
	this.flappy.angle -= 2;
	this.ball.body.velocity.x += Math.cos((this.flappy.angle-90)*(Math.PI/180))*50;
	this.ball.body.velocity.y += Math.sin((this.flappy.angle-90)*(Math.PI/180))*50;
	//debugger;
}

FlappyPong.prototype.isAnimPart1 = function(){
	return this.accumulateTimeAnimationFlappy < this.capAnimation1;
}
FlappyPong.prototype.isAnimPart2 = function(){
	return this.accumulateTimeAnimationFlappy < this.capAnimation2;
}
