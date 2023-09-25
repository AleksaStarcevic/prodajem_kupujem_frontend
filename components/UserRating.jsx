import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UserRating = ({ rating }) => {
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<View style={styles.userContainer}>
					{rating.satisfied ? (
						<Ionicons
							style={styles.icon}
							name="thumbs-up"
							size={24}
							color="green"
						/>
					) : (
						<Ionicons
							name="thumbs-down"
							size={24}
							color="red"
							style={styles.icon}
						/>
					)}
					<Text style={styles.username}>{rating.userName}</Text>
				</View>
				<Text style={styles.date}>{rating.date}</Text>
			</View>
			<View style={styles.bottomContainer}>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Ad:</Text>
					<Text style={styles.title}>{rating.advertisementTitle}</Text>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Comment:</Text>
					<Text style={styles.desc}>{rating.description}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#CCC",
	},
	topContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	userContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	username: {
		fontWeight: "bold",
		fontSize: 16,
		marginLeft: 8,
		marginBottom: 2,
	},
	date: {
		fontSize: 12,
		color: "#999",
	},
	title: {
		fontSize: 15,
	},
	desc: {
		fontSize: 15,
	},
	icon: {
		alignSelf: "center",
		paddingBottom: 4,
	},
	bottomContainer: {
		marginTop: 8,
	},
	labelContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	label: {
		fontWeight: "bold",
		fontSize: 16,
		marginRight: 5,
	},
});

export default UserRating;
