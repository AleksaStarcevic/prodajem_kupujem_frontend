import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Platform,
	Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";

const AddAdvertisementScreen = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState(null);
	const [adsCategories, setAdsCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState({});

	const handlePickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Sorry, we need camera roll permissions to make this work!");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			// allowsEditing: true,
			aspect: [4, 3],
			quality: 0.2,
			base64: true,
		});

		if (!result.canceled) {
			setImage(result.base64);
		}
	};

	const handleSubmit = async () => {
		const options = {
			method: "POST",
			url: "http://192.168.0.106:8080/api/v1/advertisements",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjgzOTMwOTk4fQ.wXrL4LC2LBG2hpOerozTjy0W-ko4qTgfHGrGql0CXJ8`,
			},
			data: {
				title: title,
				description: description,
				picture: image,
				price: price,
				advertisementCategory: selectedCategory.id,
				advertisementPromotion: 1,
			},
		};
		console.log(options.data);

		try {
			const response = await axios(options);
			Alert.alert("Success!", "Your advertisement has been added.");
		} catch (error) {
			console.error(error.response.data);
			Alert.alert("Error", "Sorry, something went wrong. Please try again.");
		}
	};

	const handleCategoryChange = (category, index) => {
		const selectedCat = adsCategories[index - 1];
		setCategory(category);
		setSelectedCategory({
			id: selectedCat.id,
			categoryName: selectedCat.categoryName,
		});
	};

	useEffect(() => {
		const fetchCategories = async () => {
			const options = {
				method: "GET",
				url: `http://192.168.0.106:8080/api/v1/common/categories`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjgzOTMwOTk4fQ.wXrL4LC2LBG2hpOerozTjy0W-ko4qTgfHGrGql0CXJ8`,
				},
			};
			try {
				const response = await axios.request(options);
				setAdsCategories(response.data);
			} catch (error) {
				alert("Error!");
				console.log(error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add New Advertisement</Text>
			<View style={styles.formContainer}>
				<TextInput
					style={styles.input}
					placeholder="Title"
					value={title}
					onChangeText={text => setTitle(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Description"
					value={description}
					onChangeText={text => setDescription(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Price"
					value={price}
					keyboardType="numeric"
					onChangeText={text => setPrice(text)}
				/>
				<Picker
					selectedValue={category}
					onValueChange={handleCategoryChange}
					style={styles.picker}
				>
					<Picker.Item label="Select category" value="" />
					{adsCategories.map(category => (
						<Picker.Item
							key={category.id}
							label={category.categoryName}
							value={category.categoryName}
						/>
					))}
				</Picker>
				{!image && (
					<TouchableOpacity
						style={styles.imageButton}
						onPress={handlePickImage}
					>
						<Text style={styles.imageButtonText}>Choose Image</Text>
					</TouchableOpacity>
				)}
				{image && (
					<Image
						source={{ uri: `data:image/png;base64,${image}` }}
						style={styles.imagePreview}
					/>
				)}
				<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
					<Text style={styles.submitButtonText}>Add Advertisement</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default AddAdvertisementScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	formContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: "100%",
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
	picker: {
		width: "100%",
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
	},
	imageButton: {
		backgroundColor: "#2196F3",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},
	imageButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	imagePreview: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginBottom: 10,
	},
	submitButton: {
		backgroundColor: "#4CAF50",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	submitButtonText: {
		color: "#fff",
		textAlign: "center",
	},
});
