import axios from 'axios'
// const baseUrl = '/api/user'
// const baseUrl = 'http://localhost:3001/api/user'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/user'
		: '/api/user'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((res) => res.data)
}

// const create = newObject => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }