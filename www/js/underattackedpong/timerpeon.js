function TimerPeon(pong,rate){
	Timer.call(this, pong,rate);
}

TimerPeon.prototype = Object.create(Timer.prototype);
TimerPeon.prototype.constructor = TimerPeon;


TimerPeon.prototype.execute = function(){
	this.pong.runners.push(new Peon(this.pong,'right',this.pong.playground));
	this.pong.runners.push(new Peon(this.pong,'left',this.pong.playground));
}
