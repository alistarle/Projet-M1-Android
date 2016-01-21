function Grunt(pong,direction,playground){
	Runner.call(this, pong,direction,playground, 'grunt',100);
}
Grunt.prototype = Object.create(Runner.prototype);
Grunt.prototype.constructor = Grunt;
