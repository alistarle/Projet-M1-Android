function TimerCatapulte(pong,rate){
	Timer.call(this, pong,rate);
}


TimerCatapulte.prototype = Object.create(Timer.prototype);
TimerCatapulte.prototype.constructor = TimerCatapulte;


TimerCatapulte.prototype.execute = function(){
	this.pong.runners.push(new Catapulte(this.pong,'right',this.pong.playground));
	this.pong.runners.push(new Catapulte(this.pong,'left',this.pong.playground));
}