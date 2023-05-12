import { React, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SIZES } from "../constants";
import axios from "axios";
import Advertisement from "../components/Advertisement";

const MyAdvertisementsScreen = () => {
	const [adsData, setAdsData] = useState([]);
	const [childChange, setChildChange] = useState(false);

	const handleChildChange = () => {
		setChildChange(prev => !prev);
	};

	useEffect(() => {
		const fetchAds = async () => {
			const options = {
				method: "GET",
				url: `http://192.168.0.101:8080/api/v1/my_account/advertisements`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjgzOTMwOTk4fQ.wXrL4LC2LBG2hpOerozTjy0W-ko4qTgfHGrGql0CXJ8`,
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
