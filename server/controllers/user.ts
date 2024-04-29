import express from 'express'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'

import { User, UserLevel } from '../models'
import { ChangePasswordType, UserNoIdType } from '../../types'
import { tokenExtractor } from '../util/middleware'
import { parseString, toChangePasswordType } from '../util/typeguards'

const router = express.Router()

router.get('/', tokenExtractor, async (req, res) => {
	try {
		const user: User | null = await User.findByPk(req.decodedToken.id)
		if (user && user.dataValues.user_level_id === 1) {
			const users: User[] = await User.findAll({
				include: {
					model: UserLevel,
				},
				where: { username: { [Op.not]: [process.env.SU_USERNAME] } },
			})
			res.json(users)
		}
	}
	catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
})

router.get('/currentUser', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id, { include: [{ model: UserLevel, as: 'userLevel' }] })
	res.json(user)
})

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const body: UserNoIdType = { ...req.body }
		const saltRounds: number = 10
		const newUser = {
			...body,
			password: await bcrypt.hash(body.password, saltRounds),
			firstTime: true,
		}
		const user = await User.create(newUser)
		const userWithLevel = await User.findByPk(user.dataValues.id, {
			include: { model: UserLevel },
		})
		return res.json(userWithLevel)
	} catch (e) {
		console.log(e);
		return res.status(500).json(e)
	}
})

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) await user.destroy()
		res.json(user)
	} catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
})

router.put(
	'/pw/:id', tokenExtractor, async (req, res) => {
		try {
			const body: ChangePasswordType = toChangePasswordType({ ...req.body })
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
					res.json(user)
				}
			}
			throw new Error()
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: 'Wrong password!' })
		}
	}
)

export default router
