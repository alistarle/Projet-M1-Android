function TimerGrunt(pong,rate){
	Timer.call(this, pong,rate);
}


TimerGrunt.prototype = Object.create(Timer.prototype);
TimerGrunt.prototype.constructor = TimerGrunt;


TimerGrunt.prototype.execute = function(){
	this.pong.runners.push(new Grunt(this.pong,'right',this.pong.playground));
	this.pong.runners.push(new Grunt(this.pong,'left',this.pong.playground));
}