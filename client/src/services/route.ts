import { api } from 'util/api'
import { InitRouteType } from 'types'

const getAll = async () => {
	const res = await api.get('/route')
	return res.data
}

const create = async (route: InitRouteType) => {
	const res = await api.post('/route', route)
	return res.data
}

const remove = async (id: number) => {
	console.log(await api.delete(`/route/${id}`));
}

const services = { getAll, create, remove }

export default services
