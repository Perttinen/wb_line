import axios from 'axios'
import { DockNoIdType, InitRouteType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/route'
		: '/api/route'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const create = async (route: InitRouteType) => {
	console.log(route)

	const res = await axios.post(baseUrl, route)

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
