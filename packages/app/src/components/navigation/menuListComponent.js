import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import NestedListview, { NestedRow } from "react-native-nested-listview";
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
    margin: 10,
    color: "gray",
    fontSize: 20
  },
  menuSeparator: {
    backgroundColor: "gray",
    height: StyleSheet.hairlineWidth,
    width: "90%",
    margin: 2
  }
});

const MenuSeparator = () => <View style={styles.menuSeparator} />;

const menuNode = (node, level) => {
  if (node.title) {
    return (
      <NestedRow level={level}>
        <Text style={styles.menuItem}>{node.title}</Text>
        <MenuSeparator />
      </NestedRow>
    );
  }
  return null;
};

export default class MenuList extends Component {
  constructor(props) {
    super(props);
    this.preparedMenuItems = createMenuData(props.menuItems);
  }

  handleNodePress(node) {
    if (node.items) {
      return node.items[0].title
        ? null
        : this.props.onMenuItemPress(node.title);
    }
    return this.props.onMenuItemPress(node.componentName);
  }

  render() {
    return (
      <View>
        <Text style={styles.menuHeader}>Component List</Text>
        <NestedListview
          data={this.preparedMenuItems}
          getChildrenName={() => "items"}
          renderNode={(node, level) => menuNode(node, level)}
          onNodePressed={node => this.handleNodePress(node)}
        />
      </View>
    );
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMenuItemPress: PropTypes.func.isRequired
};
