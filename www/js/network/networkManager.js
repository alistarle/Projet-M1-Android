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
var onBallReleaseCallback;
var onBallMoveCallback;
var onGoalCallback;

var PORT = 3000;

var mainPlayer = { name: "", uid: "", x: "", color: ""};

var MAX_TICK_BEFORE_SEND = 3;
var tick = 0;

var NetworkManager = {
  connected: false,
  fps: 60,
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
    serverSocket.on('SERVER_GOAL', onGoal);
    serverSocket.on('SERVER_BALL_MOVED', onBallMove);
    serverSocket.on('SERVER_BALL_RELEASE', onBallRelease);
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
  requestPlayerList: function() {
    serverSocket.emit('CLIENT_REQUEST_PLAYER_LIST');
  },
  notifyMovement: function(movementInfo){
    mainPlayer.x = movementInfo.x;
    tick++;
    if(tick == MAX_TICK_BEFORE_SEND) {
      serverSocket.emit('CLIENT_NOTIFY_PLAYER_MOVEMENT', {x: movementInfo.x, uid: mainPlayer.uid});
      tick = 0;
    }
  },
  notifyLaunch: function(gameInfo) {
    serverSocket.emit('CLIENT_NOTIFY_LAUNCH', gameInfo);
  },
  notifyGoal: function(score) {
    serverSocket.emit('CLIENT_NOTIFY_GOAL', score);
  },
  notifyReleaseBall: function() {
    serverSocket.emit('CLIENT_NOTIFY_RELEASE_BALL');
  },
  notifyBallMoved: function(movementInfo) {
    serverSocket.emit('CLIENT_NOTIFY_BALL_MOVED', movementInfo);
  },
  onUpdatePlayerList: function(callback){
    onUpdatePlayerListCallback = callback;
  },
  onBallRelease: function(callback) {
    onBallReleaseCallback = callback;
  },
  onGoal: function(callback) {
    onGoalCallback = callback;
  },
  onBallMove: function(callback) {
    onBallMoveCallback = callback;
  },
  sendPacket: function(type,data) {
    MAX_TICK_BEFORE_SEND = this.fps/20;
    tick++;
    if(tick >= MAX_TICK_BEFORE_SEND) {
      serverSocket.emit(type,data);
      tick = 0;
    }
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

function onLaunch(gameInfo) {
  onServerLaunchCallback(gameInfo);
}

function onCanLaunch() {
  onServerCanLaunchCallback();
}

function onCannotLaunch() {
  onServerCannotLaunchCallback();
}

function onGoal(score) {
  onGoalCallback(score);
}

function onBallMove(movementInfo) {
  onBallMoveCallback(movementInfo);
}

function onBallRelease() {
  onBallReleaseCallback();
}
