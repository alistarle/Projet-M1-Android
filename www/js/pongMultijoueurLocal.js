function PongMultiLocalNormal(game, modeControle) {
    Pong.apply(this, arguments);
}

PongMultiLocalNormal.prototype = $.extend(true, {}, Pong.prototype);
PongMultiLocalNormal.prototype.super = Pong.prototype;
var pointers = [];

PongMultiLocalNormal.prototype.create = function() {
    this.super.create.call(this);

    // this.game.input.addPointer();
    //this.game.input.addPointer();

    pointers = this.game.input.pointers;
}

PongMultiLocalNormal.prototype.preload = function() {
    this.super.preload.call(this);
}

PongMultiLocalNormal.prototype.update = function() {
    //this.super.update.call(this);

    this.trail();

    for (var i = 0; i < pointers.length; i++) {
        if (pointers[i].isDown) {


            if (pointers[i].y >= (this.game.height / 2)) {
                this.playerBet.x = pointers[i].x;
            } else {
                this.computerBet.x = pointers[i].x;
            }
        }
    }

    var playerBetHalfWidth = this.playerBet.width / 2;
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


PongMultiLocalNormal.prototype.render = function() {
    console.log("lol");
    //  Just renders out the pointer data when you touch the canvas
    this.game.debug.pointer(this.game.input.mousePointer);
    this.game.debug.pointer(this.game.input.pointer1);
    this.game.debug.pointer(this.game.input.pointer2);

}
