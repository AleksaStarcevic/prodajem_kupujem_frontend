import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Alert,
} from "react-native";
import { React, useContext, useState } from "react";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/auth_context";
import axios from "axios";
import { useFavorites } from "../context/favourites_context";
import { Button } from "react-native-paper";
import { baseUrl, getApiOptions } from "../config/apiConfig";

const Advertisement = ({ ad, onChange }) => {
	const navigation = useNavigation();
	const authCtx = useContext(AuthContext);
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = favorites.includes(ad.id);

	const handleNavigate = () => {
		navigation.navigate("Details", { ad });
	};

	// Ovo se cuva u kontekstu
	const handleToggleFavorite = async () => {
		const followUnfollow = isFavorite ? "unfollow" : "follow";
		console.log(followUnfollow);
		let options = getApiOptions(authCtx.token, "PATCH", false);
		options.url = `${baseUrl}/advertisements/${ad.id}/${followUnfollow}`;
		try {
			await axios.request(options);
			toggleFavorite(ad.id);
		} catch (error) {
			console.error("Error toggling favorite:", error);
		}
	};

	// const handleDelete = async () => {
	// 	const options = {
	// 		method: "DELETE",
	// 		url: `http://192.168.0.107:8080/api/v1/advertisements/${ad.id}`,
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${authCtx.token}`,
	// 		},
	// 	};
	// 	try {
	// 		const response = await axios.request(options);
	// 		Alert.alert(
	// 			"Success!",
	// 			"Your advertisement has been successfully deleted!"
	// 		);
	// 		onChange(true);
	// 	} catch (error) {
	// 		alert("Error!");
	// 		console.log(error);
	// 	}
	// };

	return (
		<View style={styles.card}>
			<TouchableOpacity onPress={handleNavigate}>
				<Image
					source={{ uri: `data:image/jpeg;base64,${ad.picture}` }}
					style={styles.image}
				/>
			</TouchableOpacity>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{ad.title}</Text>
				<View style={styles.locationContainer}>
					<Ionicons
						name="location-sharp"
						color={COLORS.blue}
						size={SIZES.large}
					/>
					<Text style={styles.location}>{ad.user.city}</Text>
				</View>
			</View>
			<View style={styles.priceContainer}>
				<Text style={styles.price}>{`${ad.price.toLocaleString()} $`}</Text>
			</View>
			{authCtx.email !== ad.user.email && (
				<MaterialIcons
					onPress={handleToggleFavorite}
					name={isFavorite ? "favorite" : "favorite-border"}
					size={SIZES.xLarge}
					style={styles.garbageIcon}
				/>
			)}
		</View>
	);
};

export default Advertisement;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		marginHorizontal: 10,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	image: {
		height: 200,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		resizeMode: "cover",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 10,
		marginTop: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	location: {
		fontSize: 16,
		marginLeft: 5,
	},
	priceContainer: {
		backgroundColor: COLORS.blue,
		borderRadius: 20,
		alignSelf: "flex-start",
		margin: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	price: {
		fontSize: 16,
		color: "#fff",
	},
	garbageIcon: {
		position: "absolute",
		bottom: 0,
		right: 0,
		padding: 10,
	},
});
