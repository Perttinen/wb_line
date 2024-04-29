import axios from 'axios'
import { DockNoIdType } from '../../../types'

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/dock'
		: '/api/dock'

const token = localStorage.getItem('token')

const getAll = async () => {
	const res = await axios.get(baseUrl, { headers: { 'Authorization': `bearer ${token}` } })
	return res.data
}

const create = async (dock: DockNoIdType) => {


	const res = await axios.post(baseUrl, dock, { headers: { 'Authorization': `bearer ${token}` } })


	return res.data
}

const remove = async (id: number) => {
	await axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `bearer ${token}` } })

}

const api = { getAll, create, remove }

export default api
