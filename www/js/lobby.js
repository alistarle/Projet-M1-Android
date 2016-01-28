function Lobby() {
  this.otherPlayers = [];
  this.isHost;
  this.ip;
}

Lobby.prototype.connectToServer = function(ip,isHost) {
  this.isHost = isHost;
  this.ip = ip;

  NetworkManager.connect(ip, optionsGetPseudo(), optionsGetCouleurBarre());

  NetworkManager.onOtherPlayerConnected(function(otherPlayerInfo){
    this.otherPlayers.push(otherPlayerInfo);
    syncPlayer(this.otherPlayers);
  });

  NetworkManager.onUpdatePlayerList(function(receivedList){
    this.otherPlayers = receivedList;
    syncPlayer(receivedList);
  });

  NetworkManager.onServerLaunch(function(gameInfo) {
    var url = '#/jeux/multijoueur/game?nbPoints='+gameInfo.nbPoints+'&host='+isHost+'&ip='+ip+'&mode='+gameInfo.mode+'&playerName='+this.otherPlayers[0].name;
    window.location = url;
  });

  NetworkManager.onServerCanLaunch(function() {
    $("#launchGame").prop('disabled', false);
  });

  NetworkManager.onServerCannotLaunch(function() {
    $("#launchGame").prop('disabled', true);
  });

  NetworkManager.onServerRoomFull(function() {
    alert("Serveur plein");
  });

  NetworkManager.onServerRoomClosed(function() {
    alert("Serveur fermé");
    window.location = "#/jeux/multi";
  });
}
