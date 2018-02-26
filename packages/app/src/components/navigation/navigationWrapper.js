import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import SideMenu from "react-native-side-menu";
import MenuList from "./menuListComponent";

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "lightblue",
    height: "100%",
    width: "100%"
  }
});

export default class NavigationWrapper extends Component {
  constructor(props) {
    super(props);
    this.onMenuItemPress = this.onMenuItemPress.bind(this);
  }

  onMenuItemPress(id) {
    this.props.events.emit("load", id);
  }

  render() {
    const menu = (
      <MenuList
        menuHeader="Components"
        menuItems={this.props.componentList}
        onMenuItemPress={this.onMenuItemPress}
      />
    );

    return (
      <View style={styles.menu}>
        <SideMenu menu={menu} isOpen={false}>
          {this.props.children}
        </SideMenu>
      </View>
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
