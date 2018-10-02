import createMenuData from './createMenuData';

describe('menu Data Generator', () => {
  it('creates correct data structure ', () => {
    const data = [
      'parent1/parent1child',
      'parent1/parent1child2',
      'parent2/parent2child',
      'parent2/parent2child2',
      'parent1/parent1child3',
      'parent3',
      'parent3/parent3child1',
      'parent4'
    ];

    const expectedResult = [
      {
        title: 'parent1',
        data: ['parent1child', 'parent1child2', 'parent1child3']
      },
      { title: 'parent2', data: ['parent2child', 'parent2child2'] },
      { title: 'parent3', data: ['parent3child1'] }
    ];

    const actualResult = createMenuData(data);
    expect(actualResult).toMatchObject(expectedResult);
  });
});

const input = {
  Home_: null,
  'example pages/tests:the stone': null,
  'example pages/tests:the chamber': null,
  'example pages/tests:the prisoner': null,
  'example pages/tests:the goblet': null,
  'example pages/tests:the order': null,
  'example pages/tests:the prince': null,
  'example pages/tests:the hallows': null
};

const output = {
  'example pages': {
    tests: {
      'the stone': null,
      'the chamber': null,
      'the prisoner': null,
      'the goblet': null,
      'the order': null,
      'the prince': null,
      'the hallows': null
    }
  }
};
