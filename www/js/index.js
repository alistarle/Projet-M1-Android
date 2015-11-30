// This JavaScript files runs on Cordova UI
var inter;
var currentIp;
var pong;

function ctrl_log() {
  return document.getElementById('logs');
}

function log(x) {
  ctrl_log().innerHTML += x + "<BR/>";
  ctrl_log().parentNode.scrollTop = ctrl_log().clientHeight;
}

function syncPlayer(listPlayers) {
  var lobby = document.getElementById('hasJoined');
  lobby.innerHTML = "";
  for(player in listPlayers) {
    lobby.innerHTML += "<a class='item' href='#''><strong>" + listPlayers[player].name + "</strong> : " + listPlayers[player].uid + "</a>";
  }
}

function ready() {
  console.log("JXCORE : connecting to "+currentIp);
  pong.connectToServer(currentIp);
}

function initJXCore(pongInstance) {
  pong = pongInstance;
  inter = setInterval(function() {
    if (typeof jxcore == 'undefined')
      return;

    clearInterval(inter);

    document.getElementById('clrbtn').onclick = function() {
      ctrl_log().innerHTML = "";
    }

    var addIp = function(addr) {
      currentIp = addr;
      document.getElementById('ipaddrs').innerHTML += "<a class='item' href='#''>"+addr+"</a>";
    }

    jxcore.isReady(function() {
      log('READY');
      // register log method from UI to jxcore instance
      jxcore('ready').register(ready);
      jxcore('log').register(log);
      jxcore('addIp').register(addIp);

      jxcore('app.js').loadMainFile(function(ret, err) {
        if (err) {
          alert(JSON.stringify(err));
        } else {
          log('Loaded');
          jxcore_ready();
        }
      });
    });
  }, 5);
}

function jxcore_ready() {
  // calling a method from JXcore (app.js)
  jxcore('asyncPing').call('Hello', function(ret, err) {
    // register getTime method from jxcore (app.js)
    var getBuffer = jxcore("getBuffer");

    getBuffer.call(function(bf, err) {
      var arr = new Uint8Array(bf);
      log("Buffer size:" + arr.length + " - first item: " + arr[0]);
    });
  });
}
