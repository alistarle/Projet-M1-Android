function TimerOgre(pong,rate){
	Timer.call(this, pong,rate);
}


TimerOgre.prototype = Object.create(Timer.prototype);
TimerOgre.prototype.constructor = TimerOgre;


TimerOgre.prototype.execute = function(){
	this.pong.runners.push(new Ogre(this.pong,'right',this.pong.playground));
	this.pong.runners.push(new Ogre(this.pong,'left',this.pong.playground));
}