const Client = require('./client').FructoseClient;
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

describe('FructoseClient', () => {
  var app;
  var server = http.Server(this.app);
  var io = socketio(this.server);
  var client;
  var port;
  
  beforeAll( (done) => {
    app = express();
    server = http.Server(this.app);
    server.listen(0, () => {
      port = server.address().port;
      done();
    })
  });

  afterAll( () => {
    client.disconnect();
    io.close()
    server.close();
  });

  it('e2e test', () => {
    io = socketio(server);

    io.on('connection', (socket) => {
      socket.on('loadComponent', (x,y) => {
        expect(x).toBe(1);
        expect(y).toBe(2);
        io.emit('loaded');
      })
    });

    client = new Client(port);    
    return expect(client.loadComponent(1,2)).resolves.toBe('component loaded');
  }, 300);
});