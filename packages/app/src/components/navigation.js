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
    this.fructoseApp = this.props.app(this.props.loadComponents);
    this.state = {
      components: [],
      isMenuOpen: true
    };
  }

  componentDidMount() {
    const events = this.props.events.eventEmitter;
    const socket = this.props.events.socket;

    socket.on("loaded-app-components", cs => {
      this.setState({
        components: cs.map(item => ({ key: item }))
      });
    });

    events.emit("publish-component-store");
  }

  onMenuItemPress(id) {
    this.props.events.eventEmitter.emit("load", id);
    this.setState({ isMenuOpen: false });
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
          data={this.state.components}
          renderItem={({ item }) => this.menuRow(item.key)}
          ItemSeparatorComponent={menuSeparator}
        />
      </View>
    );

    return (
      <SideMenu style={styles.menu} menu={menu} isOpen={this.state.isMenuOpen}>
        {this.fructoseApp()}
      </SideMenu>
    );
  }
}

NavigationWrapper.propTypes = {
  app: PropTypes.func.isRequired,
  loadComponents: PropTypes.func.isRequired,
  events: PropTypes.shape({
    eventEmitter: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  }).isRequired
};
