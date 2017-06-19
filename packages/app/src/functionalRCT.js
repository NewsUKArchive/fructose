import React from 'react';
import {Text} from 'react-native';
import FunctionalRCTUI from './components/functionalRCTUI';
import { EventEmitter } from 'events';
import io from 'socket.io-client';

export default class FunctionalRCT {
  constructor(eventEmitter) {
    this.events = new EventEmitter();
    this.socket = io('http://localhost:7811');
    this.components = {};
  }

  addComponent = (name, component)  => {
    this.components[name] = component;
  }
  
  loadComponent = (name, props) => {
    this.events.emit('load', name, props);
  }

  getFunctionalRCTUI = () => {
    // this.socket.on('load', (componentDetails) => {
    //   this.loadComponent(componentDetails);
    // });
    return <FunctionalRCTUI events={this.events} components={this.components} />
  }
}