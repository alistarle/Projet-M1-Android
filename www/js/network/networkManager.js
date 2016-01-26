/**
 * Created by alistarle on 30/11/2015.
 */
'use stric';

var serverSocket;
var onOtherPlayerConnectedCallback;
var onOtherPlayerMove;
var onUpdatePlayerListCallback;
var onServerRoomClosedCallback;
var onServerRoomFullCallback;
var onServerLaunchCallback;
var onServerCanLaunchCallback;
var onServerCannotLaunchCallback;

var PORT = 3000;

var mainPlayer = { name: "", uid: "", x: "", color: ""};

var NetworkManager = {
  connected: false,
  connect: function (ip, player, color) {
    mainPlayer.name = player;
    mainPlayer.color = color;
    serverSocket = io.connect('http://'+ip+':'+PORT);
    serverSocket.on('connect', onConnectedToServer);

    this.configureIncomingTraffic();

  },
  configureIncomingTraffic: function(){
    serverSocket.on('SERVER_PLAYER_ID', onReceivePlayerId);
    serverSocket.on('SERVER_ROOM_CLOSED', onRoomClosed);
    serverSocket.on('SERVER_ROOM_FULL', onRoomFull);
    serverSocket.on('SERVER_LAUNCH', onLaunch);
    serverSocket.on('SERVER_CAN_LAUNCH', onCanLaunch);
    serverSocket.on('SERVER_CANNOT_LAUNCH', onCannotLaunch);
    serverSocket.on('SERVER_PLAYER_CONNECTED', onPlayerConnected);
    serverSocket.on('SERVER_PLAYER_LIST', onReceivePlayerList);
    serverSocket.on('SERVER_OTHER_PLAYER_MOVED', onOtherPlayerMoved);
  },
  onServerRoomClosed: function (callback) {
    onServerRoomClosedCallback = callback;
  },
  onServerRoomFull: function (callback) {
    onServerRoomFullCallback = callback;
  },
  onServerLaunch: function (callback) {
    onServerLaunchCallback = callback;
  },
  onServerCanLaunch: function (callback) {
    onServerCanLaunchCallback = callback;
  },
  onServerCannotLaunch: function (callback) {
    onServerCannotLaunchCallback = callback;
  },
  onOtherPlayerConnected: function(callback){
    onOtherPlayerConnectedCallback = callback;
  },
  onOtherPlayerMove: function(callback){
    onOtherPlayerMove = callback;
  },
  requestPlayerList:function() {
    serverSocket.emit('CLIENT_REQUEST_PLAYER_LIST');
  },
  notifyMovement: function(movementInfo){
    mainPlayer.x = movementInfo.x;
    serverSocket.emit('CLIENT_NOTIFY_PLAYER_MOVEMENT', {x: movementInfo.x, uid: mainPlayer.uid});
  },
  notifyLaunch: function() {
    serverSocket.emit('CLIENT_NOTIFY_LAUNCH');
  },
  onUpdatePlayerList: function(callback){
    onUpdatePlayerListCallback = callback;
  }

};

function onConnectedToServer() {
  NetworkManager.connected = true;
  serverSocket.emit('CLIENT_REQUEST_ID', mainPlayer);
  serverSocket.emit('CLIENT_REQUEST_PLAYER_LIST');
}

function onReceivePlayerId(mainPlayerID) {
  mainPlayer.uid = mainPlayerID;
}

function onPlayerConnected(otherPlayer){
  onOtherPlayerConnectedCallback(otherPlayer);
}

function onOtherPlayerMoved(movementInfo){
  onOtherPlayerMove(movementInfo);
}

function onReceivePlayerList(listPlayers){
  onUpdatePlayerListCallback(listPlayers);
}

function onRoomClosed() {
  onServerRoomClosedCallback();
}

function onRoomFull() {
  onServerRoomFullCallback();
}

function onLaunch() {
  onServerLaunchCallback();
}

function onCanLaunch() {
  onServerCanLaunchCallback();
}

function onCannotLaunch() {
  onServerCannotLaunchCallback();
}
