function LarryHead(larrypong, tile) {
    this.larrypong = larrypong;
    this.game = larrypong.game;
    this.playground = this.larrypong.playground;
    this.self = this.game.add.sprite(tile.x, tile.y, 'larryhead');
    this.self.self = this;

    this.larrybody = [];

    this.playground.scaleSpriteToTile(this.self);
    this.scaleW = this.self.scale.x;
    this.scaleH = this.self.scale.y;
    //debugger;
    /*this.scaleW = (tile.width / this.self.width);
    this.scaleH = (tile.height / this.self.height);
    this.self.scale.setTo(this.scaleW, this.scaleH);

debugger;*/
    this.self.anchor.x = 0.5;
    this.self.anchor.y = 0.5;

    this.animations = {
        'walkright': this.self.animations.add('walkright', [0, 1], true),
        'walkleft': this.self.animations.add('walkleft', [0, 1], true),
        'walkup': this.self.animations.add('walkup', [2, 5], true),
        'walkdown': this.self.animations.add('walkdown', [3, 4], true)
    };

    //deplacement vers tile du playground
    this.tileObjective = undefined;

    //tile ou se trouve le larryhead
    this.tileCurrent = tile;



    this.self.animations.play('walkdown', 3, true);

    this.game.physics.enable(this.self, Phaser.Physics.ARCADE);

    //this.self.body.setSize(0.8,0.8);
    this.self.body.width = (this.self.width * 4)/ 5;
    this.self.body.height = (this.self.height * 4) / 5;

    this.speed = 250;
    this.maxLarrys = 5;


}

LarryHead.prototype.onTouchPotion = function() {

}

LarryHead.prototype.randomPlacement = function() {
    var rand = this.game.rnd.integerInRange(0, this.playground.length);

    if (this.body != undefined) {
        this.body.placement();
    }
}

LarryHead.prototype.onHitBall = function(larry,ball) {
    var diff = 0;
        //gauche
    if (ball.x < larry.x) {
        diff = larry.x - ball.x;
        ball.body.velocity.x = (-10 * diff);
        //droite
    } else if (ball.x > larry.x) {
        diff = ball.x - larry.x;
        ball.body.velocity.x = (10 * diff);
    } else {
        //The ball hit the center of the racket, let's add a little bit of a tragic accident(random) of his movement
        ball.body.velocity.x = 2 + Math.random() * 8;
    }
    return false;
}

LarryHead.prototype.kill = function() {
    this.self.kill();
}


LarryHead.prototype.produceBody = function() {
    //this.flappy = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'larrybody');
    if (this.larrybody.length < this.maxLarrys) {
        if (this.larrybody.length == 0) {
            this.test = new LarryBody(this, this);
        } else {
            this.test = new LarryBody(this.larrybody[this.larrybody.length - 1], this);
        }
        this.larrybody.push(this.test);
        this.larrypong.pushLarry(this.test);
    }
}

LarryHead.prototype.update = function() {
	this.self.bringToTop();
    if (this.tileObjective != undefined) {
        if (this.objectiveReached()) {
            //this.onSuccess();
            this.tileObjective = undefined;

        } else {
            this.move();
        }
    }
    if (this.tileObjective == undefined) {
        if (this.findObjective()) {

        }
    }

    for (var i = 0; i < this.playground.numberWidthCase; i++) {
        for (var j = 0; j < this.playground.numberHeightCase; j++) {
            this.game.physics.arcade.collide(
                this.self, this.playground.get(i, j),
                function() {
                    console.log("collide test");
                },
                function(larry, tile) {
                    larry.self.setCurrentTile(tile);
                    return false;
                }, this);

        }
    }

    this.game.physics.arcade.collide(this.self, this.larrypong.potion.self,
        function() {
            console.log("collide test 2");
        },
        function(larry, potion) {
            larry.self.produceBody();
            potion.self.placement();
            return false;
        }, this);

    this.game.physics.arcade.collide(this.self, this.larrypong.ball, this.onHitBall, null, this);

}

LarryHead.prototype.move = function() {
    if (this.tileCurrent == undefined) {
        return;
    }

    //le larry attend son fils pour bouger
    /*if (this.fils != undefined) {
        this.colliding = false;
        this.game.physics.arcade.collide(
            this.self, this.fils.self,
            function() {
                console.log("collide test");
            },
            function(larryhead, fils) {
                larryhead.self.colliding = true;
                return false;
            }, this);

        if (!this.colliding) {
        	this.self.body.velocity.x = 0;
            this.self.body.velocity.y = 0;
            console.log("LarryHead collide avec le fils");
            return;
        }
    }*/


    if (this.tileCurrent.posX != this.tileObjective.posX) {;
        if (this.tileCurrent.posX > this.tileObjective.posX) {
            this.self.body.velocity.x = -this.speed;
            this.self.body.velocity.y = 0;
            this.self.animations.play('walkright', 3, true);
            this.self.scale.setTo(-Math.abs(this.self.scale.x),this.self.scale.y);

        } else {
            this.self.body.velocity.x = this.speed;
            this.self.body.velocity.y = 0;
            this.self.animations.play('walkleft', 3, true);
            this.self.scale.setTo(Math.abs(this.self.scale.x),this.self.scale.y);

        }
    } else if (this.tileCurrent.posY != this.tileObjective.posY) {;
        if (this.tileCurrent.posY < this.tileObjective.posY) {
            this.self.body.velocity.y = this.speed;
            this.self.body.velocity.x = 0;
            this.self.animations.play('walkdown', 3, true);

        } else {
            this.self.body.velocity.y = -this.speed;
            this.self.body.velocity.x = 0;
            this.self.animations.play('walkup', 3, true);

        }
    }
}

LarryHead.prototype.setCurrentTile = function(tile) {
    this.tileCurrent = tile;
}

LarryHead.prototype.objectiveReached = function() {
    return (this.tileCurrent == this.tileObjective);
}

/*essaye de trouver une case vers laquelle se deplacer, renvoie faux si aucune ne correspond*/
LarryHead.prototype.findObjective = function() {
    var xToGo = this.tileCurrent.posX - this.larrypong.potion.tileCurrent.posX;
    var yToGo = this.tileCurrent.posY - this.larrypong.potion.tileCurrent.posY;
    var randBehaviour = this.game.rnd.integerInRange(0, 1);

    //more dynamic behaviour
    if (xToGo < -1)
        xToGo = -1;
    else if (xToGo > 1)
        xToGo = 1;
    if (yToGo < -1)
        yToGo = -1;
    else if (yToGo > 1)
        yToGo = 1;

    //x first
    if ((randBehaviour == 0 && xToGo != 0) || yToGo == 0) {
        this.tileObjective = this.larrypong.playground.get(this.tileCurrent.posX - xToGo, this.tileCurrent.posY);
    }
    //y first
    else {
        this.tileObjective = this.larrypong.playground.get(this.tileCurrent.posX, this.tileCurrent.posY - yToGo);
    }
    //console.log(this.tileObjective);

    return false;
}


LarryHead.prototype.remove = function(larry) {
    var i = this.larrybody.indexOf(larry);
    this.larrybody.splice(i, this.larrybody.length - i);
}




function LarryBody(larrymember, larryHead) {
	if(larrymember==undefined)
		debugger;
    this.game = larrymember.game;
    this.larrypong = larrymember.larrypong;
    this.pere = larrymember;
    this.head = larryHead;
    this.playground = larrymember.playground;
    larrymember.fils = this;
    var distance = 0;
    var determineX = larrymember.self.x;
    var determineY = larrymember.self.y;
    if (larrymember.self.body.velocity.x < 0) {
        determineX += distance;
    } else if (larrymember.self.body.velocity.x > 0) {
        determineX -= distance;
    } else if (larrymember.self.body.velocity.y > 0) {
        determineY -= distance;
    } else if (larrymember.self.body.velocity.y < 0) {
        determineY += distance;
    }

    this.self = this.game.add.sprite(determineX, determineY, 'larrybody');

    this.self.self = this;
    this.scaleW = larrymember.scaleW;
    this.scaleH = larrymember.scaleH;
    /*this.self.width = larrymember.self.width;
    this.self.height = larrymember.self.height;*/

    this.self.scale.setTo(larrymember.scaleW, larrymember.scaleH);
    this.game.physics.enable(this.self, Phaser.Physics.ARCADE);


    this.self.anchor.x = 0.5;
    this.self.anchor.y = 0.5;
    this.animations = {
        'walkright': this.self.animations.add('walkright', [0, 1], true),
        'walkleft': this.self.animations.add('walkleft', [0, 1], true),
        'walkup': this.self.animations.add('walkup', [0, 1], true),
        'walkdown': this.self.animations.add('walkdown', [0, 1], true)
    };

    this.self.animations.play('walkdown', 3, true);

    //this.self.body.width = (this.self.width * 5) / 4;
    //this.self.body.height = (this.self.height * 3) / 4;

    this.state = ['none', 'followX', 'followY'];
    this.currentState = 'none';

    if (this.pere instanceof LarryHead) {
        this.speed = this.pere.speed + 100;
    } else {
        this.speed = this.pere.speed + 10;
    }

    //tile ou se trouzzzzzzzve le larrybody
    this.tileCurrent = this.pere.tileCurrent;
}

LarryBody.prototype.growBody = function() {
    //this.pere = new LarryBody(game);
};

LarryBody.prototype.onHitBall = function() {

}

LarryBody.prototype.placement = function() {
    if (this.pere != undefined) {
        this.pere.placement();
    }
}
LarryBody.prototype.kill = function() {
    this.self.kill();
}
LarryBody.prototype.update = function() {
    this.move();
    this.game.physics.arcade.collide(this.self, this.larrypong.ball,
        function() {
            console.log("collide test 2");
        },
        function(larry, ball) {
            larry.self.remove();
            return false;
        }, this);

    for (var i = 0; i < this.playground.numberWidthCase; i++) {
        for (var j = 0; j < this.playground.numberHeightCase; j++) {
            this.game.physics.arcade.collide(
                this.self, this.playground.get(i, j),
                function() {
                    console.log("collide test");
                },
                function(larry, tile) {
                    larry.self.tileCurrent = tile;
                    return false;
                }, this);

        }
    }
}

LarryBody.prototype.stopFilsAndGetLast = function() {
    var fils = this.fils;
    while (fils != undefined) {
        fils.self.body.velocity.y = 0;
        fils.self.body.velocity.x = 0;
        if (fils.fils == undefined) {
            return fils;
        }
        fils = fils.fils;
    }
}

LarryBody.prototype.move = function() {
    if (this.pere != undefined) {
        this.checkState();
        if (this.currentState == 'none') {
            this.findState();
        }
        this.collidingPere = false;
        this.collidingFils = true;

        this.collidingPere = this.self.getBounds().contains(this.pere.self.x,this.pere.self.y);
        /*this.game.physics.arcade.collide(
            this.self, this.pere.self,
            function() {
                console.log("collide test");
            },
            function(larrybody, pere) {
                larrybody.self.collidingPere = true;
                return false;
            }, this);
		*/


        //le larry attend son fils pour bouger
        if (this.fils != undefined) {
            /*this.collidingFils = false;
            /*this.game.physics.arcade.collide(
                this.self, this.fils.self,
                function() {
                    console.log("collide test");
                },
                function(larrybody, fils) {
                    larrybody.self.collidingFils = true;
                    return false;
                }, this);*/
        }
        this.self.body.velocity.x = 0;
        this.self.body.velocity.y = 0;
        if(!this.collidingPere){
        	if(this.collidingFils){
        		this.follow();
        	}
        }
        else {
        	
        	//console.log("Larrybody ne bouge pas:"+this.getNum()+" collide pere");
            //this.tryRecenter();
        }
    }
    else{
    	//console.log("Le larrybody "+this.getNum()+" n'a pas de pere");
    }
}
LarryBody.prototype.remove = function() {
    this.head.remove(this);
    this.larrypong.remove(this);

    var e = this.stopFilsAndGetLast();
    if (this.pere != undefined) {
        this.pere.fils = undefined;
    }
    if (this.fils != undefined) {
        this.fils.pere = undefined;
    }
    this.self.kill();
    if(e != undefined)
    	e.replaceByHead();

}
LarryBody.prototype.checkState = function() {
    if (this.currentState == 'followX') {
        if (Math.abs(this.self.x - this.pere.self.x) < 10) {
            this.currentState = 'none';
        }
    } else if (this.currentState == 'followY') {
        if (Math.abs(this.self.y - this.pere.self.y) < 10) {
            this.currentState = 'none';
        }
    }
}

LarryBody.prototype.findState = function() {
    var disX = Math.abs(this.self.x - this.pere.self.x);
    var disY = Math.abs(this.self.y - this.pere.self.y);
    if (disX > 3 && disX > disY) {
        this.currentState = 'followX';
    } else if (disY > 3) {
        this.currentState = 'followY';
    }
}

LarryBody.prototype.follow = function() {
    if (this.currentState == 'followX') {
        if (this.pere.self.x < this.self.x) {
            this.self.body.velocity.x = -this.speed;
            this.self.body.velocity.y = 0;
        } else {
            this.self.body.velocity.x = this.speed;
            this.self.body.velocity.y = 0;
        }
    } else if (this.currentState == 'followY') {
        if (this.pere.self.y < this.self.y) {
            this.self.body.velocity.y = -this.speed;
            this.self.body.velocity.x = 0;
        } else {
            this.self.body.velocity.y = this.speed;
            this.self.body.velocity.x = 0;
        }
    }
}
LarryBody.prototype.tryRecenter = function() {
    //console.log("recenter ! ");
    //debugger;
    if (this.self.x < this.pere.self.x) {
        this.self.body.velocity.x = this.pere.self.x - this.self.x;
    } else {
        this.self.body.velocity.x = this.self.x - this.pere.self.x;
    }
    if (this.self.y < this.pere.self.y) {
        this.self.body.velocity.y = this.pere.self.y - this.self.y;
    } else {
        this.self.body.velocity.y = this.self.self.y - this.pere.y;
    }
}

LarryBody.prototype.replaceByHead = function() {
    var newHead = new LarryHead(this.larrypong, this.tileCurrent);
    newHead.self.x = this.self.x;
    newHead.self.y = this.self.y;
    var e = this;
    var aux;;
    while (e != undefined) {
        e.head = newHead;
        aux = e.pere;
        e.pere = e.fils;
        e.fils = aux;
        newHead.larrybody.push(e);
        e = aux;
    }
    this.larrypong.pushLarry(newHead);
    this.pere = newHead;
}

LarryBody.prototype.getNum = function(){
	var e = this.head;
	var i = 0;
	while(e!=this && e!= undefined){
		if(e == this){
			return i;
		}
		e = e.fils;
		i++;
	}
	return undefined;
}