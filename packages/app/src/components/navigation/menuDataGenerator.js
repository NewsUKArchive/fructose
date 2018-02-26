const createObjectStructure = menuArray =>
  menuArray.map(item => {
    const split = item.split("/");
    const parent = split[0];
    const child = split[1];

    return {
      title: parent,
      items: [
        {
          title: child,
          componentName: item
        }
      ]
    };
  }, []);

const flattenDistinctObjects = array => {
  const sortedArray = array.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  return sortedArray.reduce((collection, currentObject, index) => {
    if (index !== 0) {
      if (collection[collection.length - 1].title === currentObject.title) {
        collection[collection.length - 1].items.push(...currentObject.items);
      } else {
        collection.push(currentObject);
      }
    } else {
      collection.push(currentObject);
    }
    return collection;
  }, []);
};

const createMenuData = flatArray => {
  const menuDataStructure = createObjectStructure(flatArray);
  return flattenDistinctObjects(menuDataStructure);
};

export default createMenuData;
