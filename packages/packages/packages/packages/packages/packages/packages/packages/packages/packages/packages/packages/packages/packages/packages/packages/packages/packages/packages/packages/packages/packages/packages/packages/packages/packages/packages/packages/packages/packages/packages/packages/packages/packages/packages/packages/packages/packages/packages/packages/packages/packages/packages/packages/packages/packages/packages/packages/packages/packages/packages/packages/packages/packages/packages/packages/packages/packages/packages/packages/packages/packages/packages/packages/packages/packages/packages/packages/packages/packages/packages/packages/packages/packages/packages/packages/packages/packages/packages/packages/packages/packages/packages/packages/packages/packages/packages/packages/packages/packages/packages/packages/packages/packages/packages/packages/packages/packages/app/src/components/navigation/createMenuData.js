/* eslint-disable no-param-reassign */
export default arr => {
  const menuItemCollection = arr.reduce((menuItems, item) => {
    const split = item.split("/");
    const parent = split[0];
    const child = split[1];

    if (!menuItems[parent]) {
      menuItems[parent] = {};
      menuItems[parent].items = [];
      menuItems[parent].title = parent;
    }

    menuItems[parent].items.push({
      componentName: item,
      title: child
    });

    return menuItems;
  }, {});

  return Object.keys(menuItemCollection)
    .map(item => {
      menuItemCollection[item].items.sort((a, b) => a.title > b.title);
      return menuItemCollection[item];
    })
    .sort((a, b) => a.title > b.title);
};
