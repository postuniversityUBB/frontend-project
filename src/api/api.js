import axios from "axios";

const BASE_URL = "https://ebs-software-v1.herokuapp.com/api";

export const getProjects = async () => {
	try {
		const { data } = await axios.get(`${BASE_URL}/projects`);
		console.log("🚀 ~ file: api.js ~ line 5 ~ getProjects ~ response", data);
		return data;
	} catch (err) {
		throw err;
	}
}

export const postProjects = async (payload) => {
	try {
		await axios.post(`${BASE_URL}/projects`, payload);
		console.log("🚀 ~ file: api.js ~ line 17 ~ postProjects");
		return;
	} catch (err) {
		throw err;
	}
}
