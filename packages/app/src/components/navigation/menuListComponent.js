import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import NestedListView, { NestedRow } from "react-native-nested-listview";
import createMenuData from "./createMenuData";

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

const MenuNode = props => {
  if (props.node.title) {
    return (
      <NestedRow level={props.level}>
        <Text style={styles.menuItem}>{props.node.title}</Text>
        <MenuSeparator />
      </NestedRow>
    );
  }
  return null;
};

MenuNode.propTypes = {
  node: PropTypes.shape().isRequired,
  level: PropTypes.shape().isRequired
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
        <NestedListView
          data={this.preparedMenuItems}
          getChildrenName={() => "items"}
          renderNode={(node, level) => <MenuNode node={node} level={level} />}
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
