import axios from 'axios'
import { InitRouteType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/route'
		: '/api/route'

const token = localStorage.getItem('token')

const getAll = async () => {
	const res = await axios.get(baseUrl, { headers: { 'Authorization': `bearer ${token}` } })
	return res.data
}

const create = async (route: InitRouteType) => {


	const res = await axios.post(baseUrl, route, { headers: { 'Authorization': `bearer ${token}` } })

	return res.data
}

const remove = async (id: number) => {
	console.log(await axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `bearer ${token}` } }));
}

const api = { getAll, create, remove }

export default api
