import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const ParentNavigationItem = ({ label, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={{
			paddingTop: 21,
			paddingBottom: 16,
			paddingLeft: 15,
			paddingRight: 10,
		}}
	>
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Text> {label}</Text>
		</View>
	</TouchableOpacity>
);

export default ParentNavigationItem;