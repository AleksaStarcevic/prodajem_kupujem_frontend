import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	const toggleFavorite = itemId => {
		if (favorites.includes(itemId)) {
			setFavorites(favorites.filter(id => id !== itemId));
		} else {
			setFavorites([...favorites, itemId]);
		}
	};

	return (
		<FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};
