function FakeBallsPong(mode,nbPoints){

	  Pong.apply(this,arguments);

		this.tabFakeBalls=[];
		this.tabEmitters=[];
		this.cpt=0;
		this.accumulateTimeBall =0;
   		this.timeStartBall = 2000;

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
	this.checkgoalsFakeBalls();

}

FakeBallsPong.prototype.createFakeBall = function(){
	var fakeBall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'fakeBall');
    this.game.physics.arcade.enable(fakeBall);
    fakeBall.anchor.setTo(0.5,0.5);
    fakeBall.body.bounce.setTo(1, 1);
    fakeBall.body.collideWorldBounds = true;
    fakeBall.tint= this.ball.tint;
    fakeBall.visible = true;

    return fakeBall;
}

FakeBallsPong.prototype.initFakeBalls = function(){
	console.log("OKOKOK");
	for(var i = 0; i<this.tabFakeBalls.length;i++){
		this.tabFakeBalls[i].body=null;
		this.tabFakeBalls[i].destroy();
		this.tabEmitters[i].destroy();
	}

	this.tabFakeBalls=[];this.tabEmitters=[];


}

FakeBallsPong.prototype.doFakeBallUpdate = function(){
	this.determineIfFakeBall();
	if(this.tabFakeBalls.length>0){
	for(var i = 0; i<this.tabFakeBalls.length;i++){
		this.multiTrail(this.tabEmitters[i],this.tabFakeBalls[i]);
	}

}
}

FakeBallsPong.prototype.multiTrail = function(_emitter,_ball) {	
    var px = _ball.body.velocity.x;
    var py = _ball.body.velocity.y;

    px *= -1;
    py *= -1;

    _emitter.emitX = _ball.x;
    _emitter.emitY = _ball.y;

    _emitter.minParticleSpeed.set(px, py);
    _emitter.maxParticleSpeed.set(px, py);
}

FakeBallsPong.prototype.trail = function() {
	this.super.trail.call(this);
}

FakeBallsPong.prototype.colorMultiEmitter = function(_color,_emitter) {
    _emitter.forEach(function(particle) {
        particle.tint = _color;
    });
}


FakeBallsPong.prototype.checkgoalsFakeBalls = function(){
	if(!this.ballReleased){
		this.initFakeBalls();
	}
}


FakeBallsPong.prototype.createEmitter = function(){
	var emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
    emitter.makeParticles('ball');
    this.colorMultiEmitter(this.ball.tint,emitter);
    emitter.gravity = 200;
    emitter.setAlpha(1, 0, 20);
    emitter.setScale(1, 0, 1, 0, 400);

    emitter.start(false, 30, 5);

    this.tabEmitters.push(emitter);
}

FakeBallsPong.prototype.determineIfFakeBall = function(){
	    if(this.ballReleased){
        this.accumulateTimeBall += this.game._deltaTime;
        if(this.accumulateTimeBall > this.timeStartBall){
            this.doFakeBall();
            this.accumulateTimeBall -= this.timeStartBall;
        }
    }
}

FakeBallsPong.prototype.doFakeBall = function(){
	if(this.tabFakeBalls.length < 10){
		this.cpt++;
    var fakeBall = this.createFakeBall();
    this.tabFakeBalls.push(fakeBall);
    this.createEmitter();


    fakeBall.body.velocity.x = this.ballSpeed;
    fakeBall.body.velocity.y = -this.ballSpeed;
}
}
