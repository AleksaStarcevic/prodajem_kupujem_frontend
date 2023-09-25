import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { AuthContext } from "../context/auth_context";
import { baseUrl, getApiOptions } from "../config/apiConfig";
import { useToast } from "react-native-toast-notifications";

const RateScreen = () => {
	const [isPositive, setIsPositive] = useState(true);
	const route = useRoute();
	const user = route.params.user;
	const adId = route.params.adId;
	const [userAdvertisements, setUserAdvertisements] = useState([]);
	const [feedBack, setFeedback] = useState("");
	const authCtx = useContext(AuthContext);
	const handlePositivePress = () => {
		setIsPositive(true);
	};
	const toast = useToast();

	const handleNegativePress = () => {
		setIsPositive(false);
	};

	const handleFormSubmit = async () => {
		let options = getApiOptions(authCtx.token, "POST", {
			description: feedBack,
			satisfied: isPositive,
		});
		options.url = `${baseUrl}/user/${parseInt(
			user.id
		)}/advertisements/${parseInt(adId)}/rating`;
		try {
			const response = await axios.request(options);
			toast.show("Successfully rated user", {
				type: "success",
			});
		} catch (error) {
			toast.show(`Error, ${error.response.data}`, {
				type: "danger",
			});
		}
	};

	useEffect(() => {
		const fetchUsersAds = async () => {
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/user/${parseInt(user.id)}/advertisements`;
			try {
				const response = await axios.request(options);
				setUserAdvertisements(response.data);
			} catch (error) {
				toast.show(error.response ? error.response : "Error", {
					type: "danger",
				});
			}
		};

		fetchUsersAds();
	}, []);

	console.log(feedBack);

	return (
		<View style={styles.container}>
			<View style={styles.userContainer}>
				<View style={styles.userInfo}>
					<Text style={styles.username}>Rating for user: {user.name}</Text>
				</View>
			</View>

			<View style={styles.formContainer}>
				<Text style={styles.label}>Your Feedback</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Type your feedback here"
					multiline
					numberOfLines={4}
					onChangeText={newText => setFeedback(newText)}
					value={feedBack}
				/>
				<Text style={styles.label}>Your Rating</Text>
				<View style={styles.ratingContainer}>
					<TouchableOpacity
						onPress={handlePositivePress}
						style={[styles.thumbButton, isPositive && styles.activeThumb]}
					>
						<Ionicons
							name="thumbs-up"
							size={24}
							color={isPositive ? "green" : "#555"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleNegativePress}
						style={[styles.thumbButton, !isPositive && styles.activeThumb]}
					>
						<Ionicons
							name="thumbs-down"
							size={24}
							color={!isPositive ? "red" : "#555"}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					style={styles.submitButton}
					onPress={handleFormSubmit}
				>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.gray3,
		padding: 20,
		marginTop: 25,
	},
	userContainer: {
		marginBottom: 20,
	},
	userInfo: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: "#DDDDDD",
	},
	username: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	titlePicker: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
	},
	formContainer: {},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 20,
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginBottom: 30,
	},
	thumbButton: {
		width: 50,
		height: 50,
		borderWidth: 2,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	activeThumb: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		height: 100,
		marginBottom: 20,
	},
	submitButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: 15,
		alignItems: "center",
		borderRadius: 5,
	},
	submitButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default RateScreen;
