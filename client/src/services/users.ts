import { api } from 'util/api'
import { ChangePasswordType, UserNoIdType } from 'types'

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

const update = (id: number, pwdata: ChangePasswordType) => {
	return api.put(`/user/pw/${id}`, pwdata)
}

const services = { getAll, create, remove, update, getCurrentUser }

export default services
