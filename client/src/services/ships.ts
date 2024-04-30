import { api } from 'util/api'

import { ShipNoIdType } from 'types'

const getAll = async () => {
	const res = await api.get('/ship')
	return res.data
}

const create = async (ship: ShipNoIdType) => {
	const res = await api.post('/ship', ship)
	return res.data
}

const remove = async (id: number) => {
	await api.delete(`/ship/${id}`)
}

const services = { getAll, create, remove }

export default services
