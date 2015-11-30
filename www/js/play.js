/**
 * Created by alistarle on 30/11/2015.
 */
function Play(){}

Play.prototype = {
  create: function(ip){
    this.connectToServer(ip);
  },

  connectToServer: function(ip){
    var me = this;
    this.otherPlayers = [];

    NetworkManager.connect(ip,optionsGetPseudo());

    NetworkManager.onOtherPlayerConnected(function(otherPlayerInfo){
      this.otherPlayers.push(otherPlayerInfo);
      syncPlayer(this.otherPlayers);
    });

    NetworkManager.onOtherPlayerMove(function(movementInfo){
      var otherPlayerToMove = searchById(me.otherPlayers, movementInfo.uid);
      if(otherPlayerToMove){
        otherPlayerToMove.moveTo(movementInfo.x, movementInfo.y);
      }
    });

    NetworkManager.onUpdatePlayerList(function(receivedList){
      this.otherPlayers = receivedList;
      syncPlayer(receivedList);
    });

    NetworkManager.onServerLaunch(function() {
      var pong = new Pong();
      function create() {
        pong.create();
      }

      function preload() {
        pong.preload();
      }

      function update() {
        pong.update();
      }
      pong.init(create, preload, update, 'gameArea');
    });

    NetworkManager.onServerCanLaunch(function() {
      $("#launchGame").prop('disabled', false);
    });

    NetworkManager.onServerCannotLaunch(function() {
      $("#launchGame").prop('disabled', true);
    });

    NetworkManager.onServerRoomClosed(function() {
      alert("Serveur fermé");
    });

    NetworkManager.onServerRoomFull(function() {
      alert("Serveur plein");
    });
  }
};
