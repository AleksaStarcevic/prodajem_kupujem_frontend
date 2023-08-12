const baseUrl = "http://192.168.0.107:8080/api/v1";
const baseUrlLogin = "http://192.168.0.107:8080";

const getApiOptions = (token, method, body) => {
	let headers = token
		? {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
		  }
		: {
				"Content-Type": "application/x-www-form-urlencoded",
		  };

	const options = {
		method,
		headers,
	};

	if (body) {
		options.data = body;
	}

	return options;
};

export { baseUrlLogin, baseUrl, getApiOptions };
