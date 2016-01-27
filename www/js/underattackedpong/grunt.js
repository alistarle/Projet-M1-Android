function Grunt(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'grunt',1.5,1.5);
	this.myAnimations = {
        'walkright': this.animations.add('walkright',[2,7,12,17,22], true),
        'walkleft': this.animations.add('walkleft', [2,7,12,17,22], true),
        'walkup': this.animations.add('walkup', [0,5,10,15,20,25], true),
        'walkdown': this.animations.add('walkdown', [4,9,14,19,24,29], true),
        'dead': this.animations.add('dead',[45,47,49],false)
    };
}
Grunt.prototype = Object.create(Runner.prototype);
Grunt.prototype.constructor = Grunt;


Grunt.prototype.getPattern = function(){
	if(this.direction == 'left'){
		return ['goLeft'];
	}
	else{
		return ['goRight'];
	}
}
Grunt.prototype.getHealth = function(){
	return 2;
}

Grunt.prototype.getSpeed = function(){
	return 200;
}
Grunt.prototype.getScore = function(){
	return 6;
}