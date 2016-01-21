function Peon(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'peon',200);
	this.myAnimations = {
        'walkright': this.animations.add('walkright', [0, 1], true),
        'walkleft': this.animations.add('walkleft', [0, 1], true),
        'walkup': this.animations.add('walkup', [2, 5], true),
        'walkdown': this.animations.add('walkdown', [3, 4], true)
    };
    this.animations.play('walkdown', 3, true);
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