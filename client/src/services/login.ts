import axios from 'axios'
import { LoginUser } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/login'
		: '/api/login'

const login = async (credentials: LoginUser) => {
	const res = await axios.post(baseUrl, credentials)
	console.log('service: ', res)

	return res.data
}

const api = { login }

export default api
