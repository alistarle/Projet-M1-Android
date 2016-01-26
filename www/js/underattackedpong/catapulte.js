function Catapulte(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'catapulte',1.5,1.5);
	this.myAnimations = {
        'walkright': this.animations.add('walkright',[2,7], true),
        'walkleft': this.animations.add('walkleft', [2,7], true),
        'walkup': this.animations.add('walkup', [0,5], true),
        'walkdown': this.animations.add('walkdown', [4,9], true),
        'dead': this.animations.add('dead',[0],false),
        'looktop': this.animations.add('looktop',[0],false),
        'lookbot':this.animations.add('lookbot',[4],false),
        'firetop':this.animations.add('firetop',[10,15],false),
        'firebot':this.animations.add('firebot',[14,19],false),
        'firetopreverse':this.animations.add('firetopreverse',[15,10],false),
        'firebotreverse':this.animations.add('firebotreverse',[19,14],false),

    };

    this.accum = 0;
    this.fireRate = 2000;
    this.shootAnimationDuration = 4000;
    this.shot = false;
}
Catapulte.prototype = Object.create(Runner.prototype);
Catapulte.prototype.constructor = Catapulte;


Catapulte.prototype.getPattern = function(){
	if(this.direction == 'left'){
		return ['goLeft','goLeft','goLeft','goLeft','goLeft','shoot'];
	}
	else{
		return ['goRight','goRight','shoot'];
	}
}
Catapulte.prototype.getHealth = function(){
	return 6;
}

Catapulte.prototype.getSpeed = function(){
	return 50;
}

Catapulte.prototype.shoot = function(){
	this.stop();
	if(!this.shot){
		this.playLookTarget();
	}
	

	this.accum += this.game._deltaTime;
	if(this.accum > this.fireRate && !this.shot){
		this.fire();
	}
	if(this.accum > this.shootAnimationDuration){
		this.shot = false;
		this.accum = 0;
		return true;
	}
	return false;
}
Catapulte.prototype.fire = function(){
	console.log("fire catapulte ! ");
	this.playFire();
	this.animations.currentAnim.onComplete.add(function (sprite,anim) {
		console.log('animation fire complete');
		var target = this.getTarget();
		this.shootTarget(target);
		this.playReverseFire();
		this.animations.currentAnim.onComplete.add(function (sprite,anim) {
			console.log('animation reversefire complete');
			this.playLookTarget();
		}, this);
	}, this);
}


Catapulte.prototype.playLookTarget = function(){
	if(this.direction == 'left'){
		this.play('lookbot');
	}
	else{
		this.play('looktop');
	}
}


Catapulte.prototype.getTarget = function(){
	
	if(this.direction == "left"){
		return this.pong.playerBet;
	}
	else{
		return this.pong.computerBet;
	}
}

Catapulte.prototype.shootTarget = function(target){
	var proj = this.getProjectile();
	proj.x = this.x;
	proj.y = this.y;
	
}

Catapulte.prototype.getProjectile = function(){
	var proj = this.game.add.sprite(0, 0, 'ball');
	proj.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(proj);
	return proj;
}


Catapulte.prototype.playFire = function(){
	if(this.direction == "left"){
		this.play('firebot');
	}
	else{
		this.play('firetop');
	}
}
Catapulte.prototype.playReverseFire = function(){
	if(this.direction == "left"){
		this.play('firebotreverse');
	}
	else{
		this.play('firetopreverse');
	}
}



