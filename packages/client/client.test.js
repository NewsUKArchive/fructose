/* globals describe it  afterAll expect */

const Client = require("./client");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const SocketClient = require("socket.io-client");

describe("FructoseClient", () => {
  let app;
  let socketClient;
  let client;
  let server;
  let io;

  afterAll(() => {
    client.disconnect();
    io.close();
    server.close();
  });

  it(
    "e2e test",
    done => {
      app = express();
      server = http.Server(app);
      io = socketio(server);

      io.on("connection", socket => {
        socket.on("loadComponent", (x, y) => {
          expect(x).toBe(1);
          expect(y).toBe(2);
          io.emit("loaded");
        });
      });

      server.listen(0, () => {
        const port = server.address().port;
        socketClient = SocketClient(`http://localhost:${port}`);
        client = new Client(socketClient);
        expect(client.loadComponent(1, 2))
          .resolves.toBe("component loaded")
          .then(done);
      });
    },
    1000
  );
});
