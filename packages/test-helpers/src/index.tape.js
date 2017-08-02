const test = require('tape');

test('index exports function as default', async (t) => {
  t.plan(1);
  const index = require('./index').default;
  await index.setup();
  await index.cleanup();
  t.equal(typeof(index), 'function', 'index exports function');
  t.end();
});