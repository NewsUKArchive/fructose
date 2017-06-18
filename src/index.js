import React from 'react';
import {Text} from 'react-native';
import FunctionalRCTUI from './functionalRCTUI';
import { EventEmitter } from 'events';
import io from 'socket.io-client';

export default class FunctionalRCT {
  constructor () {
    this.events = new EventEmitter();
    this.socket = io('http://localhost:7811');
  }

  getFunctionalRCTUI () {
    socket.on('load', (componentDetails) => {
      this.loadComponent(componentDetails);
    });
    return <FunctionalRCTUI events={this.events} />
  }

  loadComponent (componentDetails) {
    this.events.emit('load', componentDetails);
  }

  loadDummy(){
    const dummy = {
      name: Text.name,
      props: { id: 'lol'},
      inner: 'LOL'
    }
    this.events.emit('load', dummy);
  }
}

export { FunctionalRCT };