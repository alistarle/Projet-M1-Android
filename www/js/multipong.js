function MultiPong(mode,nbPoints){

	Pong.apply(this,arguments);
	this.accumulateTimeMultiPong = 0; 
	this.timePopBall = 600;
	this.MAX_BALLS = 3;
	this.balls = [];
	this.tabEmitters=[];
}
MultiPong.prototype = $.extend(true, {}, Pong.prototype);  
MultiPong.prototype.super = Pong.prototype;     



MultiPong.prototype.ia = function(){
	var min = this.balls[0].body.y;
	var ball = this.balls[0];
	for(var i = 0; i<this.balls.length;i++){
		if(min>this.balls[i].body.y){
			min = this.balls[i].body.y;
			ball= this.balls[i];
		}
	}
	if(this.difficulte==0){
		if (this.computerBet.x - ball.x < -15) {
			this.computerBet.body.velocity.x = this.computerBetSpeed*1.5;
		} else if (this.computerBet.x - ball.x > 15) {
			this.computerBet.body.velocity.x = -this.computerBetSpeed*1.5;
		} else {
			this.computerBet.body.velocity.x = 0;
		}
	}
		if(this.difficulte==1){
		if (this.computerBet.x - ball.x < -15) {
			this.computerBet.body.velocity.x = this.computerBetSpeed*2;
		} else if (this.computerBet.x - ball.x > 15) {
			this.computerBet.body.velocity.x = -this.computerBetSpeed*2;
		} else {
			this.computerBet.body.velocity.x = 0;
		}
	}
		if(this.difficulte==2){
		if (this.computerBet.x - ball.x < -15) {
			this.computerBet.body.velocity.x = this.computerBetSpeed*2.5;
		} else if (this.computerBet.x - ball.x > 15) {
			this.computerBet.body.velocity.x = -this.computerBetSpeed*2.5;
		} else {
			this.computerBet.body.velocity.x = 0;
		}
	}
}

	MultiPong.prototype.update = function(){

		this.super.update.call(this);
		this.doMultiPongUpdate();
		this.checkWin();

	}

	MultiPong.prototype.create = function() {
		this.super.create.call(this);
		this.balls = [this.ball];
		this.tabEmitters = [this.emitter];
	}

//update propre au mode
MultiPong.prototype.doMultiPongUpdate = function(){
	if(this.ballReleased){
		this.accumulateTimeMultiPong += this.game._deltaTime;
		if(this.accumulateTimeMultiPong > this.timePopBall){
			if(this.balls.length < this.MAX_BALLS){
				this.addBall();
			}
			this.accumulateTimeMultiPong -= this.timePopBall;
		}


	}


	for(var i = 0; i<this.balls.length;i++){
		this.multiTrail(this.tabEmitters[i],this.balls[i]);
	}


	

}

MultiPong.prototype.collideCheck = function(){
	this.balls.forEach(function(e1,array){

		this.game.physics.arcade.collide(e1, this.playerBet, this.ballHitsBet, null, this);
		this.game.physics.arcade.collide(e1, this.computerBet, this.ballHitsBet, null, this);
		this.balls.forEach(function(e2,array,e1){
			this.game.physics.arcade.collide(e1, e2, function(){}, null, this);
		},this);
	},this);

}

MultiPong.prototype.ballHitsBet = function(_ball, _bet){
	this.super.ballHitsBet.call(this,_ball,_bet);
	_ball.tint=_bet.tint;
	for(var i = 0 ; i < this.balls.length ; i++){
		this.colorMultiEmitter(this.balls[i].tint,this.tabEmitters[i]);
	}
}




MultiPong.prototype.setBall = function(){
	this.super.setBall.call(this);
	this.resetMultiPong();
}

MultiPong.prototype.checkIfGoal = function(){
	for(var i = 0 ; i < this.balls.length ; i++){
		var ball = this.balls[i];
		if (ball.y < 100) {
			this.goalTop();
			this.reinitGame();
		} else if (ball.y > this.game.height - 100) {
			this.goalBot();
			this.reinitGame();
		}
	}
}


MultiPong.prototype.resetMultiPong = function(){
	this.accumulateTimeMultiPong = 0;

}


MultiPong.prototype.addBall = function(){
	var newBall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
	newBall.tint = this.ball.tint;
	newBall.anchor.setTo(0.5, 0.5);
	this.game.physics.enable(newBall, Phaser.Physics.ARCADE);
	newBall.body.velocity.x = -this.balls[this.balls.length-1].body.velocity.x;
	newBall.body.velocity.y = -this.balls[this.balls.length-1].body.velocity.y;
	newBall.body.collideWorldBounds = true;
	newBall.body.bounce.setTo(1, 1);
	this.balls.push(newBall);
	this.createEmitter(newBall);
}

MultiPong.prototype.reinitGame = function(){
	this.super.reinitGame.call(this);
	for(var i = 1 ; i < this.balls.length ; i++){
		this.balls[i].destroy();
		this.tabEmitters[i].destroy();
	}
	this.balls = [this.ball];
	this.tabEmitters = [this.emitter];
	
}





MultiPong.prototype.multiTrail = function(_emitter,_ball) {	
	var px = _ball.body.velocity.x;
	var py = _ball.body.velocity.y;

	px *= -1;
	py *= -1;

	_emitter.emitX = _ball.x;
	_emitter.emitY = _ball.y;

	_emitter.minParticleSpeed.set(px, py);
	_emitter.maxParticleSpeed.set(px, py);
}

MultiPong.prototype.createEmitter = function(newBall){
	var emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
	emitter.makeParticles('ball');
	this.colorMultiEmitter(newBall.tint,emitter);
	emitter.gravity = 200;
	emitter.setAlpha(1, 0, 20);
	emitter.setScale(1, 0, 1, 0, 400);

	emitter.start(false, 30, 5);

	this.tabEmitters.push(emitter);
}
MultiPong.prototype.colorMultiEmitter = function(_color,_emitter) {
	_emitter.forEach(function(particle) {
		particle.tint = _color;
	});
}