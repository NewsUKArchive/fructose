const SocketClient = require("socket.io-client");
const FructoseClient = require("./client");

const config = {
  transports: ["websocket"],
  query: {
    clientType: "tests"
  }
};

const sc = port => new SocketClient(`http://localhost:${port || 7811}`, config);
const fc = port => new FructoseClient(sc(port));

module.exports = fc;
