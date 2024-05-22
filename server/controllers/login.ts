import express from 'express'
import { UserType, UserForTokenType } from '../../types'
import { User } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res, next) => {
	try {
		const body = { ...req.body }
		const user: User | null = await User.findOne({
			where: { username: body.username },
		})
		if (!user) {
			res.status(401).send(new Error('invalid username or password').message)
		}
		if (user) {
			const jsonUser: UserType = user.toJSON()
			const passwordOk = await bcrypt.compare(body.password, jsonUser.password)
			if (!passwordOk) {
				res.status(401).send(new Error('invalid username or password').message)
			}
			const userForToken: UserForTokenType = {
				username: jsonUser.username,
				id: jsonUser.id,
			}
			const token = jwt.sign(userForToken, process.env.JWT_SECRET!)
			res.json({ ...jsonUser, token })
		}
	} catch (error) {
		next(error)
	}
})

export default router
