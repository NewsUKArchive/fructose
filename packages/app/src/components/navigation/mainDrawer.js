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

import ParentNavigationItem from "./parentNavigationItem";


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
const getParentComponentNames = obj => [
  ...new Set(obj.map(item => item.key.split('/')[0]))
];


class MainDrawer extends Component {
  constructor({items, ...restProps}) {
    super();

      console.warn(restProps)
    this.items = items;
    this.restProps = restProps;

    this.state = {
      parentDrawer: true
    };

   
    this.parents = getParentComponentNames(this.items);
  }

   renderParentItems(parentsToRender){
     return parentsToRender.map(item => (<ParentNavigationItem key={item} label={item} onPress={() => {
      this.setState({
        currentComponent: item,
        parentDrawer: false,
        selectedParent: item})
    }} />) )
   } 


  render() {
    if (this.state.parentDrawer) {
      return (
        <ScrollView>
          <TouchableOpacity style={styles.parentDrawerTouch} />
          {this.renderParentItems(this.parents)}
        </ScrollView>
      );
    }


    const items = this.items.filter(item => item.key.split('/')[0] === this.state.selectedParent)
    
    
    return (
      <ScrollView>
        <DrawerItems items={items} {...this.restProps}/> 
      </ScrollView>
    )
  }
}

export default MainDrawer;


