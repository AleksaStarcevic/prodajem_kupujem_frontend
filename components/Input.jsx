import { View, Text, TextInput, StyleSheet } from "react-native";

import { COLORS } from "../constants";

function Input({
	label,
	keyboardType,
	secure,
	onUpdateValue,
	value,
	isInvalid,
}) {
	return (
		<View style={styles.inputContainer}>
			<Text style={[styles.label, isInvalid && styles.labelInvalid]}>
				{label}
			</Text>
			<TextInput
				style={[styles.input, isInvalid && styles.inputInvalid]}
				keyboardType={keyboardType}
				secureTextEntry={secure}
				onChangeText={onUpdateValue}
				value={value}
			/>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 8,
	},
	label: {
		color: "#999",
		marginBottom: 4,
		fontWeight: "500",
	},
	labelInvalid: {
		color: "red",
	},
	input: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "#f4f4f4",
		borderRadius: 8,
		fontSize: 16,
		color: "#333",
	},
	inputInvalid: {
		backgroundColor: "#ffd5d5",
	},
});
