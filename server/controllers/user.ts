import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'

import { User, UserLevel } from '../models'
import { ChangePasswordType, UserNoIdType } from '../../types'

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
		firstTime: true,
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

const toNewPasswordType = (object: unknown): ChangePasswordType => {
	const isString = (text: unknown): text is string => {
		return typeof text === 'string' || text instanceof String
	}

	const parseString = (text: unknown): string => {
		if (!isString(text)) {
			throw new Error('incorrect or missing value in object')
		}
		return text
	}
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data')
	}

	if (
		'currentPassword' in object &&
		'newPassword' in object &&
		'confirmPassword' in object
	) {
		const newPWT: ChangePasswordType = {
			currentPassword: parseString(object.currentPassword),
			newPassword: parseString(object.newPassword),
			confirmPassword: parseString(object.confirmPassword),
		}

		return newPWT
	}

	throw new Error('Incorrect data: a field missing')
}

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

const parseString = (text: unknown): string => {
	if (!isString(text)) {
		throw new Error('incorrect or missing value in object')
	}
	return text
}

router.put(
	'/pw/:id',
	async (req: Request<{ id: number }, object, object>, res) => {
		try {
			const body: ChangePasswordType = toNewPasswordType(req.body)
			const user = await User.findByPk(req.params.id)
			const saltRounds = 10
			if (user) {
				const passw = parseString(user.get('password'))
				if (await bcrypt.compare(body.currentPassword, passw)) {
					user.set({
						password: await bcrypt.hash(body.newPassword, saltRounds),
						firstTime: false,
					})
					await user.save()
					return res.json(user)
				}
			}
			throw new Error()
		} catch (e) {
			return res.status(401).json({ error: 'Wrong password!' })
		}
	}
)

export default router
