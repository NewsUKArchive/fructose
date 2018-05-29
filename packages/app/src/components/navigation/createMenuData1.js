/* eslint-disable no-param-reassign */
export default arr => 
   arr.reduce((menuItems, item) => {
    const split = item.split("/");
    const parent = split[0];
    const child = split[1];
    

    let section = menuItems.find(section => section.title === parent)

    if (!section) {
      section = {};
      section.data = [];
      section.title = parent;
      menuItems.push(section);
    }

    section.data.push(child)

    // for(const section in menuItems) {
    //   if(section.title === parent) {
    //     if(!section.data) {section.data = []}
    //     section.data.push(child)
    //   }
    // }
  
    console.log(menuItems);
    return menuItems
  }, []);
