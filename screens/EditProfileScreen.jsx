import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Keyboard,
} from "react-native";
import { baseUrl, getApiOptions } from "../config/apiConfig";
import { AuthContext } from "../context/auth_context";
import axios from "axios";
import { COLORS } from "../constants";
import { useToast } from "react-native-toast-notifications";

const EditProfileScreen = () => {
	const [userData, setUserData] = useState({
		name: "",
		phone: "",
		city: "",
	});
	const authCtx = useContext(AuthContext);
	const toast = useToast();

	useEffect(() => {
		const fetchUserInfo = async () => {
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/my_account`;
			try {
				const response = await axios.request(options);
				setUserData(response.data);
			} catch (error) {
				alert("Error!");
			}
		};

		fetchUserInfo();
	}, []);

	const handleChangeName = text => {
		setUserData({ ...userData, name: text });
	};

	const handleChangePhone = text => {
		setUserData({ ...userData, phone: text });
	};

	const handleChangeCity = text => {
		setUserData({ ...userData, city: text });
	};

	const handleSubmit = async () => {
		const body = {
			name: userData.name,
			city: userData.city,
			phone: userData.phone,
		};
		let options = getApiOptions(authCtx.token, "PATCH", body);
		options.url = `${baseUrl}/my_account`;
		try {
			const response = await axios.request(options);
			setUserData(response.data);
			toast.show("Profile changed successfully!", {
				type: "success",
			});
		} catch (error) {
			alert("Error!");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.profileInfo}>Profile information</Text>

			<View style={styles.profilePictureContainer}>
				<Image
					source={require("../assets/images/profile2.png")}
					style={styles.profilePicture}
				/>
			</View>
			<View style={styles.userInfoContainer}>
				<Text style={styles.labels}>Fullname</Text>
				<TextInput
					style={styles.input}
					placeholder="Name"
					value={userData.name}
					onChangeText={handleChangeName}
					blurOnSubmit={true}
				/>
				<Text style={styles.labels}>Phone number</Text>
				<TextInput
					style={styles.input}
					placeholder="Phone"
					value={userData.phone}
					onChangeText={handleChangePhone}
					blurOnSubmit={true}
				/>
				<Text style={styles.labels}>City</Text>
				<TextInput
					style={styles.input}
					placeholder="City"
					value={userData.city}
					onChangeText={handleChangeCity}
					blurOnSubmit={true}
				/>
				<TouchableOpacity
					style={styles.editProfileButton}
					onPress={handleSubmit}
				>
					<Text style={styles.editProfileButtonText}>Submit changes</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	profilePictureContainer: {
		marginBottom: 20,
	},
	profilePicture: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: COLORS.gray,
		borderWidth: 2,
		borderColor: COLORS.orange, // Highlight the border with an accent color
	},
	editProfileButton: {
		width: "100%",
		backgroundColor: COLORS.secondary, // Highlight the button with an accent color
		paddingVertical: 15,
		alignItems: "center",
		borderRadius: 5,
		marginTop: 20, // Add margin to separate it from the inputs
	},
	editProfileButtonText: {
		color: "white",
		fontSize: 16,
	},
	userInfoContainer: {
		width: "80%",
	},
	userInfoLabel: {
		fontWeight: "bold", // Make the labels bold
		color: COLORS.orange, // Highlight the labels with an accent color
		fontSize: 16,
	},
	input: {
		borderBottomWidth: 1,
		borderColor: COLORS.gray, // Border color matches the profile picture
		marginBottom: 20,
		fontSize: 16,
		paddingVertical: 10, // Increase padding for better readability
	},
	profileInfo: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 30,
		marginTop: -50,
	},
	labels: {
		fontSize: 14,
		fontWeight: "bold",
	},
});

export default EditProfileScreen;
