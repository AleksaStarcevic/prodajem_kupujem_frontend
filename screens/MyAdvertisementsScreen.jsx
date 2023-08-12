import { React, useEffect, useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SIZES } from "../constants";
import axios from "axios";
import Advertisement from "../components/Advertisement";
import { AuthContext } from "../context/auth_context";
const MyAdvertisementsScreen = () => {
	const [adsData, setAdsData] = useState([]);
	const [childChange, setChildChange] = useState(false);
	const authCtx = useContext(AuthContext);
	const handleChildChange = () => {
		setChildChange(prev => !prev);
	};

	useEffect(() => {
		const fetchAds = async () => {
			const options = {
				method: "GET",
				url: `http://192.168.0.107:8080/api/v1/my_account/advertisements`,
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
