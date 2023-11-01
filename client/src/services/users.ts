import axios from 'axios'
import { UserNoId } from '../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/user'
		: '/api/user'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const create = async (newUser: UserNoId) => {
	const res = await axios.post(baseUrl, newUser)
	return res
}

const remove = async (id: string) => {
	await axios.delete(`${baseUrl}/${id}`)
}

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

const api = { getAll, create, remove }

export default api
