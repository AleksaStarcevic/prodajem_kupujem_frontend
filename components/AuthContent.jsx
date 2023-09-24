import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthForm from "./AuthForm";
import { COLORS } from "../constants";
import Button from "./Button";
import { ScrollView } from "react-native-gesture-handler";
function AuthContent({ isLogin, onAuthenticate }) {
	const navigation = useNavigation();

	const [credentialsInvalid, setCredentialsInvalid] = useState({
		email: false,
		password: false,
		confirmPassword: false,
		name: false,
		city: false,
		phone: false,
	});

	function switchAuthModeHandler() {
		if (isLogin) {
			navigation.replace("Signup");
		} else {
			navigation.replace("Login");
		}
	}

	function submitHandler(credentials) {
		let { email, password, confirmPassword, city, phone, name } = credentials;
		const emailRegex = /^\S+@\S+\.\S+$/;
		const phoneRegex = /^(\d{3}-?){2}\d{4}$/;
		const passwordRegex =
			/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-]{4,}$/;
		email = email.trim();
		password = password.trim();
		confirmPassword = confirmPassword.trim();
		console.log(password);
		console.log(confirmPassword);
		const passwordsAreEqual = password === confirmPassword;
		const emailIsValid = emailRegex.test(email);
		const passwordIsValid = passwordRegex.test(password);
		const nameIsValid = name.length > 0;
		const cityIsValid = city.length > 0;
		const phoneIsValid = phoneRegex.test(phone);

		if (
			!emailIsValid ||
			!passwordIsValid ||
			(!isLogin &&
				(!passwordsAreEqual || !nameIsValid || !cityIsValid || !phoneIsValid))
		) {
			Alert.alert("Invalid input", "Please check your entered credentials.");
			setCredentialsInvalid({
				email: !emailIsValid,
				password: !passwordIsValid,
				confirmPassword: !passwordIsValid || !passwordsAreEqual,
				name: !nameIsValid,
				city: !cityIsValid,
				phone: !phoneIsValid,
			});
			return;
		}
		const userObject = {
			email,
			password,
			name,
			city,
			phone,
		};
		onAuthenticate(userObject);
	}

	return (
		<ScrollView>
			<View style={styles.authContent}>
				<AuthForm
					isLogin={isLogin}
					onSubmit={submitHandler}
					credentialsInvalid={credentialsInvalid}
				/>
				<View style={styles.buttons}>
					<Button onPress={switchAuthModeHandler}>
						{isLogin ? "Sign up" : "Log in"}
					</Button>
				</View>
			</View>
		</ScrollView>
	);
}

export default AuthContent;

const styles = StyleSheet.create({
	authContent: {
		marginTop: 80,
		marginHorizontal: 32,
		padding: 16,
		borderRadius: 8,
		backgroundColor: "#fff",
		elevation: 2,
		shadowColor: "black",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	buttons: {
		marginTop: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
