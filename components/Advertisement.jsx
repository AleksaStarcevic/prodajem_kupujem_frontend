import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Alert,
} from "react-native";
import React from "react";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
const Advertisement = ({ ad, onChange }) => {
	const navigation = useNavigation();

	const handleNavigate = () => {
		navigation.navigate("Details", { ad });
	};
	const handleDelete = async () => {
		const options = {
			method: "DELETE",
			url: `http://192.168.0.106:8080/api/v1/advertisements/${ad.id}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjgzOTMwOTk4fQ.wXrL4LC2LBG2hpOerozTjy0W-ko4qTgfHGrGql0CXJ8`,
			},
		};
		try {
			const response = await axios.request(options);
			Alert.alert(
				"Success!",
				"Your advertisement has been successfully deleted!"
			);
			onChange(true);
		} catch (error) {
			alert("Error!");
			console.log(error);
		}
	};

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
						color={COLORS.tertiary}
						size={SIZES.large}
					/>
					<Text style={styles.location}>{ad.user.city}</Text>
				</View>
			</View>
			<View style={styles.priceContainer}>
				<Text style={styles.price}>{`${ad.price.toLocaleString()} din`}</Text>
			</View>
			{/* ako je user mail (id) == ad.id prikazi kantu */}
			<TouchableOpacity>
				<MaterialIcons
					name="delete"
					size={SIZES.large}
					style={styles.garbageIcon}
					onPress={handleDelete}
				/>
			</TouchableOpacity>
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
		backgroundColor: COLORS.tertiary,
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
