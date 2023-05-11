import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddAdvertisementScreen from "./screens/AddAdvertisementScreen";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "./constants";
import AdvertisementDetailsScreen from "./screens/AdvertisementDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserRatingsScreen from "./screens/UserRatingsScreen";
import RateScreen from "./screens/RateScreen";
import MyAdvertisementsScreen from "./screens/MyAdvertisementsScreen";

// const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={WelcomeScreen} />
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

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
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
				</Stack.Navigator>
			</NavigationContainer>
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
