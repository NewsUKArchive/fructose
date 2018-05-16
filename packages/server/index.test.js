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

  it("forwards the load-component-in-app message", done => {
    setUp(socketConfig).then(() => {
      socket.on("load-component-in-app", x => {
        expect(x).toBe("a component");
        done();
      });
      socket.emit("load-component-in-app", "a component");
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

  it("forwards the component-loaded-in-app message", done => {
    setUp(socketConfig).then(() => {
      socket.on("component-loaded-in-app", () => {
        done();
      });

      socket.emit("component-loaded-in-app");
    });
  });

  it("forwards the get-loaded-app-components", () =>
    new Promise(resolve => {
      setUp(socketConfig).then(() => {
        socket.on("get-loaded-app-components", () => {
          resolve();
        });

        socket.emit("get-loaded-app-components");
      });
    }));

  it("forwards the bundled-components", () =>
    new Promise(resolve => {
      setUp(socketConfig).then(() => {
        socket.on("send-loaded-app-components", () => {
          resolve();
        });

        socket.emit("send-loaded-app-components");
      });
    }));
});
