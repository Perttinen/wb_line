import { api } from "util/api"

const getAll = async () => {
	const res = await api.get('/userlevel')
	return res.data
}

export const userLevelService = { getAll }

