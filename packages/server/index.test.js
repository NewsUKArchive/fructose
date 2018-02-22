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
      socket.on("load-on-device", (x, y) => {
        expect(x).toBe(1);
        expect(y).toBe(2);
        done();
      });
      socket.emit("loadComponent", 1, 2);
    });
  });

  it("forwards the fructose-app-loaded message", done => {
    const conf = {
      transports: ["websocket"],
      query: {
        clientType: "app"
      }
    };
    setUp(conf).then(() => {
      let messagesReceived = 0;
      socket.on("fructose-app-loaded", () => {
        messagesReceived += 1;
        expect(messagesReceived).toBe(1);
        done();
      });
    });
  });

  it("forwards the loadedOnDevice message", done => {
    setUp(socketConfig).then(() => {
      let messagesReceived = 0;

      socket.on("loaded", () => {
        messagesReceived += 1;
        expect(messagesReceived).toBe(1);
        done();
      });

      socket.emit("loadedOnDevice");
    });
  });

  it("forwards the get-app-components", () =>
    new Promise(resolve => {
      setUp(socketConfig).then(() => {
        let messagesReceived = 0;

        socket.on("get-app-components", () => {
          messagesReceived += 1;
          expect(messagesReceived).toBe(1);
          resolve();
        });

        socket.emit("getAppComponents");
      });
    }));

  it("forwards the bundled-components", () =>
    new Promise(resolve => {
      setUp(socketConfig).then(() => {
        let messagesReceived = 0;
        socket.on("bundled-components", () => {
          messagesReceived += 1;
          expect(messagesReceived).toBe(1);
          resolve();
        });

        socket.emit("loaded-app-components");
      });
    }));
});
