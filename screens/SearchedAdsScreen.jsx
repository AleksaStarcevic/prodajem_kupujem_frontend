import { React, useEffect, useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SIZES } from "../constants";
import axios from "axios";
import Advertisement from "../components/Advertisement";
import { AuthContext } from "../context/auth_context";
import { useRoute } from "@react-navigation/native";
import { baseUrl, getApiOptions } from "../config/apiConfig";

const SearchedAdsScreen = () => {
	const [adsData, setAdsData] = useState([]);
	const authCtx = useContext(AuthContext);
	const route = useRoute();
	const search = route.params.searchTerm;
	useEffect(() => {
		const fetchAds = async () => {
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/advertisements/search?keywords=${search}`;
			try {
				const response = await axios.request(options);
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
				<View style={styles.cardsContainer}>
					{adsData?.map(ad => (
						<Advertisement ad={ad} key={ad.id} />
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default SearchedAdsScreen;

const styles = StyleSheet.create({});
