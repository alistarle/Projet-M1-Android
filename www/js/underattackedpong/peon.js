function Peon(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'peon');
	this.speed = 200;
	this.health = 1;
	this.myAnimations = {
        'walkright': this.animations.add('walkright',[2,7,12,17,22], true),
        'walkleft': this.animations.add('walkleft', [2,7,12,17,22], true),
        'walkup': this.animations.add('walkup', [2, 5], true),
        'walkdown': this.animations.add('walkdown', [3, 4], true),
        'dead': this.animations.add('dead',[50,51,52,53,54,55],false)
    };
    //this.animations.play('walkright', 3, true);
}

Peon.prototype = Object.create(Runner.prototype);
Peon.prototype.constructor = Peon;


Peon.prototype.getPattern = function(){
	if(this.direction == 'left'){
		return ['goLeft'];
	}
	else{
		return ['goRight'];
	}
}
Peon.prototype.patternBidon = function(){
	console.log("mdr");
}