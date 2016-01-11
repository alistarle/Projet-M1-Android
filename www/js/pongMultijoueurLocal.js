function PongMultiLocalNormal(game, modeControle) {
    Pong.apply(this, arguments);
}

PongMultiLocalNormal.prototype = $.extend(true, {}, Pong.prototype);
PongMultiLocalNormal.prototype.super = Pong.prototype;

FlappyPong.prototype.create = function(){
	this.super.create.call(this);
}

FlappyPong.prototype.preload = function(){
	this.super.preload.call(this);
}

PongMultiLocalNormal.prototype.update = function() {
    //this.super.update.call(this);
    this.trail();
    var playerBetHalfWidth = this.playerBet.width / 2;

    if (this.game.input.y >= (this.game.height / 2)) {
        this.playerBet.x = this.game.input.x;
    } else {
        this.computerBet.x = this.game.input.x;
    }

    if (this.playerBet.x < playerBetHalfWidth) {
        this.playerBet.x = playerBetHalfWidth;
    } else if (this.playerBet.x > this.game.width - playerBetHalfWidth) {
        this.playerBet.x = this.game.width - playerBetHalfWidth;
    }

    if (this.computerBet.x < playerBetHalfWidth) {
        this.computerBet.x = playerBetHalfWidth;
    } else if (this.computerBet.x > this.game.width - playerBetHalfWidth) {
        this.computerBet.x = this.game.width - playerBetHalfWidth;
    }


    //check des collisions
    this.game.physics.arcade.collide(this.ball, this.playerBet, this.ballHitsBet, null, this);
    this.game.physics.arcade.collide(this.ball, this.computerBet, this.ballHitsBet, null, this);
    this.checkGoal();

    //debugger;;
    this.fps.setText('Fps : ' + this.game.time.fps.toString());
}
