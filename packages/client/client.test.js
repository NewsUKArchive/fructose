const Client = require('./client').FructoseClient;

describe('FructoseClient', () => {
  it('has a loadComponent function', () => {
    const client = new Client();
    expect(client.loadComponent).toBeTruthy();
    client.loadComponent(1,2)
  });
});