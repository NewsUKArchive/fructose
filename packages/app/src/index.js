import { EventEmitter } from "events";
import io from "socket.io-client";
import React from "react";
import FunctionalRCT from "./functionalRCT";
import FunctionalRCTUI from "./components/functionalRCTUI";
import componentLoader from "./componentLoader";

const eventEmitter = new EventEmitter();
const socket = io("http://localhost:7811");
const fcrt = new FunctionalRCT(eventEmitter, socket);

export const tearDown = () => fcrt.socket.disconnect();

export default function Fructose(loadComponents) {
  const store = componentLoader(loadComponents);
  fcrt.addComponents(store);
  return () => {
    const p = fcrt.getProps();
    return <FunctionalRCTUI events={p.events} components={p.components} />;
  };
}
