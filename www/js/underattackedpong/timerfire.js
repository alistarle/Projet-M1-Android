function TimerFire(pong,rate){
	Timer.call(this, pong,rate);
	this.speedCannonBall = 700;
}

TimerFire.prototype = Object.create(Timer.prototype);
TimerFire.prototype.constructor = TimerFire;


TimerFire.prototype.execute = function(){
	this.createCannonBall(this.pong.playerBet.x,this.pong.playerBet.y-this.pong.playerBet.height+20,-this.speedCannonBall);
	this.createCannonBall(this.pong.computerBet.x,this.pong.computerBet.y,this.speedCannonBall);
}
TimerFire.prototype.createCannonBall = function(x,y,velocityY){
	var cannonBall = this.game.add.sprite(x,y, 'ball');
	cannonBall.anchor.setTo(0.5, 0.5);
    cannonBall.tint = 0x000000;
    this.game.physics.arcade.enable(cannonBall);
    cannonBall.body.width = (cannonBall.width * 2)/ 5;
    cannonBall.body.height = (cannonBall.height * 2) / 5;
    cannonBall.body.velocity.y = velocityY;
    cannonBall.pong = this.pong;
    this.pong.cannonBalls.push(cannonBall);
}
