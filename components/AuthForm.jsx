import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "./Input";
import Button from "./Button";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredName, setEnteredName] = useState("");
	const [enteredCity, setEnteredCity] = useState("");
	const [enteredPhone, setEnteredPhone] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

	const {
		email: emailIsInvalid,
		password: passwordIsInvalid,
		confirmPassword: passwordsDontMatch,
		fullName: nameIsInvalid,
		city: cityIsInvalid,
		phone: phoneIsInvalid,
	} = credentialsInvalid;

	function updateInputValueHandler(inputType, enteredValue) {
		switch (inputType) {
			case "email":
				setEnteredEmail(enteredValue);
				break;
			case "password":
				setEnteredPassword(enteredValue);
				break;
			case "confirmPassword":
				setEnteredConfirmPassword(enteredValue);
				break;
			case "fullName":
				setEnteredName(enteredValue);
				break;
			case "city":
				setEnteredCity(enteredValue);
				break;
			case "phone":
				setEnteredPhone(enteredValue);
				break;
		}
	}

	function submitHandler() {
		onSubmit({
			email: enteredEmail,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword,
			name: enteredName,
			city: enteredCity,
			phone: enteredPhone,
		});
	}

	return (
		<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
			<View style={styles.form}>
				<ScrollView>
					<Input
						label="Email Address"
						onUpdateValue={updateInputValueHandler.bind(this, "email")}
						value={enteredEmail}
						keyboardType="email-address"
						isInvalid={emailIsInvalid}
					/>
					<Input
						label="Password"
						onUpdateValue={updateInputValueHandler.bind(this, "password")}
						secure
						value={enteredPassword}
						isInvalid={passwordIsInvalid}
					/>
					{!isLogin && (
						<Input
							label="Confirm Password"
							onUpdateValue={updateInputValueHandler.bind(
								this,
								"confirmPassword"
							)}
							secure
							value={enteredConfirmPassword}
							isInvalid={passwordsDontMatch}
						/>
					)}
					{!isLogin && (
						<Input
							label="Full name"
							onUpdateValue={updateInputValueHandler.bind(this, "fullName")}
							value={enteredName}
							isInvalid={nameIsInvalid}
						/>
					)}
					{!isLogin && (
						<Input
							label="City"
							onUpdateValue={updateInputValueHandler.bind(this, "city")}
							value={enteredCity}
							isInvalid={cityIsInvalid}
						/>
					)}
					{!isLogin && (
						<Input
							label="Phone"
							onUpdateValue={updateInputValueHandler.bind(this, "phone")}
							value={enteredPhone}
							keyboardType="phone-pad"
							isInvalid={phoneIsInvalid}
						/>
					)}
					<View style={styles.buttons}>
						<Button onPress={submitHandler}>
							{isLogin ? "Log In" : "Sign Up"}
						</Button>
					</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
}

export default AuthForm;

const styles = StyleSheet.create({
	buttons: {
		marginTop: 12,
	},
});
