import { createContext, useState } from "react";

export const AuthContext = createContext({
	email: "",
	token: "",
	isAuthenticated: false,
	authenticate: token => {},
	logout: () => {},
});

function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState();
	const [email, setEmail] = useState();

	function authenticate(token, email) {
		setAuthToken(token);
		setEmail(email);
	}

	function logout() {
		setAuthToken(null);
	}

	const value = {
		email: email,
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
