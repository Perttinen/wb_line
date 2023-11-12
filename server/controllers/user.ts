import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'

import { User, UserLevel } from '../models'
import { UserNoIdType } from '../../types'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	const users: User[] = await User.findAll({
		include: {
			model: UserLevel,
		},
		where: { username: { [Op.not]: [process.env.SU_USERNAME] } },
	})
	res.json(users)
}) as RequestHandler)

router.post('/', (async (req: Request<object, object, UserNoIdType>, res) => {
	const body: UserNoIdType = { ...req.body }
	const saltRounds: number = 10
	const newUser = {
		...body,
		password: await bcrypt.hash(body.password, saltRounds),
	}

	try {
		const user = await User.create(newUser)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const userWithLevel = await User.findByPk(user.dataValues.id, {
			include: { model: UserLevel },
		})
		return res.json(userWithLevel)
	} catch (e) {
		return res.status(400).json({ e })
	}
}) as RequestHandler)

router.delete('/:id', (async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) await user.destroy()
		res.json(user)
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
