import { api } from "util/api"

const getAll = async () => {
	const res = await api.get('/userlevel')
	return res.data
}

const services = { getAll }

export default services
