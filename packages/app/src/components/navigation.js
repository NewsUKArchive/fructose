import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import SideMenu from "react-native-side-menu";

const styles = StyleSheet.create({
  menuHeader: {
    fontSize: 24,
    margin: 4,
    marginBottom: 8,
    color: "black"
  },
  menu: {
    backgroundColor: "#DCDCDC"
  },
  menuItem: {
    margin: 8
  },
  menuItemText: {
    fontSize: 18
  },
  menuSeparator: {
    backgroundColor: "gray",
    height: StyleSheet.hairlineWidth,
    width: "100%"
  }
});

const menuHeader = () => <Text style={styles.menuHeader}>Components</Text>;

const menuSeparator = () => <View style={styles.menuSeparator} />;

export default class NavigationWrapper extends Component {
  constructor(props) {
    super(props);
    this.componentList = this.props.componentList.map(item => ({ key: item }));
  }

  onMenuItemPress(id) {
    this.props.events.emit("load", id);
  }

  menuRow(componentId) {
    return (
      <TouchableHighlight
        style={styles.menuItem}
        onPress={() => this.onMenuItemPress(componentId)}
      >
        <Text style={styles.menuItemText}>{componentId}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const menu = (
      <View>
        <FlatList
          ListHeaderComponent={menuHeader}
          data={this.componentList}
          renderItem={({ item }) => this.menuRow(item.key)}
          ItemSeparatorComponent={menuSeparator}
        />
      </View>
    );

    return (
      <SideMenu style={styles.menu} menu={menu} isOpen={false}>
        {this.props.children}
      </SideMenu>
    );
  }
}

NavigationWrapper.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.element.isRequired
};
