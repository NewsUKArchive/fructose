var socketClient = require('socket.io-client');

function FructoseClient () {
  this.socket = socketClient('http://localhost:7811');
  this.loadComponent = (component, props) => {
    return new Promise( (resolve, reject) => {
      console.warn('sending loadComponent msg to server');
      this.socket.emit('loadComponent', component, props);
      this.socket.on('loaded', () => {
        console.warn('finally loaded')
        resolve();
      });
      this.socket.on('load-on-device', (x,y)=>console.error(x,y))
    }) 
  }
  this.disconnect = () => this.socket.disconnect();
}

module.exports.FructoseClient = FructoseClient;