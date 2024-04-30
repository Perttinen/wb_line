import { api } from 'util/api'
import { initDepartureType } from 'types'

const getAll = async () => {
	const res = await api.get('/departure')
	return res.data
}

const create = async (values: initDepartureType[]) => {
	const response = await api.post('/departure', values)
	return response.data
}

const remove = async (id: number[]) => {
	await api.delete('/departure', { data: id })
}

const services = { getAll, create, remove }

export default services
