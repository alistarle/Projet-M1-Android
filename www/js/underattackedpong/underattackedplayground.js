function UnderAttackedPlayground(pong){
	Playground.call(this,pong,8,8);


	
}

UnderAttackedPlayground.prototype = $.extend(true, {}, Playground.prototype);  
UnderAttackedPlayground.prototype.super = Playground.prototype;



UnderAttackedPlayground.prototype.spawnTop = function(runner){
	var tileY = this.game.rnd.integerInRange(0, this.numberHeightCase/2);
	var tileX;
	runner.direction == 'left' ? tileX = this.numberWidthCase-1 : tileX = 0;
	var tile = this.get(tileX,tileY);
	if(runner.direction == 'left'){
		runner.x = tile.x+tile.width/2+runner.width;
	}
	else{
		runner.x = -runner.width;
	}
	runner.y = tile.y;
	runner.tileObjective = tile;
	
}

UnderAttackedPlayground.prototype.spawnBot= function(runner){
	var tileY = this.game.rnd.integerInRange(5, this.numberHeightCase-1);
	var tileX;
	runner.direction == 'left' ? tileX = this.numberWidthCase-1 : tileX = 0;
	var tile = this.get(tileX,tileY);
	if(tile == undefined)
		debugger;
	if(runner.direction == 'left'){
		runner.x = tile.x+tile.width/2+runner.width;
	}
	else{
		runner.x = -runner.width;
	}
	runner.y = tile.y;
	runner.tileObjective = tile;
}