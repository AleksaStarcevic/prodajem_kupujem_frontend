import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import AuthContent from "../components/AuthContent";
import LoadingOverlay from "../components/LoadingOverlay";
import axios from "axios";
import { baseUrl, getApiOptions } from "../config/apiConfig";

const SignupScreen = () => {
	const [isAuthethicating, setIsAuthethicating] = useState(false);

	const signUpHandler = async userObject => {
		setIsAuthethicating(true);
		let options = getApiOptions(false, "POST", userObject);
		options.url = `${baseUrl}/register`;
		options.headers = { "Content-Type": "application/json" };
		try {
			const response = await axios.request(options);
			setIsAuthethicating(false);
			ToastAndroid.show(
				"Registered successfully, check your email!",
				ToastAndroid.SHORT
			);
		} catch (error) {
			ToastAndroid.show(error.response?.data, ToastAndroid.SHORT);
			setIsAuthethicating(false);
		}
	};

	if (isAuthethicating) {
		return <LoadingOverlay message="Loading" />;
	}

	return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignupScreen;

const styles = StyleSheet.create({});
