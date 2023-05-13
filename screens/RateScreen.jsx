import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { AuthContext } from "../context/auth_context";

const RateScreen = () => {
	const [isPositive, setIsPositive] = useState(true);
	const route = useRoute();
	const user = route.params.user;
	const [userAdvertisements, setUserAdvertisements] = useState([]);
	const [selectedTitle, setSelectedTitle] = useState("");
	const [selectedAd, setSelectedAd] = useState({});
	const [feedBack, setFeedback] = useState("");
	const authCtx = useContext(AuthContext);
	const handlePositivePress = () => {
		setIsPositive(true);
	};

	const handleNegativePress = () => {
		setIsPositive(false);
	};

	const handleTitleChange = (title, index) => {
		const selectedAd = userAdvertisements[index - 1];
		setSelectedTitle(title);
		setSelectedAd({ id: selectedAd.id, title: selectedAd.title });
	};

	const handleFormSubmit = async () => {
		const options = {
			method: "POST",
			url: `http://192.168.0.101:8080/api/v1/user/${parseInt(
				user.id
			)}/advertisements/${parseInt(selectedAd.id)}/rating`,
			data: JSON.stringify({
				description: feedBack,
				satisfied: isPositive,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.token}`,
			},
		};
		try {
			const response = await axios.request(options);
			ToastAndroid.show(`Successfully rated user`, ToastAndroid.SHORT);
		} catch (error) {
			ToastAndroid.show(`Error, ${error.response.data}`, ToastAndroid.SHORT);
			console.log(error.response.data);
		}
	};

	useEffect(() => {
		const fetchUsersAds = async () => {
			const options = {
				method: "GET",
				url: `http://192.168.0.101:8080/api/v1/user/${parseInt(
					user.id
				)}/advertisements`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCtx.token}`,
				},
			};
			try {
				const response = await axios.request(options);
				setUserAdvertisements(response.data);
			} catch (error) {
				ToastAndroid.show(
					error.response ? error.response : "Error",
					ToastAndroid.SHORT
				);
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
					<Picker
						style={styles.titlePicker}
						selectedValue={selectedTitle}
						onValueChange={handleTitleChange}
					>
						<Picker.Item label="Select advertisement" value="" />
						{userAdvertisements.map(ad => (
							<Picker.Item key={ad.id} label={ad.title} value={ad.title} />
						))}
					</Picker>
				</View>
			</View>

			<View style={styles.formContainer}>
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

				<Text style={styles.label}>Your Feedback</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Type your feedback here"
					multiline
					numberOfLines={4}
					onChangeText={newText => setFeedback(newText)}
					value={feedBack}
				/>

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
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	userContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	userAvatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10,
		overflow: "hidden",
	},
	avatarImage: {
		width: "100%",
		height: "100%",
	},
	userInfo: {
		flex: 1,
		justifyContent: "center",
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#333",
	},
	adTitle: {
		fontSize: 16,
		color: "#666",
	},
	formContainer: {
		flex: 1,
	},
	label: {
		fontSize: 16,
		marginBottom: 12,
		color: "#333",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	thumbButton: {
		padding: 10,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 10,
	},
	thumbImage: {
		width: 20,
		height: 20,
	},
	activeThumb: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.gray,
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
		maxHeight: 200,
		color: "#333",
	},
	submitButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginTop: 20,
		alignItems: "center",
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default RateScreen;
