import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddAdvertisementScreen from "./screens/AddAdvertisementScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "./constants";
import AdvertisementDetailsScreen from "./screens/AdvertisementDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserRatingsScreen from "./screens/UserRatingsScreen";
import RateScreen from "./screens/RateScreen";
import MyAdvertisementsScreen from "./screens/MyAdvertisementsScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./context/auth_context";
import React, { useState, useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "./components/Button";
import SearchedAdsScreen from "./screens/SearchedAdsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	const authCtx = useContext(AuthContext);

	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name="Home"
				component={WelcomeScreen}
				options={{
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 15 }}
							onPress={() => authCtx.logout()}
						>
							<Text>Logout</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<Drawer.Screen
				name="Add new advertisement"
				component={AddAdvertisementScreen}
			/>
			<Drawer.Screen
				name="My advertisements"
				component={MyAdvertisementsScreen}
			/>
		</Drawer.Navigator>
	);
}

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				// headerStyle: { backgroundColor: COLOR },
				headerTintColor: "black",
				headerTitle: "Enter your information",
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Drawer"
				component={DrawerNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={SIZES.large} />
					),
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="New add"
				component={AddAdvertisementScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="add-circle" color={color} size={SIZES.large} />
					),
				}}
			/>
			<Stack.Screen name="UserRatings" component={UserRatingsScreen} />
			<Stack.Screen name="Details" component={AdvertisementDetailsScreen} />
			<Stack.Screen name="RateUser" component={RateScreen} />
			<Stack.Screen
				name="DrawerMyAds"
				component={DrawerNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={SIZES.large} />
					),
					headerShown: false,
				}}
			/>
			<Stack.Screen name="SearchScreen" component={SearchedAdsScreen} />
		</Stack.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<AuthContextProvider>
				<Navigation />
			</AuthContextProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
