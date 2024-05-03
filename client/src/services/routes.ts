import { api } from 'util/api'
import { RouteNoIdType } from 'types'

const getAll = async () => {
	const res = await api.get('/route')
	return res.data
}

const create = async (values: RouteNoIdType) => {
	const res = await api.post('/route', values)
	return res.data
}

const remove = async (id: number) => {
	console.log(await api.delete(`/route/${id}`));
}

const getOne = async (id: number) => {
	const res = await api.get(`/route/${id}`)
	return res.data
}

export const routeService = { getAll, create, remove, getOne }

