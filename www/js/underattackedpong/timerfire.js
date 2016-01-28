function TimerFire(pong,rate){
	Timer.call(this, pong,rate);
	this.speedCannonBall = 800;
}

TimerFire.prototype = Object.create(Timer.prototype);
TimerFire.prototype.constructor = TimerFire;


TimerFire.prototype.execute = function(){
	this.createCannonBall(this.pong.playerBet.x,this.pong.playerBet.y-this.pong.playerBet.height+20,-this.speedCannonBall,this.pong.playerBet);
	this.createCannonBall(this.pong.computerBet.x,this.pong.computerBet.y,this.speedCannonBall,this.pong.computerBet);
}
TimerFire.prototype.createCannonBall = function(x,y,velocityY,player){
	var cannonBall = this.game.add.sprite(x,y, 'ball');
	cannonBall.anchor.setTo(0.5, 0.5);
    cannonBall.tint = 0x000000;
    this.game.physics.arcade.enable(cannonBall);
    cannonBall.body.width = (cannonBall.width * 3)/ 5;
    cannonBall.body.height = (cannonBall.height * 4) / 5;
    cannonBall.body.velocity.y = velocityY;
    cannonBall.pong = this.pong;
    cannonBall.player = player;
    this.pong.addCannonBall(cannonBall);
}
