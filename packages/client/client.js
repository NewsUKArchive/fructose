const socketClient = require('socket.io-client');

function FructoseClient (PORT=7811) {
  this.socket = socketClient(`http://localhost:${PORT}`);
  this.loadComponent = (component, props) => {
    return new Promise( (resolve, reject) => {
      this.socket.emit('loadComponent', component, props);
      this.socket.on('loaded', () => {
        resolve('component loaded');
      });
    }) 
  }
  this.disconnect = () => this.socket.disconnect();
}

module.exports.FructoseClient = FructoseClient;