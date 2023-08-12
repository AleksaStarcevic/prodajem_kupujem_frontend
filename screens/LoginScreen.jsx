import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState, useContext } from "react";
import AuthContent from "../components/AuthContent";
import LoadingOverlay from "../components/LoadingOverlay";
import axios from "axios";
import { AuthContext } from "../context/auth_context";

const LoginScreen = () => {
	const [isAuthethicating, setIsAuthethicating] = useState(false);
	const authCtx = useContext(AuthContext);

	const loginHandler = async userObject => {
		const userLogin = {
			username: userObject.email,
			password: userObject.password,
		};
		const formBody = Object.keys(userLogin)
			.map(
				key =>
					encodeURIComponent(key) + "=" + encodeURIComponent(userLogin[key])
			)
			.join("&");

		setIsAuthethicating(true);
		const options = {
			method: "POST",
			url: `http://192.168.0.107:8080/login`,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: formBody,
		};
		try {
			const response = await axios.request(options);
			authCtx.authenticate(response.data.access_token, response.data.email);
			setIsAuthethicating(false);
			ToastAndroid.show("Login successfull!", ToastAndroid.SHORT);
		} catch (error) {
			ToastAndroid.show(
				error.response.data
					? error.response.data
					: "Error, check your credentials",
				ToastAndroid.SHORT
			);
			setIsAuthethicating(false);
		}
	};
	if (isAuthethicating) {
		return <LoadingOverlay message="Logging you in..." />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;

const styles = StyleSheet.create({});
