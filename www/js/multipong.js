function MultiPong(game,modeControle){

	  Pong.apply(this,arguments);

	  this.accumulateTimeMultiPong = 0; 
	  this.timePopBall = 600;
}
MultiPong.prototype = $.extend(true, {}, Pong.prototype);  
MultiPong.prototype.super = Pong.prototype;     




MultiPong.prototype.update = function(){
	
	 this.super.update.call(this);
	 this.doMultiPongUpdate();
}


//update propre au mode
MultiPong.prototype.doMultiPongUpdate = function(){
	if(this.ballReleased){
		this.accumulateTimeMultiPong += this.game._deltaTime;
		if(this.accumulateTimeMultiPong > this.timePopBall){
			this.popNewBall();
			this.accumulateTimeMultiPong -= this.timePopBall;
		}
	}
}


MultiPong.prototype.popNewBall = function(){
	console.log("New ball !");
}




MultiPong.prototype.setBall = function(){
	this.super.setBall.call(this);
	this.resetMultiPong();
}



MultiPong.prototype.resetMultiPong = function(){
	this.accumulateTimeMultiPong = 0;

}
