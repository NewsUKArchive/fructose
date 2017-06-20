import 'babel-polyfill';
import detox from 'detox';
const FructoseClient = require('fructose-client').FructoseClient;
import { startFructoseServer } from 'fructose-server';

const detoxConfig =  {
  "configurations": {
    "ios.sim.debug": {
      "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/e2eTests.app",
      "build": "xcodebuild -project ios/e2eTests.xcodeproj -scheme example -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      "type": "ios.simulator",
      "name": "iPhone 7"
    }
  } 
}

console.warn(1,FructoseClient)

describe('fructose', () => {
  const client = new FructoseClient();
  beforeAll(async () => {
    console.warn(2,FructoseClient)
    await detox.init(detoxConfig);
    await startFructoseServer();
  }, 60000);

  afterAll(async () => {
    await detox.cleanup();
  });

  beforeEach( async () => {
    await device.reloadReactNative();
  }, 5000);

  it('can load a component', async () => {
    console.log('in it')
    client.loadComponent('Component1', {});
    setTimeout( async () => await expect(element(by.text('COMPONENT 1'))).toBeVisible(), 3000);
  }, 5000)
});
