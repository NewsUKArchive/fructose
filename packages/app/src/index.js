import FunctionalRCT from './functionalRCT';

const fcrt = new FunctionalRCT();

export const getUI = fcrt.getFunctionalRCTUI;
export const addComponent = fcrt.addComponent;
export const loadComponent = fcrt.loadComponent;
export const tearDown = () => fcrt.socket.disconnect();