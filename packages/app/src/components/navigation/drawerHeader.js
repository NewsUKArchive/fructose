
import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import backIcon from "./back-icon.png"


const styles = StyleSheet.create({
    menuHeaderText: { color: 'gray', paddingLeft: 5, fontSize: 20 

    },
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
	<TouchableOpacity onPress={() => navigateToCallback()}>
		<View
			style={styles.menuHeader}
		>
        {renderImage(parentDrawer)}
        <Text style={styles.menuHeaderText}>
            Component List
        </Text>    
		</View>
        <MenuSeparator />
	</TouchableOpacity>
);

export default DrawerHeader;