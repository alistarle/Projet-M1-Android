function Axeman(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'axeman',1.25,1.25);
	this.health = 1;
	this.speed = 225;
	this.myAnimations = {
        'walkright': this.animations.add('walkright',[2,7,12,17,22], true),
        'walkleft': this.animations.add('walkleft', [2,7,12,17,22], true),
        'walkup': this.animations.add('walkup', [0,5,10,15,20,25], true),
        'walkdown': this.animations.add('walkdown', [4,9,14,19,24,29], true),
        'dead': this.animations.add('dead',[45,47,49],false)
    };
    this.direction2 = "goBot";

}
Axeman.prototype = Object.create(Runner.prototype);
Axeman.prototype.constructor = Axeman;


Axeman.prototype.getPattern = function(){
	if(this.direction == 'left'){
		return ['goLeft','goTop','goTop','goLeft','goBot','goBot'];
	}
	else{
		return ['goRight','goBot','goBot','goRight','goTop','goTop'];
	}
}

Axeman.prototype.getHealth = function(){
	return 1;
}

Axeman.prototype.getSpeed = function(){
	return 500;
}
Axeman.prototype.getScore = function(){
	return 8;
}
Axeman.prototype.getDamage = function(){
	return 10;
}