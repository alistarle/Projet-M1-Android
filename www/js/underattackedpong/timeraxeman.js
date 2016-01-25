function TimerAxeman(pong,rate){
	Timer.call(this, pong,rate);
}

TimerAxeman.prototype = Object.create(Timer.prototype);
TimerAxeman.prototype.constructor = TimerAxeman;


TimerAxeman.prototype.execute = function(){
	this.pong.runners.push(new Axeman(this.pong,'right',this.pong.playground));
	this.pong.runners.push(new Axeman(this.pong,'left',this.pong.playground));
}
