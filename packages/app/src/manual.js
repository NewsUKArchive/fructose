import { EventEmitter } from "events";
import createEvents from "./appTestBridge";

const createEventsAndSockets = () => {
  const socket = new EventEmitter();
  const eventEmitter = new EventEmitter();
  createEvents(eventEmitter, socket);
  return { eventEmitter, socket };
};

export default createEventsAndSockets();
