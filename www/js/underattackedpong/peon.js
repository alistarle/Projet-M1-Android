function Peon(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'peon',1,1);
	this.myAnimations = {
        'walkright': this.animations.add('walkright',[2,7,12,17,22], true),
        'walkleft': this.animations.add('walkleft', [2,7,12,17,22], true),
        'walkup': this.animations.add('walkup', [2, 5], true),
        'walkdown': this.animations.add('walkdown', [3, 4], true),
        'dead': this.animations.add('dead',[55,57,59],false)
    };
    //this.animations.play('walkright', 3, true);
    /*this.body.width = (this.width * 1)/ 5;
    this.body.height = (this.height * 1) / 5;*/
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

Peon.prototype.getHealth = function(){
	return 1;
}

Peon.prototype.getSpeed = function(){
	return 250;
}