import { React, useEffect, useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SIZES } from "../constants";
import axios from "axios";
import Advertisement from "../components/Advertisement";
import { AuthContext } from "../context/auth_context";
import { useRoute } from "@react-navigation/native";

const SearchedAdsScreen = () => {
	const [adsData, setAdsData] = useState([]);
	const authCtx = useContext(AuthContext);
	const route = useRoute();
	const search = route.params.searchTerm;
	useEffect(() => {
		const fetchAds = async () => {
			const options = {
				method: "GET",
				url: `http://192.168.0.107:8080/api/v1/advertisements/search?keywords=${search}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCtx.token}`,
				},
			};
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
