function TimerCatapulte(pong,rate){
	Timer.call(this, pong,rate);
}


TimerCatapulte.prototype = Object.create(Timer.prototype);
TimerCatapulte.prototype.constructor = TimerCatapulte;


TimerCatapulte.prototype.execute = function(){
	console.log("Execute empty TimerCatapulte");
}