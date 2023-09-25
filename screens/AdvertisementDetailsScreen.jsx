import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../context/auth_context";
import { baseUrl, getApiOptions } from "../config/apiConfig";
import { useFocusEffect } from "@react-navigation/native";

const AdvertisementDetailsScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [numberOfLikesAndDislikes, setnumberOfLikesAndDislikes] = useState({});
	const authCtx = useContext(AuthContext);
	const ad = route.params.ad;

	const handleNavigateToRatings = () => {
		navigation.navigate("User Ratings", {
			user: ad.user,
			numOfLikes: numberOfLikesAndDislikes,
			adId: ad.id,
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			const fetchLikeAndDislikeNumbers = async () => {
				let options = getApiOptions(authCtx.token, "GET", false);
				options.url = `${baseUrl}/user/${parseInt(ad.user.id)}/likesNumber`;
				try {
					const response = await axios.request(options);
					setnumberOfLikesAndDislikes(response.data);
				} catch (error) {
					alert("Error!");
					console.log(error);
				}
			};

			fetchLikeAndDislikeNumbers();
		}, [])
	);

	return (
		<ScrollView style={styles.container}>
			<Image
				source={{ uri: `data:image/jpeg;base64,${ad.picture}` }}
				style={styles.image}
			/>
			<View style={styles.content}>
				<View style={styles.dateTitle}>
					<Text style={styles.title}>{ad.title}</Text>
					{/* <View style={styles.date}>
						<Ionicons name="time" size={20} color="#555" />
						<Text style={styles.dateText}>
							{ad.creationDate.toLocaleString("ar-AE")}
						</Text>
					</View> */}
				</View>
				<View style={styles.details}>
					<Text style={styles.category}>
						Category: {ad.advertisementCategory}
					</Text>
				</View>
				<View style={styles.priceContainer}>
					<Text style={styles.price}>{`${ad.price.toLocaleString()} $`}</Text>
				</View>

				<Text style={styles.description}>{ad.description}</Text>

				<View style={styles.userInfoContainer}>
					<Text style={styles.userInfoTitle}>Seller Information</Text>
					<View style={styles.userInfoContent}>
						<View style={styles.userInfoItem}>
							<Ionicons
								name="man"
								size={24}
								color="#555"
								style={styles.userInfoIcon}
							/>
							<Text style={styles.userInfoText}>{ad.user.name}</Text>
						</View>
						<View style={styles.userInfoItem}>
							<Ionicons
								name="phone-portrait"
								size={24}
								color="#555"
								style={styles.userInfoIcon}
							/>
							<Text style={styles.userInfoText}>{ad.user.phone}</Text>
						</View>
						<View style={styles.userInfoItem}>
							<Ionicons
								name="mail"
								size={24}
								color="#555"
								style={styles.userInfoIcon}
							/>
							<Text style={styles.userInfoText}>{ad.user.email}</Text>
						</View>
						<View style={styles.userInfoItem}>
							<Ionicons
								name="location-sharp"
								size={24}
								color="#555"
								style={styles.userInfoIcon}
							/>
							<Text style={styles.userInfoText}>{ad.user.city}</Text>
						</View>
						<TouchableOpacity
							style={styles.userInfoItem}
							onPress={handleNavigateToRatings}
						>
							<View style={styles.likesContainer}>
								<Ionicons
									name="thumbs-up"
									size={24}
									color="#555"
									style={styles.likesIcon}
								/>
								<Text style={styles.likesText}>
									{numberOfLikesAndDislikes.likes}
								</Text>
							</View>
							<View style={styles.dislikesContainer}>
								<Ionicons
									name="thumbs-down"
									size={24}
									color="#555"
									style={styles.dislikesIcon}
								/>
								<Text style={styles.dislikesText}>
									{numberOfLikesAndDislikes.dislikes}
								</Text>
							</View>
						</TouchableOpacity>
						{/* <TouchableOpacity style={styles.advertisementsLink}>
							<Text style={styles.advertisementsLinkText}>
								View all advertisements
							</Text>
						</TouchableOpacity> */}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default AdvertisementDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	dateTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	image: {
		width: "100%",
		height: 250,
	},
	content: {
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	details: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	category: {
		fontSize: 16,
		color: "gray",
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
	description: {
		fontSize: 16,
		color: "gray",
		marginTop: 8,
	},
	date: {
		flexDirection: "row",
		alignItems: "center",
	},
	dateText: {
		marginLeft: 5,
		fontSize: 16,
		color: "gray",
	},
	userInfoContainer: {
		marginTop: 20,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		padding: 16,
	},
	userInfoTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	userInfoContent: {
		marginTop: 10,
	},
	userInfoItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	userInfoIcon: {
		marginRight: 10,
	},
	userInfoText: {
		fontSize: 16,
		color: "gray",
	},
	likesContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
	},
	likesIcon: {
		marginRight: 5,
		color: "black",
	},
	likesText: {
		fontSize: 16,
		color: "green",
	},
	dislikesContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	dislikesIcon: {
		marginRight: 5,
		color: "black",
	},
	dislikesText: {
		fontSize: 16,
		color: "red",
	},
	priceContainer: {
		backgroundColor: COLORS.blue,
		borderRadius: 20,
		alignSelf: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
});
