import { api } from 'util/api'
import { LoginUser } from 'types'

const login = async (credentials: LoginUser) => {
	const res = await api.post('/login', credentials)
	localStorage.setItem('token', res.data.token)
	return res.data
}

const service = { login }

export default service
