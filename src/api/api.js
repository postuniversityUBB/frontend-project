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

export const deleteProject = async projectCode => {
	try {
		const { status } = await axios.delete(`${API_URL}/projects/${projectCode}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 36 ~ deleteProject")
		return status;
	} catch (err) {
		throw err
	}
}

export const getTasksForProject = async projectCode => {
	try {
		const { data } = await axios.get(`${API_URL}/projects/${projectCode}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 50 ~ getTasksForProject")
		return data;
	} catch (err) {
		throw err
	}
}

export const postTask = async (payload, projectCode) => {
	try {
		await axios.post(`${API_URL}/projects/${projectCode}/tasks`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 64 ~ postTask")
		return
	} catch (err) {
		throw err
	}
}

export const deleteTask = async taskCode => {
	try {
		const { status } = await axios.delete(`${API_URL}/tasks/${taskCode}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 36 ~ deleteProject")
		return status;
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
		console.log("🚀 ~ file: api.js ~ line 64 ~ getUsers ~ response", data)
		return data
	} catch (err) {
		throw err
	}
}

export const register = async payload => {
	try {
		const { status } = await axios.post(`${API_URL}/users/register`, payload)
		console.log("🚀 ~ file: api.js ~ line 78 ~ register ~ response", status)

		return status
	} catch (err) {
		throw err
	}
}

export const login = async payload => {
	try {
		const { data, status } = await axios.post(`${API_URL}/users/login`, payload)
		console.log("🚀 ~ file: api.js ~ line 89 ~ login ~ response", data, status)

		return { data, status }
	} catch (err) {
		throw err
	}
}
