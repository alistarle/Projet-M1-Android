function MultiPong(mode,nbPoints){

	  Pong.apply(this,arguments);
	  this.accumulateTimeMultiPong = 0; 
	  this.timePopBall = 600;
	  this.MAX_BALLS = 5;
	  this.balls = [];
}
MultiPong.prototype = $.extend(true, {}, Pong.prototype);  
MultiPong.prototype.super = Pong.prototype;     




MultiPong.prototype.update = function(){
	
	 this.super.update.call(this);
	 this.doMultiPongUpdate();

}

MultiPong.prototype.create = function() {
	this.super.create.call(this);
	this.balls.push(this.ball);
}

//update propre au mode
MultiPong.prototype.doMultiPongUpdate = function(){
	if(this.ballReleased){
		this.accumulateTimeMultiPong += this.game._deltaTime;
		console.log("Le accum est ", this.accumulateTimeMultiPong);
		if(this.accumulateTimeMultiPong > this.timePopBall){
			if(this.balls.length < this.MAX_BALLS){
				this.addBall();
			}
			this.accumulateTimeMultiPong -= this.timePopBall;
		}

	}


	

}

MultiPong.prototype.collideCheck = function(){
	this.collideBalls();
}
MultiPong.prototype.collideBalls = function(){
	
}



MultiPong.prototype.setBall = function(){
	this.super.setBall.call(this);
	this.resetMultiPong();
}



MultiPong.prototype.resetMultiPong = function(){
	this.accumulateTimeMultiPong = 0;

}


MultiPong.prototype.addBall = function(){
	console.log("Add ball");
	var newBall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
	newBall.tint = this.ball.tint;
	newBall.anchor.setTo(0.5, 0.5);
	this.game.physics.enable(newBall, Phaser.Physics.ARCADE);
	newBall.body.velocity.x = -this.balls[this.balls.length-1].body.velocity.x;
	newBall.body.velocity.y = -this.balls[this.balls.length-1].body.velocity.y;
	newBall.body.collideWorldBounds = true;
    newBall.body.bounce.setTo(1, 1);
	this.balls.push(newBall);
}

MultiPong.prototype.goal = function(){
	this.super.goal.call(this);
	for(var i = 1 ; i < this.balls.length ; i++){
		this.balls[i].destroy();
	}
	this.balls.splice(1,this.balls.length-1);
}


