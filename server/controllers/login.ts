import express, { RequestHandler, Request } from 'express'
import { LoginUser } from '../../types'
import { User } from '../models'

const router = express.Router()

router.post('/', (async (req: Request<object, object, LoginUser>, res) => {
	const body = { ...req.body }
	const user = await User.findOne({
		where: { username: body.username, password: body.password },
	})
	if (!user) {
		return res.status(401).json({ error: 'invalid username or password' })
	}
	return res.json(user)
}) as RequestHandler)

export default router
