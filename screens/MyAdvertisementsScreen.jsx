import { React, useEffect, useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SIZES } from "../constants";
import axios from "axios";
import Advertisement from "../components/Advertisement";
import { AuthContext } from "../context/auth_context";
import { baseUrl, getApiOptions } from "../config/apiConfig";
const MyAdvertisementsScreen = () => {
	const [adsData, setAdsData] = useState([]);
	const [childChange, setChildChange] = useState(false);
	const authCtx = useContext(AuthContext);
	const handleChildChange = () => {
		setChildChange(prev => !prev);
	};

	useEffect(() => {
		const fetchAds = async () => {
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/my_account/advertisements`;
			try {
				const response = await axios.request(options);
				setAdsData(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};

		fetchAds();
	}, [childChange]);
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
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

const styles = StyleSheet.create({});
