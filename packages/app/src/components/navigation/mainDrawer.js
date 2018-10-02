import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  DrawerItems,
  SafeAreaView,
  createDrawerNavigator
} from 'react-navigation';

const styles = StyleSheet.create({
  parentDrawerTouch: {
    paddingLeft: 13,
    paddingTop: 15
  },
  header: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  },
  version: {
    padding: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'left'
  },
  text: {
    paddingTop: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  view: {
    backgroundColor: 'lightpink',
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1
  }
});
const getParents = obj => [
  ...new Set(Object.keys(obj).map(item => item.split('/')[0]))
];

class MainDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentDrawer: false
    };

    this.parents = getParents(props.navigation.router.childRouters);
  }

  render() {
    if (this.state.parentDrawer) {
      return (
        <ScrollView>
          <TouchableOpacity style={styles.parentDrawerTouch} />
          {this.parents.map(parent => <Text>{parent}</Text>)}
        </ScrollView>
      );
    }
    return <Text>test</Text>;
  }
}

export default MainDrawer;

// const wrapper = navigationList => props => {
//   const parent = parents(navigationList);

//   return (
//     <ScrollView>
//       <SafeAreaView
//         style={styles.container}
//         forceInset={{ top: 'always', horizontal: 'never' }}
//       >
//         <Text>Header</Text>
//         <DrawerItems {...props} />
//         <Text>Footer</Text>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// const getMenuData = items => {
//   // console.warn(items);
//   const tings = Object.keys(items).reduce((obj, value) => {
//     const parent = value.split('/')[0];

//     if (!obj[parent]) {
//       obj[parent] = {
//         rendered: false,
//         children: []
//       };
//     }

//     obj[parent].children.push({ [value]: items[value] });

//     return obj;
//   }, {});
//   console.warn(tings);
// };

// export default MainDrawer;
