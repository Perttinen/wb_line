import { api } from 'util/api'
import { initDepartureType } from 'types'

const getAll = async () => {
	const res = await api.get('/departure')
	return res.data
}

const create = async (values: initDepartureType[]) => {
	const res = await api.post('/departure', values)
	return res.data
}

const remove = async (id: number[]) => {
	const res = await api.delete('/departure', { data: id })
	return res
}

export const departureService = { getAll, create, remove }


