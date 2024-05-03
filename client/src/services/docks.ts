import { DockNoIdType } from 'types'
import { api } from 'util/api'

const getAll = async () => {
	const res = await api.get('/dock')
	return res.data
}

const create = async (dock: DockNoIdType) => {
	const res = await api.post('/dock', dock)
	return res.data
}

const remove = async (id: number) => {
	await api.delete(`/dock/${id}`)
}

export const dockService = { getAll, create, remove }

