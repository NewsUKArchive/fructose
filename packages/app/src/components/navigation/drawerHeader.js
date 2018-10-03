
import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import backIcon from "./back-icon.png"


const styles = StyleSheet.create({
    menuHeader: {
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        paddingVertical: 28,
        paddingLeft: 17,
        paddingTop: StatusBar.currentHeight + 10,
        alignItems: 'center',
    },
    menuSeparator: {
      backgroundColor: "gray",
      height: StyleSheet.hairlineWidth,
      width: "100%",
      margin: 4
    },
    image: {
        width: 40,
        height: 40
    }
  });
const MenuSeparator = () => <View style={styles.menuSeparator} />;

const renderImage = (parentDrawer) => 
    parentDrawer ? ( <Image
        source={backIcon}
        style={styles.image}
        />
    )  : <View style={styles.image} />


const DrawerHeader = ({ navigateToCallback, parentDrawer }) => (
	<TouchableOpacity onPress={() => navigateToCallback('Home')}>
		<View
			style={styles.menuHeader}
		>
        {renderImage(parentDrawer)}
        <Text style={{ color: '#FFF', paddingLeft: 9, fontSize: 16 }}>
            Component List
        </Text>    
		</View>
        <MenuSeparator />
	</TouchableOpacity>
);

export default DrawerHeader;