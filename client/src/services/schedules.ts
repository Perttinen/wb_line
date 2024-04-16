import axios from 'axios'

import { initDepartureType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/departure'
		: '/api/departure'

const token = localStorage.getItem('token')

const getAll = async () => {
	const res = await axios.get(baseUrl, { headers: { 'Authorization': `bearer ${token}` } })
	return res.data
}

// const getByStartpoint = async (dockname: string) => {
// 	const res = await axios.get(baseUrl, { params: { dock: dockname } })
// 	return res.data
// }

const create = async (values: initDepartureType) => {
	const valuesToSave = values


	// try {
	const response = await axios.post(baseUrl, valuesToSave, { headers: { 'Authorization': `bearer ${token}` } })
	return response.data
	// } catch (error) {
	// 	return
	// }
}

const remove = async (id: number) => {


	await axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `bearer ${token}` } })
}

const api = { getAll, create, remove }

export default api
