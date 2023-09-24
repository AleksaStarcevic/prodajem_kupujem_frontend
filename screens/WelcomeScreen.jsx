import { React, useEffect, useState, useContext } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	FlatList,
	StyleSheet,
	ScrollView,
} from "react-native";
import { icons, COLORS, SIZES } from "../constants";
import useFetch from "../hook/useFetch";
import axios from "axios";
import Advertisement from "../components/Advertisement";
import { AuthContext } from "../context/auth_context";
import { useNavigation } from "@react-navigation/native";
import { baseUrl, getApiOptions } from "../config/apiConfig";

const WelcomeScreen = () => {
	const [activeJobType, setActiveJobType] = useState({
		categoryName: "Laptops",
		id: 1,
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [adsData, setAdsData] = useState([]);
	const authCtx = useContext(AuthContext);
	const navigation = useNavigation();

	let options = getApiOptions(authCtx.token, "GET", false);
	options.url = `${baseUrl}/common/categories`;

	const { data, isLoading, error } = useFetch(options);
	const handleSearch = () => {
		navigation.navigate("Search", { searchTerm });
	};

	useEffect(() => {
		const fetchAds = async () => {
			let options2 = getApiOptions(authCtx.token, "GET", false);
			options2.url = `${baseUrl}/advertisements/category/${activeJobType.categoryName}/search`;
			try {
				const response = await axios.request(options2);
				setAdsData(response.data);
			} catch (error) {
				alert("Error!");
			}
		};

		fetchAds();
	}, [activeJobType]);
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View
				style={{
					flex: 1,
					padding: SIZES.medium,
					backgroundColor: "#fff",
				}}
			>
				<View style={styles.container}>
					{/* <Text style={styles.userName}>Hello User</Text> */}
					<Text style={styles.welcomeMessage}>Buy and sell products.</Text>
				</View>
				<View style={styles.searchContainer}>
					<View style={styles.searchWrapper}>
						<TextInput
							style={styles.searchInput}
							value={searchTerm}
							onChangeText={text => setSearchTerm(text)}
							placeholder="What are you looking for"
						/>
					</View>
					<TouchableOpacity
						style={styles.searchBtn}
						onPress={() => {
							handleSearch();
						}}
					>
						<Image
							source={icons.search}
							resizeMode="contain"
							style={styles.searchBtnImage}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.tabsContainer}>
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.tab(activeJobType, item)}
								onPress={() => {
									setActiveJobType(item);
									// router.push(`/searchCategories/${item.categoryName}`);
								}}
							>
								<Text style={styles.tabText(activeJobType, item)}>
									{item.categoryName}
								</Text>
							</TouchableOpacity>
						)}
						keyExtractor={item => item.id}
						contentContainerStyle={{ columnGap: SIZES.small }}
						horizontal={true}
					/>
				</View>

				<View style={styles.cardsContainer}>
					{adsData?.map(ad => (
						<Advertisement ad={ad} key={ad.id} />
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	userName: {
		fontSize: SIZES.large,
		color: COLORS.secondary,
	},
	welcomeMessage: {
		fontSize: SIZES.xLarge,
		color: COLORS.primary,
		marginTop: 2,
	},
	searchContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginTop: SIZES.large,
		height: 50,
	},
	searchWrapper: {
		flex: 1,
		backgroundColor: COLORS.white,
		marginRight: SIZES.small,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: SIZES.medium,
		height: "100%",
	},
	searchInput: {
		width: "100%",
		height: "100%",
		paddingHorizontal: SIZES.medium,
	},
	searchBtn: {
		width: 50,
		height: "100%",
		backgroundColor: COLORS.blue,
		borderRadius: SIZES.medium,
		justifyContent: "center",
		alignItems: "center",
	},
	searchBtnImage: {
		width: "50%",
		height: "50%",
		tintColor: COLORS.white,
	},
	tabsContainer: {
		width: "100%",
		marginTop: SIZES.medium,
	},
	tab: (activeJobType, item) => ({
		paddingVertical: SIZES.small / 2,
		paddingHorizontal: SIZES.small,
		borderRadius: SIZES.medium,
		borderWidth: 1,
		borderColor: activeJobType === item ? COLORS.blue : COLORS.gray2,
	}),
	tabText: (activeJobType, item) => ({
		color: activeJobType === item ? COLORS.blue : COLORS.gray2,
	}),
	cardsContainer: {
		marginTop: SIZES.medium,
		gap: SIZES.small,
	},
});
