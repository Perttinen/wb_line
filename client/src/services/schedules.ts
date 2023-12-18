import axios from 'axios'
import { Dayjs } from 'dayjs'
import { initDepartureType, DockNameType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/departure'
		: '/api/departure'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const getByStartpoint = async (dockname: string) => {
	const res = await axios.get(baseUrl, { params: { dock: dockname } })
	return res.data
}

const create = async (values: initDepartureType) => {
	const valuesToSave = values
	console.log(valuesToSave)

	// try {
	const response = await axios.post(baseUrl, valuesToSave)
	return response.data
	// } catch (error) {
	// 	return
	// }
}

const remove = async (id: number) => {
	console.log('serv', id)

	await axios.delete(`${baseUrl}/${id}`)
}

const api = { getAll, create, remove }

export default api
