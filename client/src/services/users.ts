import { api } from 'util/api'
import { ChangePasswordType, UserNoIdType, UserType } from 'types'

const getAll = async () => {
	const res = await api.get('/user')
	return res.data
}

const getCurrentUser = async () => {
	const res = await api.get(`/user/currentUser`)
	return res.data
}

const create = async (newUser: UserNoIdType) => {
	const res = await api.post('/user', newUser)
	return res
}

const remove = async (id: number) => {
	await api.delete(`/user/${id}`)
}

const update = async (pwdata: ChangePasswordType) => {
	console.log('service', pwdata);

	const res: UserType = await api.put('/user/pw', pwdata)
	return res
}

export const userService = { getAll, create, remove, update, getCurrentUser }
