function FakeBallsPong(game,modeControle){

	  Pong.apply(this,arguments);

	  this.tabFakeBalls;
}
FakeBallsPong.prototype = $.extend(true, {}, Pong.prototype);  
FakeBallsPong.prototype.super = Pong.prototype;     


FakeBallsPong.prototype.create = function(){
	this.super.create.call(this);
}

FakeBallsPong.prototype.preload = function(){
	this.super.preload.call(this);
	this.game.load.image('fakeBall','assets/ball.png');


}

FakeBallsPong.prototype.update = function(){
	this.super.update.call(this);
	this.doFakeBallUpdate();

}

FakeBallsPong.prototype.doFakeBallUpdate = function(){

}

FakeBallsPong.prototype.determineIfFakeBall = function(){
	    if(this.ballReleased){
        this.accumulateTimeBonusMalus += this.game._deltaTime;
        if(this.accumulateTimeBonusMalus > this.timeStartBonusMalus){
            this.doFakeBall();
            this.accumulateTimeBonusMalus -= this.timeStartBonusMalus;
        }
    }
}

FakeBallsPong.prototype.doFakeBall = function(){
    var bonusMalus = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'fakeBall');
    this.game.physics.arcade.enable(bonusMalus);
    bonusMalus.anchor.setTo(0.5,0.5);
    bonusMalus.tint=this.ball.tint;

    this.ball.body.velocity.x = this.ballSpeed;
    this.ball.body.velocity.y = -this.ballSpeed;
}


FakeBallsPong.prototype.resetFlappy = function(){
}
