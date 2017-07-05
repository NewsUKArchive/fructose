export default () => {
  const Client = require('fructose-client');
  const { setup, teardown } = require("./setup");
  
  var first = true;

  beforeAll( async () => {
    if (first) {
      await setup();
      first = false;
    }
  }, 60000);

  afterAll( async () => {
    await teardown();
  });

  const withComponent = (component, description, tests) => {
      describe(description, () => {
        const hashed = JSON.stringify(component);
        var client;

        beforeAll(async () => {
          client = Client(7811);
        }, 60000);

        afterAll(async () => {
          await client.disconnect();
        });

        beforeEach(async () => await client.loadComponent(hashed));
        tests();
      });
  }

  global.withComponent = withComponent;
}