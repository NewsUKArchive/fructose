/* globals describe it expect beforeAll afterEach */
const Client = require("./client");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const SocketClient = require("socket.io-client");

describe("Fructose Client", () => {
  let app;
  let socketClient;
  let fructose;
  let server;
  let io;

  beforeAll(() => {
    app = express();
    server = http.Server(app);
    io = socketio(server);
  });

  afterEach(() => {
    fructose.disconnect();
    io.close();
    server.close();
  });

  it("waits for the app to load", () =>
    new Promise(resolve => {
      io.on("connection", () => {
        io.emit("fructose-app-ready");
      });

      server.listen(0, async () => {
        const { port } = server.address();
        socketClient = SocketClient(`http://localhost:${port}`);
        fructose = new Client(socketClient);
        await fructose.waitForApp();
        resolve();
      });
    }));

  it("can load a component", () =>
    new Promise(resolve => {
      io.on("connection", socket => {
        socket.on("load-component-in-app", x => {
          expect(x).toBe("component");
          io.emit("component-loaded-in-app");
        });
      });

      server.listen(0, () => {
        const { port } = server.address();
        socketClient = SocketClient(`http://localhost:${port}`);
        fructose = new Client(socketClient);
        expect(fructose.loadComponent("component"))
          .resolves.toBe("component loaded")
          .then(resolve);
      });
    }));

  it("returns a list of components loaded in the app", () =>
    new Promise(resolve => {
      const componentList = ["a", "b", "c"];

      io.on("connection", socket => {
        socket.on("get-loaded-app-components", () => {
          io.emit("send-loaded-app-components", componentList);
        });
      });

      server.listen(0, () => {
        const { port } = server.address();
        socketClient = SocketClient(`http://localhost:${port}`);
        fructose = new Client(socketClient);
        expect(fructose.getLoadedComponents())
          .resolves.toMatchObject(componentList)
          .then(resolve);
      });
    }));
});
