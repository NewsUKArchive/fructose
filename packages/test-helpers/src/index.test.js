const test = require('tape');

test('index exports function as default', (t) => {
  t.plan(1);
  const index = require('./index').default;
  t.equal(typeof(index), 'function', 'index exports function');
  t.end();
});