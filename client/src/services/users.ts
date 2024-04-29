import axios from 'axios'
import { ChangePasswordType, UserNoIdType } from '../../../types'



const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/user'
		: '/api/user'



const token = localStorage.getItem('token')




const getAll = async () => {

	try {
		const res = await axios.get(baseUrl
			, { headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` } }
		)
		return res.data
	} catch (e) {
		return e
	}
}

const getCurrentUser = async () => {
	const res = await axios.get(`${baseUrl}/currentUser`, { headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` } })
	return res.data
}

const create = async (newUser: UserNoIdType) => {
	const res = await axios.post(baseUrl, newUser, { headers: { 'Authorization': `bearer ${token}` } })
	return res
}

const remove = async (id: number) => {
	await axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `bearer ${token}` } })
}

const update = (id: number, pwdata: ChangePasswordType) => {
	return axios.put(`${baseUrl}/pw/${id}`, pwdata, { headers: { 'Authorization': `bearer ${token}` } })
}

const api = { getAll, create, remove, update, getCurrentUser }

export default api
