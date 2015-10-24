function FlappyPong(game,modeControle){

	  Pong.apply(this,arguments);
	  //this.super = {update:Pong.prototype.update};
}
FlappyPong.prototype = $.extend(true, {}, Pong.prototype);  
FlappyPong.prototype.super = Pong.prototype;     

FlappyPong.prototype.update = function(){
	
	 this.super.update.call(this);
}


/*function FlappyPong(game,modeControle){

	  Pong.apply(this,arguments);
	  this.super = {update:Pong.prototype.update};
}
FlappyPong.prototype = $.extend(true, {}, Pong.prototype);  
//FlappyPong.prototype.super = Pong.prototype;     

FlappyPong.prototype.update = function(){
	 this.super.update.call(this);
}*/