/*var PacketList = {
	HANDSHAKE : {"name" : "handshake", "attr" : {'username'}},
	CLIENT_CONNECTED : {"name" : "client_connected", "attr" : {'ip','username'}}
};*/

var type, content;

var Paquet = function(packetType, packetContent) {
  type = packetType;
  content = packetContent;
  return content;
};

module.exports = Packet;
