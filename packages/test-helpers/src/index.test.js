
test('index exports function as default', async () => {
  const fructose = require('./index').default;
  fructose.withComponent();
  expect(typeof(withComponent)).toBe('function');
  expect(typeof(fructose.hooks.setup)).toBe('function');
  expect(typeof(fructose.hooks.cleanup)).toBe('function');
});