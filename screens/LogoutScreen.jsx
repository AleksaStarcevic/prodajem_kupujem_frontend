import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/auth_context";

const LogoutScreen = ({ route }) => {
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		authCtx.logout();
	}, []);

	return null;
};

export default LogoutScreen;
