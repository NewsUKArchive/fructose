import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SideMenu from "react-native-side-menu";
import MenuList from "./menuListComponent";

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#DCDCDC"
  }
});

const NavigationWrapper = props => {
  const menu = (
    <MenuList
      menuHeader="Components"
      menuItems={props.componentList}
      onMenuItemPress={props.loadComponent}
    />
  );

  return (
    <SideMenu style={styles.menu} menu={menu} isOpen={false}>
      {props.children}
    </SideMenu>
  );
};

NavigationWrapper.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadComponent: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default NavigationWrapper;
