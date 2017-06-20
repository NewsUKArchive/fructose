var socketClient = require('socket.io-client');

function FructoseClient () {
  this.socket = socketClient('http://localhost:7811');
  this.loadComponent = (component, props) => this.socket.emit('bbb', component, props);
}

module.exports.FructoseClient = FructoseClient;