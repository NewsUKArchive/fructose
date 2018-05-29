/* eslint-disable no-param-reassign */
export default arr =>
  arr.reduce((menuItems, item) => {
    const split = item.split("/");
    const parent = split[0];
    const child = split[1];

    if (!child) return menuItems;

    let section = menuItems.find(sections => sections.title === parent);

    if (!section) {
      section = {};
      section.data = [];
      section.title = parent;
      menuItems.push(section);
    }

    section.data.push(child);

    return menuItems;
  }, []);
