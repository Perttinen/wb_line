import axios from 'axios'
import { ShipNoIdType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/ship'
		: '/api/ship'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const create = async (ship: ShipNoIdType) => {
	console.log(ship)

	const res = await axios.post(baseUrl, ship)
	console.log('serv ', res.data)

	return res.data
}

const remove = async (id: number) => {
	await axios.delete(`${baseUrl}/${id}`)
}

// const update = (id: number, pwdata: ChangePasswordType) => {
// 	// const idstr = id.toString()
// 	return axios.put(`${baseUrl}/pw/${id}`, pwdata)
// }

const api = { getAll, create, remove }

export default api
