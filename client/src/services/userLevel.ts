import axios from 'axios'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/userlevel'
		: '/api/userlevel'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const api = { getAll }

export default api
