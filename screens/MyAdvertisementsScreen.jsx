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
const MyAdvertisementsScreen = () => {
	const [adsData, setAdsData] = useState([]);
	const [childChange, setChildChange] = useState(false);
	const authCtx = useContext(AuthContext);
	const [selectedTab, setSelectedTab] = useState("ACTIVE");
	const tabs = ["ACTIVE", "EXPIRES", "EXPIRED"];
	const [status, setStatus] = useState("ACTIVE"); // Initial status

	const handleChildChange = () => {
		setChildChange(prev => !prev);
	};

	useEffect(() => {
		console.log("aa");
		const fetchAds = async () => {
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/my_account/advertisements?status=${status}`;
			try {
				console.log(options.url);
				const response = await axios.request(options);
				setAdsData(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};

		fetchAds();
	}, [childChange, selectedTab]);
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.tabsContainer}>
				{tabs.map(tab => (
					<TouchableOpacity
						key={tab}
						onPress={() => {
							setStatus(tab);
							setSelectedTab(tab);
							handleChildChange();
						}}
						style={[styles.tab, tab === selectedTab && styles.activeTab]}
					>
						<Text
							style={
								tab === selectedTab ? styles.activeTabText : styles.tabText
							}
						>
							{tab}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={{ flex: 1, padding: SIZES.medium }}>
				<View style={styles.cardsContainer}>
					{adsData?.map(ad => (
						<Advertisement onChange={handleChildChange} ad={ad} key={ad.id} />
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default MyAdvertisementsScreen;

const styles = StyleSheet.create({
	tabsContainer: {
		flexDirection: "row",
		backgroundColor: "white",
		marginBottom: 10,
	},
	tab: {
		flex: 1,
		paddingVertical: 10,
		alignItems: "center",
		borderBottomWidth: 2,
		borderBottomColor: "transparent",
	},
	tabText: {
		fontSize: 16,
		color: "gray",
	},
	activeTab: {
		borderBottomColor: COLORS.blue,
	},
	activeTabText: {
		fontSize: 16,
		color: COLORS.blue,
		fontWeight: "bold",
	},
});
