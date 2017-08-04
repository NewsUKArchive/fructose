import "babel-polyfill";
import { FructoseServer } from "../../server";
import Packager from "./startPackager";
var log = require('npmlog')

let fructosePackager;
let server;

export default () => {
  const packager = new Packager();
  const server = new FructoseServer(7811);

  const setup = async () => {
    await packager.start().then(() => log.verbose("packager started"));
    await server.start().then(() => log.verbose("fructose server started on 7811", server.server.address()));
  };

  const cleanup = async () => {
    await packager.kill();
    console.log('killed packager')
    server.close();
    console.log('closed server');
  };

  return {
    setup, 
    cleanup
  };
};


