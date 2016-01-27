function Ogre(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'ogre',1.5,1.5);
	this.myAnimations = {
        'walkright': this.animations.add('walkright',[2,7,12,17,22], true),
        'walkleft': this.animations.add('walkleft', [2,7,12,17,22], true),
        'walkup': this.animations.add('walkup', [0,5,10,15,20,25], true),
        'walkdown': this.animations.add('walkdown', [4,9,14,19,24,29], true),
        'dead': this.animations.add('dead',[45,47,49],false),
        'stupid':this.animations.add('stupid',[0,1,2,3,4,3,2,1],true)
    };

    //stupid pattern
    this.accum = 0;
    this.rate = 4000;
    this.isStupid = false;
}
Ogre.prototype = Object.create(Runner.prototype);
Ogre.prototype.constructor = Ogre;


Ogre.prototype.getPattern = function(){
	if(this.direction == 'left'){
		return ['goLeft','goLeft','goLeft','goLeft','goLeft','lookStupid'];
	}
	else{
		return ['goRight','goRight','goRight','goRight','goRight','lookStupid'];
	}
}

Ogre.prototype.lookStupid = function(){
	this.stop();
	this.isStupid = true;
	this.play('stupid',3);
	this.accum += this.game._deltaTime;
	if(this.accum > this.rate){
		this.isStupid = false;
		this.accum = 0;
		return true;
	}
	return false;
}


Ogre.prototype.getHealth = function(){
	return 4;
}

Ogre.prototype.getSpeed = function(){
	return 400;
}

Ogre.prototype.getScore = function(){
	return 8;
}