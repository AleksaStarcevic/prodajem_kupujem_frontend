import { React, useEffect, useState, useContext } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Text,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import Advertisement from "../components/Advertisement";
import { AuthContext } from "../context/auth_context";
import { baseUrl, getApiOptions } from "../config/apiConfig";
import { useFavorites } from "../context/favourites_context";

const MyFollowingsScreen = () => {
	const [adsData, setAdsData] = useState([]);
	const authCtx = useContext(AuthContext);
	const { favorites, toggleFavorite } = useFavorites();
	const [sortingCriteria, setSortingCriteria] = useState("creationDate");
	const [sortingOrder, setSortingOrder] = useState("desc");
	const sortingOptions = [
		{ label: "Expensive", criteria: "price", order: "desc" },
		{ label: "Cheaper", criteria: "price", order: "asc" },
		{ label: "Newer", criteria: "creationDate", order: "desc" },
		{ label: "Older", criteria: "creationDate", order: "asc" },
	];

	const handleSorting = async (criteria, order) => {
		let options = getApiOptions(authCtx.token, "GET", false);
		options.url = `${baseUrl}/my_account/following?sort=${criteria},${order}`;
		try {
			const response = await axios.request(options);
			setAdsData(response.data);
		} catch (error) {
			alert("Error!");
			console.log(error);
		}
	};

	useEffect(() => {
		handleSorting(sortingCriteria, sortingOrder);
	}, [sortingCriteria, sortingOrder, favorites]);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.sortingOptions}>
				{sortingOptions.map(option => (
					<TouchableOpacity
						key={option.label}
						onPress={() => {
							setSortingCriteria(option.criteria);
							setSortingOrder(option.order);
						}}
						style={[
							styles.sortingOption,
							sortingCriteria === option.criteria &&
								sortingOrder === option.order &&
								styles.activeSortingOption,
						]}
					>
						<Text
							style={
								sortingCriteria === option.criteria &&
								sortingOrder === option.order
									? styles.activeSortingText
									: styles.sortingText
							}
						>
							{option.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={{ flex: 1, padding: SIZES.medium }}>
				<View style={styles.cardsContainer}>
					{adsData?.map(ad => (
						<Advertisement ad={ad} key={ad.id} />
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default MyFollowingsScreen;

const styles = StyleSheet.create({
	sortingOptions: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: SIZES.medium,
		marginTop: SIZES.medium,
		marginBottom: SIZES.small,
	},
	sortingOption: {
		flex: 1,
		paddingVertical: SIZES.small,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderRadius: 5,
		marginRight: 5,
	},
	sortingText: {
		fontSize: 16,
		color: "gray",
	},
	activeSortingOption: {
		backgroundColor: COLORS.blue,
	},
	activeSortingText: {
		fontSize: 16,
		color: "white",
	},
});
