import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import forwardIcon from "./forward-icon.png"

const styles = StyleSheet.create({
    menuHeaderText: { 
		color: 'gray',  
		fontSize: 14, 
		fontWeight: 'bold' 
	},
	button: {
		paddingTop: 21,
		paddingBottom: 16,
		paddingLeft: 15,
		paddingRight: 10,
	},
	image: {
        width: 20,
        height: 20
    }
});
	
const ParentNavigationItem = ({ label, onPress }) => (
	
	<TouchableOpacity
		onPress={onPress}
		style={styles.button}
	>
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Text style={styles.menuHeaderText}> {label}</Text>
			 <Image
        source={forwardIcon}
        style={styles.image}
        />
		</View>
	</TouchableOpacity>
);

export default ParentNavigationItem;