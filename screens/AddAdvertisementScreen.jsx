import React, { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Platform,
	Alert,
	KeyboardAvoidingView,
	SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/auth_context";

import axios from "axios";
import { COLORS } from "../constants";
import { baseUrl, getApiOptions } from "../config/apiConfig";
import { ScrollView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import DropDownPicker from "react-native-dropdown-picker";

const AddAdvertisementScreen = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("Laptops");
	const [image, setImage] = useState(null);
	const [adsCategories, setAdsCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState({});
	const authCtx = useContext(AuthContext);
	const toast = useToast();
	const [open, setOpen] = useState(false);

	const handleSubmit = async () => {
		let options = getApiOptions(authCtx.token, "POST", {
			title: title,
			description: description,
			picture: image,
			price: price,
			advertisementCategory: selectedCategory.id,
			advertisementPromotion: 1,
		});
		options.url = `${baseUrl}/advertisements/`;
		try {
			const response = await axios(options);
			toast.show("Your advertisement has been added.", {
				type: "success",
			});
			setImage(null);
			setTitle("");
			setDescription("");
			setPrice("");
			setCategory("");
		} catch (error) {
			console.error(error.response.data);
			toast.show(`Error, ${error.response.data}`, {
				type: "danger",
			});
		}
	};

	const handleTakePicture = async () => {
		const image = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 0.2,
			base64: true,
		});
		setImage(image.base64);
	};

	const handlePickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Sorry, we need camera roll permissions to make this work!");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 0.2,
			base64: true,
		});

		if (!result.canceled) {
			setImage(result.base64);
		}
	};

	useEffect(() => {
		const fetchCategories = async () => {
			let options = getApiOptions(authCtx.token, "GET", false);
			options.url = `${baseUrl}/common/categories`;
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
		<ScrollView style={styles.container}>
			<View style={styles.formContainer}>
				<TextInput
					style={styles.input}
					placeholder="Title"
					value={title}
					onChangeText={text => setTitle(text)}
				/>
				<TextInput
					style={styles.inputDesc}
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
				<DropDownPicker
					open={open}
					value={category}
					setOpen={setOpen}
					setValue={setCategory}
					items={adsCategories.map(category => ({
						label: category.categoryName,
						value: category.categoryName,
						id: category.id,
					}))}
					containerStyle={{
						height: 70,
						backgroundColor: COLORS.gray3,
						zIndex: 9999,
					}}
					style={{ backgroundColor: COLORS.gray3, borderColor: "#bbb" }}
					itemStyle={{
						justifyContent: "flex-start",
						backgroundColor: COLORS.gray3,
					}}
					onChangeValue={value => {
						const selectedCategory = adsCategories.find(
							category => category.categoryName === value
						);
						if (selectedCategory) {
							setSelectedCategory(selectedCategory);
						}
					}}
				/>

				{!image && (
					<View style={styles.cameraButtonsContainer}>
						<TouchableOpacity
							style={styles.cameraButton}
							onPress={handlePickImage}
						>
							<Text style={styles.cameraButtonText}>Choose image</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cameraButton}
							onPress={handleTakePicture}
						>
							<Text style={styles.cameraButtonText}>Take picture</Text>
						</TouchableOpacity>
					</View>
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
		</ScrollView>
	);
};

export default AddAdvertisementScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	formContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 50,
	},
	input: {
		width: "100%",
		height: 50,
		borderColor: "#bbb",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 15,
		marginBottom: 20,
		fontSize: 16,
		color: "#444",
	},
	inputDesc: {
		width: "100%",
		height: 90,
		borderColor: "#bbb",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 15,
		marginBottom: 20,
		fontSize: 16,
		color: "#444",
	},
	picker: {
		width: "100%",
		height: 50,
		borderColor: "#bbb",
		borderWidth: 1,
		borderRadius: 10,
		marginBottom: 20,
		fontSize: 16,
		color: "#444",
		paddingHorizontal: 15,
	},
	imageButton: {
		backgroundColor: "#2196F3",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 20,
	},
	imageButtonText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	imagePreview: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginBottom: 20,
		borderRadius: 10,
	},
	submitButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginTop: 20,
		width: "95%",
	},
	submitButtonText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	cameraButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20,
	},
	cameraButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginHorizontal: 5,
	},
	cameraButtonText: {
		color: "#FFF",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	},
});
