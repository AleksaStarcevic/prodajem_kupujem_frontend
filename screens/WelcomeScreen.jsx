import { React, useEffect, useState } from "react";
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
const WelcomeScreen = () => {
	const [activeJobType, setActiveJobType] = useState("Laptopovi");
	const [searchTerm, setSearchTerm] = useState("");
	const [adsData, setAdsData] = useState([]);
	const options = {
		method: "GET",
		url: `http://192.168.0.106:8080/api/v1/common/categories`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjgzOTMwOTk4fQ.wXrL4LC2LBG2hpOerozTjy0W-ko4qTgfHGrGql0CXJ8`,
		},
	};

	const { data, isLoading, error } = useFetch(options);

	const handleClick = () => {
		console.log("aaaa");
	};

	useEffect(() => {
		const fetchAds = async () => {
			const category = "laptopovi";
			const options2 = {
				method: "GET",
				url: `http://192.168.0.106:8080/api/v1/advertisements/category/${category}/search`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjgzOTMwOTk4fQ.wXrL4LC2LBG2hpOerozTjy0W-ko4qTgfHGrGql0CXJ8`,
				},
			};
			try {
				const response = await axios.request(options2);
				setAdsData(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};

		fetchAds();
	}, []);
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={{ flex: 1, padding: SIZES.medium }}>
				<View style={styles.container}>
					<Text style={styles.userName}>Hello AKI</Text>
					<Text style={styles.welcomeMessage}>Buy and sell stuff.</Text>
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
							handleClick();
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
		backgroundColor: COLORS.tertiary,
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
		borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
	}),
	tabText: (activeJobType, item) => ({
		color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
	}),
	cardsContainer: {
		marginTop: SIZES.medium,
		gap: SIZES.small,
	},
});
