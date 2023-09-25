import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AuthContent from "../components/AuthContent";
import LoadingOverlay from "../components/LoadingOverlay";
import axios from "axios";
import { baseUrl, getApiOptions } from "../config/apiConfig";
import { useToast } from "react-native-toast-notifications";

const SignupScreen = () => {
	const [isAuthethicating, setIsAuthethicating] = useState(false);
	const toast = useToast();

	const signUpHandler = async userObject => {
		setIsAuthethicating(true);
		let options = getApiOptions(false, "POST", userObject);
		options.url = `${baseUrl}/register`;
		options.headers = { "Content-Type": "application/json" };
		try {
			const response = await axios.request(options);
			setIsAuthethicating(false);
			toast.show("Registered successfully, check your email!", {
				type: "success",
			});
		} catch (error) {
			toast.show(`Error, ${error.response.data}`, {
				type: "danger",
			});
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
