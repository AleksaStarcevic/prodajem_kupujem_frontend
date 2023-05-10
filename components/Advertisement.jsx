import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Advertisement = ({ ad }) => {
	const navigation = useNavigation();

	const handleNavigate = () => {
		navigation.navigate("Details", { ad });
	};

	return (
		<TouchableOpacity onPress={handleNavigate}>
			<View style={styles.card}>
				<Image
					source={{ uri: `data:image/jpeg;base64,${ad.picture}` }}
					style={styles.image}
				/>
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
			</View>
		</TouchableOpacity>
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
	// container: {
	// 	flex: 1,
	// 	justifyContent: "space-between",
	// 	alignItems: "center",
	// 	flexDirection: "row",
	// 	padding: SIZES.medium,
	// 	borderRadius: SIZES.small,
	// 	backgroundColor: "#FFF",
	// 	...SHADOWS.medium,
	// 	shadowColor: COLORS.white,
	// },
	// logoContainer: {
	// 	width: 50,
	// 	height: 50,
	// 	backgroundColor: COLORS.white,
	// 	borderRadius: SIZES.medium,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// logImage: {
	// 	width: "100%",
	// 	height: "80%",
	// },
	// textContainer: {
	// 	flex: 1,
	// 	marginHorizontal: SIZES.medium,
	// },
	// jobName: {
	// 	fontSize: SIZES.large,
	// 	color: COLORS.primary,
	// },
	// jobType: {
	// 	fontSize: SIZES.small + 3,
	// 	color: COLORS.lightWhite,
	// 	marginTop: 3,
	// 	textTransform: "capitalize",
	// 	backgroundColor: COLORS.tertiary,
	// 	width: 50,
	// 	borderRadius: SIZES.medium,
	// 	padding: 3,
	// },
});
