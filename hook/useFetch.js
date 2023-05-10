import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = options => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await axios.request(options);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			setError(error);
			alert("Error!");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, isLoading, error };
};

export default useFetch;
