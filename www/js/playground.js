function Playground(pong,widthCase,heightCase){	
	this.pong = pong;
	this.game = pong.game;


	this.numberWidthCase = widthCase;
	this.numberHeightCase = heightCase;

	this.playground = new Array(this.numberWidthCase);
	for(var i = 0 ; i < this.numberWidthCase ; i++){
		this.playground[i] = new Array(this.numberHeightCase);
	}

	this.widthPlayground = this.game.width;
	this.heightPlayground = this.game.height/4;

	this.widthCase = this.widthPlayground / this.numberWidthCase;
	this.heightCase = this.heightPlayground / this.numberHeightCase;

	this.xPlayground = 0;
	this.yPlayground = (this.game.height / 2) - (this.heightPlayground / 2);

	var scaleW = this.widthCase / 20;
	var scaleH = this.heightCase / 20;
	

	for(var i = 0 ; i < this.numberWidthCase ; i++){
		for(var j=0 ; j < this.numberHeightCase ; j++){
			var tile = this.game.add.sprite(0,0,'tile');
			tile.anchor.setTo(0.5, 0.5);
			tile.scale.setTo(scaleW,scaleH);
			this.playground[i][j] = tile;
			this.game.physics.enable(tile, Phaser.Physics.ARCADE);
			tile.body.width = (tile.width * 2)/ 10;
			tile.body.height = (tile.height * 2)/ 10;
			//this.set(i,j,tile);//playground[i.toString()+""+j.toString()] = tile;
		}
		
	}
	for(var i = 0 ; i < this.numberWidthCase ; i++){
		for(var j = 0 ; j < this.numberHeightCase ; j++){
			this.get(i,j).topCase = this.get(i,j-1);
			this.get(i,j).botCase = this.get(i,j+1);
			this.get(i,j).leftCase = this.get(i-1,j);
			this.get(i,j).rightCase = this.get(i+1,j);
			this.get(i,j).posY = j;
			this.get(i,j).posX = i;
		}
	}
	this.placementPlayground();

}

Playground.prototype.get = function(x,y){
	if(x < 0 || x >= this.playground.length)
		return undefined;
	if(y < 0 || y >= this.playground[0].length)
		return undefined;
	return this.playground[x][y];
}
Playground.prototype.set = function(x,y,e){
	this.playground[x][y] = e;
}

Playground.prototype.placementPlayground = function(){
	for(var i = 0 ; i < this.numberWidthCase ; i++){
		for(var j = 0 ; j < this.numberHeightCase ; j++){

			this.playground[i][j].x = this.xPlayground +
			 this.widthCase/2 + i * this.widthCase;

			this.playground[i][j].y = this.yPlayground +
			 this.heightCase/2 + j * this.heightCase;

		}
	}
}

Playground.prototype.update = function(){
	//console.log("Update playground");
}

Playground.prototype.scaleSpriteToTile = function(sprite){
	var tile = this.get(0,0);
	var scaleW = (tile.width / sprite.width);
    var scaleH = (tile.height / sprite.height);
    if(sprite.scaleWPlayground != undefined){
    	scaleW *= sprite.scaleWPlayground;
    }
    if(sprite.scaleHPlayground != undefined){
    	scaleH *= sprite.scaleHPlayground;
    }
    sprite.scale.setTo(scaleW,scaleH);
}