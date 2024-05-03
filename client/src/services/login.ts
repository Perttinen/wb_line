import { api } from 'util/api'
import { LoginUser } from 'types'

const login = async (credentials: LoginUser) => {
	try {
		const res = await api.post('/login', credentials)
		localStorage.setItem('token', res.data.token)
		return res.data
	} catch (e) {
		console.log('e in serv: ', e);
		return e
	}
}

export const loginService = { login }


