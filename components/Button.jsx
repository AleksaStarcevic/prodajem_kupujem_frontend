import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants";

function Button({ children, onPress }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<View>
				<Text style={styles.buttonText}>{children}</Text>
			</View>
		</Pressable>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 24,
		backgroundColor: COLORS.primary,
		elevation: 2,
		shadowColor: "black",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		width: "100%",
	},
	buttonText: {
		textAlign: "center",
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	buttonDisabled: {
		backgroundColor: "#bdbdbd",
	},
	buttonTextDisabled: {
		color: "#888",
	},
	errorText: {
		color: "red",
		marginTop: 4,
		fontSize: 14,
	},
});
