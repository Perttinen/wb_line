import { api } from 'util/api'
import { initDepartureType } from 'types'

const getAll = async () => {
	const res = await api.get('/departure')
	return res.data
}

const getShortlist = async () => {
	// try {
	const res = await api.get('/departure/shortlist')
	return res.data
	// } catch (e) {
	// 	console.log(e);
	// }

}

const createShortlist = async (values: initDepartureType[]) => {
	try {
		const res = await api.post('/departure/shortlist', values)
		return res.data
	} catch (e) {
		console.log(e);

	}
}

const removeShortlist = async (id: number[]) => {
	const res = await api.delete('/departure/shortlist', { data: id })
	return res
}

const create = async (values: initDepartureType[]) => {
	const res = await api.post('/departure', values)
	return res.data
}

const remove = async (id: number[]) => {
	const res = await api.delete('/departure', { data: id })
	return res
}

export const departureService = { getAll, create, remove, getShortlist, createShortlist, removeShortlist }


