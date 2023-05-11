import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AdvertisementDetailsScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [numberOfLikesAndDislikes, setnumberOfLikesAndDislikes] = useState({});

	const ad = route.params.ad;

	const handleNavigateToRatings = () => {
		navigation.navigate("UserRatings", {
			user: ad.user,
			numOfLikes: numberOfLikesAndDislikes,
		});
	};

	useEffect(() => {
		const fetchLikeAndDislikeNumbers = async () => {
			const options = {
				method: "GET",
				url: `http://192.168.0.106:8080/api/v1/user/${parseInt(
					ad.user.id
				)}/likesNumber`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjgzOTMwOTk4fQ.wXrL4LC2LBG2hpOerozTjy0W-ko4qTgfHGrGql0CXJ8`,
				},
			};
			try {
				const response = await axios.request(options);
				setnumberOfLikesAndDislikes(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};

		fetchLikeAndDislikeNumbers();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<Image
				source={{ uri: `data:image/jpeg;base64,${ad.picture}` }}
				style={styles.image}
			/>
			<View style={styles.content}>
				<Text style={styles.title}>{ad.title}</Text>
				<View style={styles.details}>
					<Text style={styles.category}>{ad.advertisementCategory}</Text>
					<Text style={styles.price}>{`${ad.price.toLocaleString()} din`}</Text>
				</View>
				<Text style={styles.description}>{ad.description}</Text>
				<View style={styles.date}>
					<Ionicons name="time" size={20} color="#555" />
					<Text style={styles.dateText}>
						Created on {ad.creationDate.toLocaleString("ar-AE")}
					</Text>
				</View>

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
						<TouchableOpacity style={styles.advertisementsLink}>
							<Text style={styles.advertisementsLinkText}>
								View all advertisements
							</Text>
						</TouchableOpacity>
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
		backgroundColor: "#fff",
	},
	image: {
		width: "100%",
		height: 300,
		resizeMode: "cover",
	},
	content: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	details: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	category: {
		fontSize: 16,
		fontWeight: "bold",
		marginRight: 10,
		color: "#555",
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#f88c00",
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 20,
	},
	date: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	dateText: {
		fontSize: 16,
		marginLeft: 10,
		color: "#555",
	},
	userInfoContainer: {
		backgroundColor: "#fff",
		marginTop: 10,
		// padding: 10,
		borderRadius: 10,
	},
	userInfoTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	userInfoContent: {
		flexDirection: "column",
		alignItems: "stretch",
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
		color: "#555",
	},
	likesContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
	},
	likesIcon: {
		marginRight: 10,
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
		marginRight: 10,
	},
	dislikesText: {
		fontSize: 16,
		color: "red",
	},
	advertisementsLink: {
		marginTop: 20,
	},
	advertisementsLinkText: {
		fontSize: 16,
		color: "#0d6efd",
		textDecorationLine: "underline",
	},
});
