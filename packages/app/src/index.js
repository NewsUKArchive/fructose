import { EventEmitter } from "events";
import io from "socket.io-client";
import FructoseApp from "./fructoseApp";
import createEvents from "./appTestBridge";

const eventEmitter = new EventEmitter();
const socket = io("http://localhost:7811");
createEvents(eventEmitter, socket);

export const tearDown = () => socket.disconnect();
export default FructoseApp(eventEmitter);
