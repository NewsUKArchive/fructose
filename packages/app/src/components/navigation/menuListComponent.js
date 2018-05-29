import React, { Component } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import PropTypes from "prop-types";
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
        <SectionList
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
          sections={this.preparedMenuItems}
        />
      </View>
    );
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMenuItemPress: PropTypes.func.isRequired
};
