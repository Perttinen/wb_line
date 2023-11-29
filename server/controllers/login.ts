import express, { RequestHandler, Request } from 'express'
import { LoginUser, UserType, UserForTokenType } from '../../types'
import { User, UserLevel } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/', (async (req: Request<object, object, LoginUser>, res) => {
	const body = { ...req.body }
	const user: User | null = await User.findOne({
		where: { username: body.username },
		include: { model: UserLevel },
	})

	if (!user) {
		return res.status(401).json({ error: 'invalid username or password' })
	}
	const jsonUser: UserType = user.toJSON()

	const passwordOk = await bcrypt.compare(body.password, jsonUser.password)
	if (!passwordOk) {
		return res.status(401).json({ error: 'invalid username or password' })
	}

	const userForToken: UserForTokenType = {
		username: jsonUser.username,
		id: jsonUser.id,
	}

	const token = jwt.sign(userForToken, process.env.JWT_SECRET!)

	return res.json({ ...jsonUser, token })
}) as RequestHandler)

export default router
