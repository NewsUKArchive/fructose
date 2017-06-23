import React from 'react';
import {Text} from 'react-native';
import FunctionalRCTUI from './components/functionalRCTUI';
import { EventEmitter } from 'events';
import io from 'socket.io-client';

export default class FunctionalRCT {
  constructor(eventEmitter) {
    this.socket = io('http://localhost:7811');
    this.events = new EventEmitter();
    this.events.on('loaded', () => {
    });

    this.socket.on('load-on-device', (componentName, props) => {
      this.loadComponent(componentName, {});
      this.socket.emit('loadedOnDevice');
    });
    
    this.components = {};
  }

  addComponent = (name, component)  => {
    this.components[name] = component;
  }
  
  loadComponent = (name, props) => {
    this.events.emit('load', name, props);
  }

  getFunctionalRCTUI = () => {
    return <FunctionalRCTUI events={this.events} components={this.components} />
  }
}