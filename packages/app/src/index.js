import { EventEmitter } from "events";
import io from "socket.io-client";
import properties from "./properties";
import FructoseApp from "./fructoseApp";
import createEvents from "./appTestBridge";

let socket;

const createEventsAndSockets = () => {
  const eventEmitter = new EventEmitter();
  socket = io(properties["server-url"], { transports: ["websocket"] });
  createEvents(eventEmitter, socket);
  return eventEmitter;
};

export default FructoseApp(createEventsAndSockets());
