import { api } from 'util/api'
import { StopNoIdType } from 'types'

const getAll = async () => {
	const res = await api.get('/stop')
	return res.data
}

const create = async (stop: StopNoIdType) => {
	const res = await api.post('/stop', stop)
	return res.data
}

const remove = async (id: number) => {
	await api.delete(`/stop/${id}`)
}

const services = { getAll, create, remove }

export default services
