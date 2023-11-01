import express, { RequestHandler, Request } from 'express'

import { User } from '../models'
import { UserNoId } from '../../types'

const router = express.Router()

// interface UserNoId {
// 	name: string
// 	userName: string
// }

// const isUserNoId = (obj: UserNoId): obj is UserNoId => {
// 	return (
// 		typeof obj === 'object' &&
// 		typeof obj.name === 'string' &&
// 		typeof obj.userName === 'string'
// 	)
// }

router.get('/', (async (_req, res) => {
	const users: User[] = await User.findAll()
	res.json(users)
}) as RequestHandler)

router.post('/', (async (
	req: Request<object, object, UserNoId>,
	// req: Request<object, object, UserNoId>,
	res
) => {
	const body = { ...req.body }

	// if (!isUserNoId(req.body)) {
	// 	return res.status(400).json({ error: 'Invalid request body' })
	// }
	try {
		// const body = { ...req.body }
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
