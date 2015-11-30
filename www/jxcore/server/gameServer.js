/**
 * Created by alistarle on 30/11/2015.
 */
var socketIO, listPlayers = [];

var maxPlayer = 4;
var minPlayer = 2;
var idHost;

var status = "PENDING";

var GameServer = function(io){
  socketIO = io;
  return {
    start: function(){
      socketIO.on('connection', onClientConnected);
    }
  };
};

function onClientConnected(client){
  console.log('Client connected ...');
  client.on('CLIENT_REQUEST_ID', onRequestId);
  client.on('CLIENT_NOTIFY_PLAYER_MOVEMENT', onNotifyPlayerMovement);
  client.on('CLIENT_REQUEST_PLAYER_LIST', onRequestPlayerList);
  client.on('CLIENT_NOTIFY_LAUNCH', onNotifyLaunch);

  client.on('disconnect', onDisconnected);

  function onRequestId(playerInfo) {
    // respond the connected player with his ID
    client.emit('SERVER_PLAYER_ID', client.id);
    // notify all the other players that a new player is connected
    notifyConnectedPlayer(client, playerInfo);
  }

  function notifyConnectedPlayer(client, playerInfo){
    if(listPlayers.length == 0) idHost = client.id;
    if(listPlayers.length == maxPlayer) {
      client.emit('SERVER_ROOM_FULL');
      return;
    }
    if(status = "PLAYING") {
      client.emit('SERVER_CANT_JOIN', "Partie en cours...");
    }
    if(getPlayerById(client.id) != null) return;
    playerInfo.uid = client.id;
    listPlayers.push(playerInfo);
    console.log("Id host: "+idHost);
    if(listPlayers.length >= minPlayer) client.broadcast.to(idHost).emit("SERVER_CAN_LAUNCH");
    client.broadcast.emit('SERVER_PLAYER_CONNECTED', playerInfo);
  }

  function onNotifyPlayerMovement(movementInfo){
    client.broadcast.emit('SERVER_OTHER_PLAYER_MOVED', movementInfo);
    // update state on server
    var concernedPlayer = getPlayerById(movementInfo.uid);
    if(concernedPlayer){
      concernedPlayer.x = movementInfo.x;
    }
  }

  function onNotifyLaunch() {
    status = "PLAYING";
    if(client.id == idHost) {
      //client.emit('SERVER_LAUNCH');
      client.broadcast.emit('SERVER_LAUNCH');
    }
  }

  function onRequestPlayerList(){
    client.emit('SERVER_PLAYER_LIST', listPlayers);
    if(client.id == idHost && listPlayers.length >= minPlayer) client.emit('SERVER_CAN_LAUNCH');
  }

  function onDisconnected(){
    if(client.id == idHost) {
      client.broadcast.emit("SERVER_ROOM_CLOSED");
      return;
    }
    listPlayers = removeElementById(listPlayers, client.id);
    if(listPlayers.length < minPlayer) client.broadcast.to(idHost).emit("SERVER_CANNOT_LAUNCH");
    client.broadcast.emit('SERVER_PLAYER_LIST', listPlayers);
  }
}

function getPlayerById(id){
  for(var i = 0, max = listPlayers.length; i < max; i++){
    if(listPlayers[i].uid === id){
      return listPlayers[i];
    }
  }
  return undefined;
}

function removeElementById(array, id){
  return array.filter(function( obj ) {
    return obj.uid !== id;
  });
}


module.exports = GameServer;
