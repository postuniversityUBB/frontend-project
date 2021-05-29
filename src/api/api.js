import axios from "axios";

const API_URL = "https://ebs-software-v1.herokuapp.com/api";

export const getProjects = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/projects`);
		console.log("🚀 ~ file: api.js ~ line 5 ~ getProjects ~ response", data);
		return data;
	} catch (err) {
		throw err;
	}
}

export const postProjects = async (payload) => {
	try {
		await axios.post(`${API_URL}/projects`, payload);
		console.log("🚀 ~ file: api.js ~ line 17 ~ postProjects");
		return;
	} catch (err) {
		throw err;
	}
}

export const getUsers = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/users`);
		console.log("🚀 ~ file: api.js ~ line 27 ~ getUsers ~ response", data);
		return data;
	} catch (err) {
		throw err;
	}
}
