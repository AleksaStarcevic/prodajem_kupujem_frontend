import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import AuthContent from "../components/AuthContent";
import LoadingOverlay from "../components/LoadingOverlay";
import axios from "axios";

const SignupScreen = () => {
	const [isAuthethicating, setIsAuthethicating] = useState(false);

	const signUpHandler = async userObject => {
		setIsAuthethicating(true);
		const options = {
			method: "POST",
			url: `http://192.168.0.101:8080/api/v1/register`,
			headers: {
				"Content-Type": "application/json",
			},
			data: userObject,
		};
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
