function LarryPongPlayground(larrypong){
		  Playground.call(this,larrypong,6,6,larrypong.game.width,larrypong.game.height/4);

}
LarryPongPlayground.prototype = $.extend(true, {}, Playground.prototype);  
LarryPongPlayground.prototype.super = Playground.prototype;