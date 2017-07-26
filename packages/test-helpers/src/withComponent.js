/* globals describe beforeEach beforeAll afterAll */
var log = require('npmlog')

const Client = require("../../client");
const { setup, teardown } = require("./setup");

export default config => {
  let first = true;

  beforeAll(async () => {
    if (first) {
      console.log("setting up")
      await setup(config).then(() => console.log("setup complete"));
      first = false;
    }
  }, 180000);

  afterAll(async () => {
    await teardown();
  });

  const withComponent = (component, description, tests) => {
    describe(description, () => {
      const hashed = JSON.stringify(component);
      let client;

      beforeAll(async () => {
        client = Client(7811);
        console.log("client address", client.socket);
      }, 60000);

      afterAll(async () => client.disconnect());

      beforeEach(async () => {
        return await client.loadComponent(hashed).then( () => console.log('loadComponent', hashed))
      });
      tests();
    });
  };

  global.withComponent = withComponent;
};
