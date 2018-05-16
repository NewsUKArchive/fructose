/* globals describe it afterEach expect */

const { FructoseServer } = require("./index");
const client = require("socket.io-client");
const portfinder = require("portfinder");

describe("FructoseServer", () => {
  let server;
  let PORT;
  let socket;
  const socketConfig = {
    transports: ["websocket"],
    query: {
      clientType: "tests"
    }
  };

  const setUp = config =>
    portfinder
      .getPortPromise()
      .then(port => {
        PORT = port;
        server = new FructoseServer(PORT);
        socket = client(`http://localhost:${PORT}`, config);
      })
      .then(() => server.start());

  afterEach(async () => {
    await socket.disconnect();
    await server.close();
  });

  it("forwards the loadComponent message", done => {
    setUp(socketConfig).then(() => {
      socket.on("load-on-device", x => {
        expect(x).toBe("a component");
        done();
      });
      socket.emit("loadComponent", "a component");
    });
  });

  it("forwards the fructose-app-ready message", done => {
    setUp(socketConfig).then(() => {
      socket.on("fructose-app-ready", () => {
        done();
      });

      socket.emit("fructose-app-ready");
    });
  });

  it("forwards the loadedOnDevice message", done => {
    setUp(socketConfig).then(() => {
      socket.on("loaded", () => {
        done();
      });

      socket.emit("loadedOnDevice");
    });
  });

  it("forwards the get-app-components", () =>
    new Promise(resolve => {
      setUp(socketConfig).then(() => {
        socket.on("get-app-components", () => {
          resolve();
        });

        socket.emit("getAppComponents");
      });
    }));

  it("forwards the bundled-components", () =>
    new Promise(resolve => {
      setUp(socketConfig).then(() => {
        socket.on("bundled-components", () => {
          resolve();
        });

        socket.emit("loaded-app-components");
      });
    }));
});
