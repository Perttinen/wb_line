import axios from 'axios'
import { StopNoIdType, RouteNoIdType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/stop'
		: '/api/stop'

const token = localStorage.getItem('token')

const getAll = async () => {
	const res = await axios.get(baseUrl, {headers: {'Authorization': `bearer ${token}`}})
	return res.data
}

const create = async (stop: StopNoIdType) => {
	console.log('serv_req ', stop)

	const res = await axios.post(baseUrl, stop, {headers: {'Authorization': `bearer ${token}`}})
	console.log('serv_res ', res.data)

	return res.data
}

const remove = async (id: number) => {
	await axios.delete(`${baseUrl}/${id}`, {headers: {'Authorization': `bearer ${token}`}})
}

// const update = (id: number, pwdata: ChangePasswordType) => {
// 	// const idstr = id.toString()
// 	return axios.put(`${baseUrl}/pw/${id}`, pwdata)
// }

const api = { getAll, create, remove }

export default api
