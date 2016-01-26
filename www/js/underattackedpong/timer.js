function Timer(pong,rate){
	this.pong = pong;
	this.game = pong.game;
	this.accum = 0;
	this.rate = rate;
}


Timer.prototype.update = function(){
	this.accum += this.game._deltaTime;
	if(this.accum > this.rate){
		this.execute();
		this.accum -= this.rate;
	}
}

Timer.prototype.execute = function(){
	console.log("Execute empty");
}

Timer.prototype.reset = function(){
	this.accum = 0;
}