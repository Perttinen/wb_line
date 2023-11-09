import express, { RequestHandler, Request } from 'express'
import { LoginUser, UserType } from '../../types'
import { User } from '../models'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/', (async (req: Request<object, object, LoginUser>, res) => {
	const body = { ...req.body }
	const user: User | null = await User.findOne({
		where: { username: body.username },
	})

	if (!user) {
		return res.status(401).json({ error: 'invalid username or password' })
	}
	const jsonUser: UserType = user.toJSON()
	const passwordOk = await bcrypt.compare(body.password, jsonUser.password)
	if (!passwordOk) {
		return res.status(401).json({ error: 'invalid username or password' })
	}
	return res.json(user)
}) as RequestHandler)

export default router
