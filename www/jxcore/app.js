// This JavaScript file runs on JXcore

var fs = require('fs');
var clog = require('./utilities').log;
clog("JXcore is up and running!");

Mobile('getBuffer').registerSync(function() {
  clog("getBuffer is called!!!");
  var buffer = new Buffer(25000);
  buffer.fill(45);

  // send back a buffer
  return buffer;
});

Mobile('asyncPing').registerAsync(function(message, callback){
  setTimeout(function() {
    callback("Pong:" + message);
  }, 500);
});

// get and share the IP addresses
var os = require('os');
var net = os.networkInterfaces();

for (var ifc in net) {
  var addrs = net[ifc];
  if (ifc.substring(0, 4) == "wlan") {
    for (var a in addrs) {
      if (addrs[a].family == "IPv4") {
        Mobile('addIp').call(addrs[a].address);
      }
    }
  }
}

var client = [];

// run express server under a sub thread
jxcore.tasks.addTask(function() {
  // requiring utilities again. This function doesn't share any
  // variable from the above thread code.
  var clog = require('./utilities').log;
  var ready = require('./utilities').ready;
  var express = require('express');
  var app = express();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  var GameServer = require('./server/gameServer');
  var gameServer = GameServer(io);

  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });

  gameServer.start();

  server.listen(3000, function () { //Création du serveur express sur le porc 3000
    clog("Express server is started. (port: 3000)");
    ready();
  });
});
