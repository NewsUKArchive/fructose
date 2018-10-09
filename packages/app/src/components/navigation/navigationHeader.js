import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import backIcon from "./back-icon.png";

const styles = StyleSheet.create({
  menuHeaderText: {
    color: "gray",
    textAlign: "center",
    fontSize: 20
  },
  menuHeader: {
    flexDirection: "row",
    backgroundColor: "skyblue",
    paddingVertical: 28,
    paddingLeft: 17,
    alignItems: "center"
  },
  menuSeparator: {
    backgroundColor: "gray",
    height: StyleSheet.hairlineWidth,
    width: "100%"
  },
  image: {
    width: 40,
    height: 40
  }
});

const MenuSeparator = () => <View style={styles.menuSeparator} />;

const renderImage = isParentMenu =>
  isParentMenu ? (
    <View style={styles.image} />
  ) : (
    <Image source={backIcon} style={styles.image} />
  );

const NavigationHeader = ({ navigateToCallback, isParentMenu }) => (
  <TouchableOpacity onPress={() => navigateToCallback()}>
    <View style={styles.menuHeader}>
      {renderImage(isParentMenu())}
      <Text style={styles.menuHeaderText}>Component List</Text>
    </View>
    <MenuSeparator />
  </TouchableOpacity>
);

NavigationHeader.propTypes = {
  navigateToCallback: PropTypes.func.isRequired,
  isParentMenu: PropTypes.func.isRequired
};

export default NavigationHeader;
