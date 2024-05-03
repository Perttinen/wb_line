import { api } from 'util/api'
import { StopNoIdType } from 'types'

const getAll = async () => {
	const res = await api.get('/stop')
	return res.data
}

const create = async (stops: StopNoIdType[]) => {
	const res = await api.post('/stop', stops)
	return res.data
}

const remove = async (id: number) => {
	await api.delete(`/stop/${id}`)
}

export const stopService = { getAll, create, remove }
