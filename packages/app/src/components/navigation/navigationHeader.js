import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
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
    paddingTop: StatusBar.currentHeight + 10,
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

const renderImage = parentDrawer =>
  parentDrawer ? (
    <Image source={backIcon} style={styles.image} />
  ) : (
    <View style={styles.image} />
  );

const DrawerHeader = ({ navigateToCallback, isParentMenu }) => (
  <TouchableOpacity onPress={() => navigateToCallback()}>
    <View style={styles.menuHeader}>
      {renderImage(isParentMenu)}
      <Text style={styles.menuHeaderText}>Component List</Text>
    </View>
    <MenuSeparator />
  </TouchableOpacity>
);

DrawerHeader.propTypes = {
  navigateToCallback: PropTypes.func.isRequired,
  isParentMenu: PropTypes.func.isRequired
};

export default DrawerHeader;
