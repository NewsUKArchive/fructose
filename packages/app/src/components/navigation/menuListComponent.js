import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import NestedListview, { NestedRow } from 'react-native-nested-listview';
import createMenuData from "./menuDataGenerator";


const styles = StyleSheet.create({
  menuHeader: {
    fontSize: 24,
    margin: 4,
    marginBottom: 8,
    color: "white",
    textAlign: "center"
  },
  menuItem: {
    margin: 8
  },
  menuItemText: {
    color: "white",
    fontSize: 18
  },
  menuSeparator: {
    backgroundColor: "gray",
    height: StyleSheet.hairlineWidth,
    width: "90%",
    margin: 2
  }
});


const menuNode = (node, level) => (
  <NestedRow
  level={level}
  style={styles.row}
>
  <Text>{node.title}</Text>
</NestedRow>
)
export default class MenuList extends Component {
  constructor(props) {
    super(props);
    this.preparedMenuItems = createMenuData(props.menuItems);
  }

  handleNodePress(node) {
    console.warn(node)
    if (node.items) {
      return node.items[0].title ? null : this.props.onMenuItemPress(node.title) 
    }
    return this.props.onMenuItemPress(node.componentName)
  }


  render() {
    return (
      <NestedListview
      data={this.preparedMenuItems}
      getChildrenName={(node) => 'items'}
      renderNode={(node, level) => menuNode(node, level)} 
      onNodePressed={(node) => this.handleNodePress(node)}
      />
     
    );
  }
}

MenuList.propTypes = {
  menuHeader: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMenuItemPress: PropTypes.func.isRequired
};

