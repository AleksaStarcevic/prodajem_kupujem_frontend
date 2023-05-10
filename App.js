import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddAdvertisementScreen from "./screens/AddAdvertisementScreen";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "./constants";
import AdvertisementDetailsScreen from "./screens/AdvertisementDetailsScreen";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen
						name="Home"
						component={WelcomeScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="home" color={color} size={SIZES.large} />
							),
						}}
					/>
					<Tab.Screen
						name="New add"
						component={AddAdvertisementScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="add-circle" color={color} size={SIZES.large} />
							),
						}}
					/>
					<Tab.Screen name="Details" component={AdvertisementDetailsScreen} />
				</Tab.Navigator>
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
