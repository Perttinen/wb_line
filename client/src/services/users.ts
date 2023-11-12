import axios from 'axios'
import { UserNoIdType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/user'
		: '/api/user'

const getAll = async () => {
	console.log('Users: getAll')

	const res = await axios.get(baseUrl)
	return res.data
}

const create = async (newUser: UserNoIdType) => {
	console.log('Users: create')
	const res = await axios.post(baseUrl, newUser)
	return res
}

const remove = async (id: number) => {
	console.log('Users: remove')
	await axios.delete(`${baseUrl}/${id}`)
}

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

const api = { getAll, create, remove }

export default api
