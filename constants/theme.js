const COLORS = {
	background: "#111827",
	textLight: "#F9FAFB",
	textDark: "#D1D5DB",
	primaryAccent: "#60A5FA",
	secondaryAccent1: "#34D399",
	secondaryAccent2: "#F472B6",
	secondaryAccent3: "#F59E0B",

	primary: "#312651",
	secondary: "#444262", // nice
	tertiary: "#FF7754",

	gray: "#83829A",
	gray2: "#C1C0C8",
	gray3: "#f4f4f4", // nice

	white: "#F3F4F8",
	lightWhite: "#FAFAFC",
	blue: "#1877F2",
};

const SIZES = {
	xSmall: 10,
	small: 12,
	medium: 16,
	large: 20,
	xLarge: 24,
	xxLarge: 32,
	xxxLarge: 50,
};

const SHADOWS = {
	small: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
	},
	medium: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.84,
		elevation: 5,
	},
};

export { COLORS, SIZES, SHADOWS };
