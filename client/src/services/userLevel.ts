import axios from 'axios'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/userlevel'
		: '/api/userlevel'

const token = localStorage.getItem('token')

const getAll = async () => {
	const res = await axios.get(baseUrl, {headers: {'Authorization': `bearer ${token}`}})
	return res.data
}

const api = { getAll }

export default api
