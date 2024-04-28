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

const create = async (values: initDepartureType[]) => {
	console.log('token in service: ', token);
	const valuesToSave = values
	const response = await axios.post(baseUrl, valuesToSave, { headers: { 'Authorization': `bearer ${token}` } })
	console.log(response.data);
	return response.data
}

const remove = async (id: number[]) => {
	await axios.delete(baseUrl, { data: id, headers: { 'Authorization': `bearer ${token}` } })
}

const api = { getAll, create, remove }

export default api
