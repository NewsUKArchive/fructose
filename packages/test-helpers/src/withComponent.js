/* globals describe beforeEach beforeAll afterAll */

const Client = require("../../client");
const { setup, teardown } = require("./setup");

export default config => {
  let first = true;

  beforeAll(async () => {
    if (first) {
      await setup(config);
      first = false;
    }
  }, 60000);

  afterAll(async () => {
    await teardown();
  });

  const withComponent = (component, description, tests) => {
    describe(description, () => {
      const hashed = JSON.stringify(component);
      let client;

      beforeAll(async () => {
        client = Client(7811);
      }, 60000);

      afterAll(async () => client.disconnect());

      beforeEach(async () => client.loadComponent(hashed));
      tests();
    });
  };

  global.withComponent = withComponent;
};
