const SocketClient = require("socket.io-client");
const FructoseClient = require("./client");

const sc = port => new SocketClient(`http://localhost:${port || 7811}`);
const fc = port => new FructoseClient(sc(port));

module.exports = fc;
