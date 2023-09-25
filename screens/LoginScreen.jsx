import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import AuthContent from "../components/AuthContent";
import LoadingOverlay from "../components/LoadingOverlay";
import axios from "axios";
import { AuthContext } from "../context/auth_context";
import { baseUrlLogin, getApiOptions } from "../config/apiConfig";
import { useToast } from "react-native-toast-notifications";

const LoginScreen = () => {
	const [isAuthethicating, setIsAuthethicating] = useState(false);
	const authCtx = useContext(AuthContext);
	const toast = useToast();

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
		let options = getApiOptions(false, "POST", formBody);
		options.url = `${baseUrlLogin}/login`;
		console.log(options);
		try {
			const response = await axios.request(options);
			authCtx.authenticate(response.data.access_token, response.data.email);
			setIsAuthethicating(false);
			toast.show("Login successfull!", {
				type: "success",
			});
		} catch (error) {
			toast.show(
				error.response.data
					? error.response.data
					: "Error, check your credentials",
				{
					type: "danger",
				}
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
