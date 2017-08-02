/* globals describe beforeEach beforeAll afterAll */
import Client from "../../client";
import log from "npmlog";

export default ()  => {
  const withComponent = (component, description, tests) => {
    describe(description, () => {
      const hashed = JSON.stringify(component);
      let client;

      beforeAll(async () => {
        client = Client(7811);
        log.verbose("client address", client.socket);
      }, 60000);

      afterAll(async () => client.disconnect());

      beforeEach(async () => {
        return await client.loadComponent(hashed).then( () => log.verbose('loadComponent', hashed))
      });
      tests();
    });
  };

  global.withComponent = withComponent;
};
