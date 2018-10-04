import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity, 
  PropTypes
} from 'react-native';
import io from "socket.io-client";
import {
  DrawerItems,
} from 'react-navigation';
import NavigationHeader from "./navigationHeader";
import ParentNavigationItem from "./parentNavigationItem";

const config = {
  transports: ["websocket"],
  query: {
    clientType: "app"
  }
};

const fructoseServerUrlerverUrl = "http://localhost:7811"

const styles = StyleSheet.create({
  isParentMenuTouch: {
    paddingLeft: 13,
    paddingTop: 15
  },
  header: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  },
  version: {
    padding: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'left'
  },
  text: {
    paddingTop: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  view: {
    backgroundColor: 'lightpink',
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1
  }
});

const getParentComponentNames = obj => [
  ...new Set(obj.map(item => item.key.split('/')[0]).filter(parent => parent !== 'Home'))
];

class Navigation extends Component {
  constructor({items, ...restProps}) {
    super();
    this.socket = io(fructoseServerUrlerverUrl, config);
    this.items = items;
    this.restProps = restProps;
    this.allComponentNames = this.items.map(component => component.key).filter(component => component !== 'Home')
    this.parentComponentNames = getParentComponentNames(this.items);
    this.navigateToCallback = this.navigateToCallback.bind(this)

    this.state = {
      isParentMenu: true
    };
  }

   componentDidMount() {
    this.socket.on('load-component-in-app', componentToLoadInApp => {
      this.restProps.navigation.navigate(componentToLoadInApp)

    });
    
    this.socket.on(
      'get-loaded-app-components', () =>
      this.socket.emit(
        'send-loaded-app-components',
        this.allComponentNames
      )
    );

    this.socket.emit('fructose-app-ready');
  }

  componentDidUpdate() {
    this.socket.emit('component-loaded-in-app');
  }

  navigateToCallback() {
		this.setState({ isParentMenu: true });
	};


   renderParentItems(parentsToRender){
     return parentsToRender.map(item => (<ParentNavigationItem key={item} label={item} onPress={() => {
      this.setState({
        isParentMenu: false,
        selectedParent: item
      })
    }} 
    />) )
   } 


   render() {
    if (this.state.isParentMenu) {
      return ([
        <NavigationHeader navigateToCallback={this.navigateToCallback} key='header' />,
        <ScrollView key='scroll'>
          <TouchableOpacity style={styles.isParentMenuTouch} />
          {this.renderParentItems(this.parentComponentNames)}
        </ScrollView>
      ]);
    }

    const childrenComponents = this.items.filter(item => item.key.split('/')[0] === this.state.selectedParent)
    
    return ([
      <NavigationHeader key='header' isParentMenu={() => this.state.isParentMenu} navigateToCallback={this.navigateToCallback} />,
      <ScrollView key='scroll'>
        <DrawerItems key='items' items={childrenComponents} {...this.restProps}/> 
      </ScrollView>
    ])
  }
  
}

// Navigation.propTypes = {
//   components: PropTypes.objectOf(PropTypes.func).isRequired,
//   comms: PropTypes.shape({
//     events: PropTypes.shape({
//       emit: PropTypes.func.isRequired,
//       on: PropTypes.func.isRequired
//     }).isRequired,
//     socket: PropTypes.shape({
//       emit: PropTypes.func.isRequired,
//       on: PropTypes.func.isRequired
//     }).isRequired
//   }).isRequired
// };

export default Navigation;


