/**
 * Created by alistarle on 30/11/2015.
 */
  va


var packetManager = {
  tickBeforeSending: 20,
  packetToSend : [],

  sendPacket : function(paquet) {
    packetToSend.concat(paquet);
  },

  receivePacket : function() {

  }
}

module.exports = packetManager;
