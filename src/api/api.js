import axios from "axios"

const API_URL = "https://ebs-software-v1.herokuapp.com/api"
const token = localStorage.getItem("token")

export const getProjects = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/projects`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 5 ~ getProjects ~ response", data)
		return data
	} catch (err) {
		throw err
	}
}

export const postProjects = async payload => {
	try {
		await axios.post(`${API_URL}/projects`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 17 ~ postProjects")
		return
	} catch (err) {
		throw err
	}
}

export const getUsers = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 27 ~ getUsers ~ response", data)
		return data
	} catch (err) {
		throw err
	}
}

export const register = async payload => {
	try {
		const { status } = await axios.post(`${API_URL}/users/register`, payload)
		console.log("🚀 ~ file: api.js ~ line 38 ~ register ~ response", status)

		return status
	} catch (err) {
		throw err
	}
}

export const login = async payload => {
	try {
		const { data, status } = await axios.post(`${API_URL}/users/login`, payload)
		console.log("🚀 ~ file: api.js ~ line 38 ~ login ~ response", data, status)

		return { data, status }
	} catch (err) {
		throw err
	}
}
