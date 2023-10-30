import axios from 'axios'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/user'
		: '/api/user'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((res) => res.data)
}

const create = (newObject) => {
	const res = axios.post(baseUrl, newObject)
	return res
}

const remove = (id) => {
	axios.delete(`${baseUrl}/${id}`)
}

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove }
