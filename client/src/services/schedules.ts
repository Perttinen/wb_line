import axios from 'axios'
import { Dayjs } from 'dayjs'
import { initDepartureType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/departure'
		: '/api/departure'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const create = async (values: initDepartureType) => {
	const valuesToSave = values
	console.log(valuesToSave)

	try {
		const response = await axios.post(baseUrl, valuesToSave)
		console.log(response.data)
	} catch (error) {
		console.error(error)
	}
}

const remove = async (id: number) => {
	await axios.delete(`${baseUrl}/${id}`)
}

const api = { getAll, create, remove }

export default api
