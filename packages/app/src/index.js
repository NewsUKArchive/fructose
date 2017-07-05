import FunctionalRCT from "./functionalRCT";
import FunctionalRCTUI from './components/functionalRCTUI';
import componentLoader from './componentLoader';
import { EventEmitter } from "events";
import io from "socket.io-client";
import React from 'react';

export const tearDown = () => fcrt.socket.disconnect();

export default function Fructose (loadComponents) {
  const events =  new EventEmitter();
  const socket = io("http://localhost:7811");
  const fcrt = new FunctionalRCT(events, socket);
  const store = componentLoader(loadComponents);
  fcrt.addComponents(store);
  return () => {
    const props = fcrt.getProps();
    return (
      <FunctionalRCTUI events={props.events} components={props.components} />
    );
  };
};
