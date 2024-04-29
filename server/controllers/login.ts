import express from 'express'
import { UserType, UserForTokenType } from '../../types'
import { User, UserLevel } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res) => {
	try {
		const body = { ...req.body }
		const user: User | null = await User.findOne({
			where: { username: body.username },
			include: { model: UserLevel },
		})
		if (!user) res.status(401).json({ error: 'invalid username or password' })
		if (user) {
			const jsonUser: UserType = user.toJSON()
			const passwordOk = await bcrypt.compare(body.password, jsonUser.password)
			if (!passwordOk) {
				res.status(401).json({ error: 'invalid username or password' })
			}
			const userForToken: UserForTokenType = {
				username: jsonUser.username,
				id: jsonUser.id,
			}
			const token = jwt.sign(userForToken, process.env.JWT_SECRET!)
			res.json({ ...jsonUser, token })
		}
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

export default router
