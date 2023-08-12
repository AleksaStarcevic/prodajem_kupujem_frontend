import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS, SIZES } from "../constants";
import axios from "axios";
import UserRating from "../components/UserRating";
import { AuthContext } from "../context/auth_context";
const UserRatingsScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const user = route.params.user;
	const numOfLikes = route.params.numOfLikes;
	const [ratedAds, setRatedAds] = useState([]);
	const [isPositive, setIsPositive] = useState(true);
	const authCtx = useContext(AuthContext);
	useEffect(() => {
		const fetchRatedAds = async () => {
			const search = isPositive ? "positive" : "negative";

			const options = {
				method: "GET",
				url: `http://192.168.0.107:8080/api/v1/user/${parseInt(
					user.id
				)}/ratedAdvertisements?rate=${search}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCtx.token}`,
				},
			};
			try {
				const response = await axios.request(options);
				setRatedAds(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};

		fetchRatedAds();
	}, [isPositive]);
	console.log(user);
	console.log(authCtx.email);
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<Text style={styles.username}>{user.name}</Text>
				<View style={styles.userInfoItem}>
					<Ionicons
						name="phone-portrait"
						size={18}
						color="#555"
						style={styles.userInfoIcon}
					/>
					<Text style={styles.userPhone}>{user.phone}</Text>
				</View>
				<View style={styles.userInfoItem}>
					<Ionicons
						name="location-sharp"
						size={24}
						color="#555"
						style={styles.userInfoIcon}
					/>
					<Text style={styles.userCity}>{user.city}</Text>
				</View>
				{user.email !== authCtx.email && (
					<TouchableOpacity
						style={styles.rateButton}
						onPress={() => navigation.navigate("RateUser", { user })}
					>
						<Text style={styles.rateButtonText}>Rate User</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.ratingContainer}>
				<TouchableOpacity
					style={[styles.likeContainer, isPositive ? styles.activeIcon : null]}
					onPress={() => setIsPositive(true)}
				>
					<Ionicons
						name="thumbs-up"
						size={24}
						color={isPositive ? "green" : "#555"}
					/>
					<Text style={isPositive ? styles.activeText : styles.likeText}>
						{numOfLikes.likes}
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
						{numOfLikes.dislikes}
					</Text>
				</TouchableOpacity>
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
		backgroundColor: COLORS.tertiary,
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
		flexDirection: "row",
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
		backgroundColor: COLORS.tertiary,
		borderRadius: 10,
		padding: 7,
		color: "#fff",
	},
	activeText: {
		color: "#fff",
		fontSize: 18,
		marginLeft: 5,
	},
});
