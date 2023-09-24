import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS, SIZES } from "../constants";
import axios from "axios";
import UserRating from "../components/UserRating";
import { AuthContext } from "../context/auth_context";
import { baseUrl, getApiOptions } from "../config/apiConfig";
const UserRatingsScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [ratedAds, setRatedAds] = useState([]);
	const [isPositive, setIsPositive] = useState(true);
	const [likesNumber, setLikesNumber] = useState({});
	const authCtx = useContext(AuthContext);
	useEffect(() => {
		const fetchRatedAds = async () => {
			const search = isPositive ? "positive" : "negative";
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/my_account/ratedAdvertisements?rate=${search}`;
			try {
				const response = await axios.request(options);
				setRatedAds(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};

		const fetchNumberOfLikes = async () => {
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/my_account/ratedAdvertisements/likesNumber`;
			try {
				const response = await axios.request(options);
				setLikesNumber(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};
		fetchRatedAds();
		fetchNumberOfLikes();
	}, [isPositive]);
	return (
		<View style={styles.container}>
			<View style={styles.ratingContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.textAboveButtons}>
						Ratings given to you by users:
					</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={[
							styles.likeContainer,
							isPositive ? styles.activeIcon : null,
						]}
						onPress={() => setIsPositive(true)}
					>
						<Ionicons
							name="thumbs-up"
							size={24}
							color={isPositive ? "green" : "#555"}
						/>
						<Text style={isPositive ? styles.activeText : styles.likeText}>
							{likesNumber.likes}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.dislikeContainer,
							!isPositive ? styles.activeIcon : null,
						]}
						onPress={() => setIsPositive(false)}
					>
						<Ionicons
							name="thumbs-down"
							size={24}
							color={!isPositive ? "red" : "#555"}
						/>
						<Text style={isPositive ? styles.dislikeText : styles.activeText}>
							{likesNumber.dislikes}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.ratingsListContainer}>
				{ratedAds?.map(ad => (
					<UserRating rating={ad} key={ad.id} />
				))}
			</View>
		</View>
	);
};

export default UserRatingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	userInfo: {
		backgroundColor: "#fff",
		borderRadius: 5,
		padding: 20,
		marginBottom: 20,
	},
	username: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	userPhone: {
		fontSize: 18,
		marginBottom: 5,
	},
	userCity: {
		fontSize: 18,
		marginBottom: 10,
	},
	rateButton: {
		backgroundColor: COLORS.blue,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	rateButtonText: {
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
	},
	ratingContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 5,
		padding: 20,
		marginBottom: 20,
	},
	likeContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 80,
	},
	likeText: {
		fontSize: 18,
		marginLeft: 5,
	},
	dislikeContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	dislikeText: {
		fontSize: 18,
		marginLeft: 5,
	},
	ratingsListContainer: {
		backgroundColor: "#fff",
		borderRadius: 5,
		flex: 1,
	},
	userInfoItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	userInfoIcon: {
		marginRight: 10,
	},
	activeIcon: {
		backgroundColor: COLORS.blue,
		borderRadius: 10,
		padding: 7,
		color: "#fff",
	},
	activeText: {
		color: "#fff",
		fontSize: 18,
		marginLeft: 5,
	},
	textContainer: {
		alignItems: "center", // Center the text horizontally
	},
	textAboveButtons: {
		fontSize: 18,
		fontWeight: "bold",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// backgroundColor: "#fff",
		// borderRadius: 5,
		// padding: 20,
		marginTop: 20,
	},
});
