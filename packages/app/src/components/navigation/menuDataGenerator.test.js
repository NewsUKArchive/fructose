import createMenuData from "./menuDataGenerator"

describe("menu Data Generator", () => {
  it("creates correct data structure ", () => {
    const data = ["parent1/parent1child", "parent1/parent1child2", "parent2/parent2child", "parent2/parent2child2", "parent1/parent1child3", "parent3"]
    const expectedResult = [
      { title: 'parent1', items: [{title: 'parent1child'}, {title: 'parent1child2'}, {title:'parent1child3'}]},
      { title: 'parent2', items: [{title: 'parent2child'} , {title: 'parent2child2'}]},
      { title: 'parent3', items: [{title: undefined }]}
    ];

    const actualResult = createMenuData(data);
    expect(actualResult).toMatchObject(expectedResult);
  });
});
