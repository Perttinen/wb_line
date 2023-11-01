import express, { RequestHandler, Request } from 'express'

import { User } from '../models'
import { UserNoId } from '../../types'

const router = express.Router()

router.get('/', (async (_req, res) => {
	const users: User[] = await User.findAll()
	res.json(users)
}) as RequestHandler)

router.post('/', (async (req: Request<object, object, UserNoId>, res) => {
	const body = { ...req.body }
	try {
		const user = await User.create(body)
		return res.json(user)
	} catch (e) {
		return res.status(400).json({ e })
	}
}) as RequestHandler)

router.delete('/:id', (async (req, res) => {
	try {
		console.log(req.params.id)
		const user = await User.findByPk(req.params.id)
		if (user) await user.destroy()
		res.json(user)
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
