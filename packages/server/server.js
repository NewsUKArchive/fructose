const express = require('express');
const http = require('http');
const socketio = require('socket.io');

function startFructoseServer() {
  var first = true;
  return new Promise ( (resolve, reject) => {
    const app = express();
    const server = http.Server(app);
    const io = socketio(server);

    app.get('/', function(req, res){
      res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', function(socket){
      console.log('a user connected');
      if (first) {
        first = false;
        resolve();
      }
      socket.on('bbb', (componentName, props) => {
        console.log('deets', componentName, props);
        socket.broadcast.emit('aaa', componentName);
      });

      socket.on('debug', (r) => {
        console.log(r);
      });
    });

    server.listen(7811, function(){
      console.log('listening on *:7811');
    });
  });
}

module.exports = { startFructoseServer }