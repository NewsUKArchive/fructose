import FunctionalRCT from "./functionalRCT";
import { EventEmitter } from "events";
import io from "socket.io-client";

const events =  new EventEmitter();
const socket = io("http://localhost:7811");
const fcrt = new FunctionalRCT(events, socket);

export const getUI = fcrt.getFunctionalRCTUI;
export const addComponent = fcrt.addComponent;
export const loadComponent = fcrt.loadComponent;
export const tearDown = () => fcrt.socket.disconnect();
