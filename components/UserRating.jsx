import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UserRating = ({ rating }) => {
	return (
		<View style={styles.container}>
			<View style={styles.thumbsContainer}>
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
			<View style={styles.infoContainer}>
				<Text style={styles.date}>{rating.date}</Text>
				<Text style={styles.title}>{rating.advertisementTitle}</Text>
				<Text style={styles.desc}>{rating.description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#CCC",
	},
	thumbsContainer: {
		marginRight: 16,
	},
	infoContainer: {
		flex: 1,
	},
	username: {
		fontWeight: "bold",
		fontSize: 16,
	},
	date: {
		fontSize: 12,
		color: "#999",
		alignSelf: "flex-end",
	},
	title: {
		fontSize: 14,
	},
	desc: {
		fontSize: 20,
	},
	icon: {
		alignSelf: "center",
		paddingBottom: 4,
	},
});

export default UserRating;
