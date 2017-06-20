const express = require('express');
const http = require('http');
const socketio = require('socket.io');

function FructoseServer() {
  this.first = true;
  this.app = null;
  this.server = null;
  this.io = null;
  this.instance = null;
}

FructoseServer.prototype.close = function () {
  this.io.sockets.forEach(s => s.disconnect());
  this.io.close();
  this.server.close();
  this.instance.close()
}

FructoseServer.prototype.start = function () {
  return new Promise ( (resolve, reject) => {
    this.app = express();
    this.server = http.Server(this.app);
    this.io = socketio(this.server);

    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    this.io.on('connection',  (socket) => {
      console.log('a user connected');
      if (this.first) {
        this.first = false;
        resolve(); // resolve on the first connection - there is a better way to do this. add a hasConnection method... works for now
      }

      socket.on('loadComponent', (componentName, props) => {
        console.warn('msg received from client, sending loadOnDevice to device')
        this.io.emit('load-on-device', componentName, props);
      });

      socket.on('loadedOnDevice', () => {
        console.warn('component loaded to device, sending loaded msg to client')
        this.io.emit('loaded');
      });

      socket.on('debug', (r) => {
        console.log(r);
      });
    });

    this.instance = this.server.listen(7811, () => {
      console.log('listening on *:7811');
    });
  });
}

module.exports = { FructoseServer }