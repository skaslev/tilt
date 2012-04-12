var express = require('express');
var WebSocketServer = require('ws').Server;

var server = express.createServer();

server
  .use(express.logger())
  .use(express.favicon())
  .use(express.static('public'))
  .use(server.router)
  .get('/in', function(req, res) {
    res.redirect('/in.html');
  });

var wss = new WebSocketServer({server: server});
var in_ws, out_ws;
wss.on('connection', function(ws) {
  var url = ws.upgradeReq.url;
  if (url === '/in' && !in_ws) {
    console.log('WSS_IN connected ');
    in_ws = ws;
    ws.on('message', function(message) {
      if (out_ws) {
        out_ws.send(message);
      }
    });
    ws.on('close', function(message) {
      console.log('WSS_IN: disconnected');
      in_ws = null;
    });
  } else if (url === '/out' && !out_ws) {
    out_ws = ws;
    console.log('WSS_OUT connected');
    ws.on('close', function() {
      console.log('WSS_OUT disconnected');
      out_ws = null;
    });
  } else {
    console.log('WSS: refused');
    ws.close();
  }
});

server.listen(8080);
