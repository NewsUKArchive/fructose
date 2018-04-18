import createMenuData from "./createMenuData";

describe("menu Data Generator", () => {
  it("creates correct data structure ", () => {
    const data = [
      "parent1/parent1child",
      "parent1/parent1child2",
      "parent2/parent2child",
      "parent2/parent2child2",
      "parent1/parent1child3",
      "parent3"
    ];

    const expectedResult = [
      {
        items: [
          {
            componentName: "parent1/parent1child",
            title: "parent1child"
          },
          {
            componentName: "parent1/parent1child2",
            title: "parent1child2"
          },
          {
            componentName: "parent1/parent1child3",
            title: "parent1child3"
          }
        ],
        title: "parent1"
      },
      {
        items: [
          {
            componentName: "parent2/parent2child",
            title: "parent2child"
          },
          {
            componentName: "parent2/parent2child2",
            title: "parent2child2"
          }
        ],
        title: "parent2"
      },
      {
        items: [
          {
            componentName: "parent3",
            title: undefined
          }
        ],
        title: "parent3"
      }
    ];

    const actualResult = createMenuData(data);
    expect(actualResult).toMatchObject(expectedResult);
  });
});
