import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";

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

const menuHeader = headerText => (
  <Text style={styles.menuHeader}>{headerText}</Text>
);

const menuSeparator = () => <View style={styles.menuSeparator} />;

const prepareMenuItems = menuArray => menuArray.map(item => ({ key: item }));

export default class MenuList extends Component {
  constructor(props) {
    super(props);
    this.preparedMenuItems = prepareMenuItems(props.menuItems);
  }

  menuRow(itemId) {
    return (
      <TouchableHighlight
        style={styles.menuItem}
        onPress={() => this.props.onMenuItemPress(itemId)}
      >
        <Text style={styles.menuItemText}>{itemId}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <FlatList
        ListHeaderComponent={menuHeader(this.props.menuHeader)}
        data={this.preparedMenuItems}
        renderItem={({ item }) => this.menuRow(item.key)}
        ItemSeparatorComponent={menuSeparator}
      />
    );
  }
}

MenuList.propTypes = {
  menuHeader: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMenuItemPress: PropTypes.func.isRequired
};
