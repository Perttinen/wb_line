import express from 'express'
import dotenv from 'dotenv'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'

import { User, UserLevel } from '../models'
import {
	ChangePasswordType,
	UserNoIdType
} from '../../types'
import { tokenExtractor } from '../util/middleware'
import { parseString, toChangePasswordType } from '../util/typeguards'


dotenv.config()

const router = express.Router()

router.get('/', async (_req, res) => {
	console.log('router');

	try {
		// const user = await User.findByPk(req.decodedToken.id, {include:[{model: UserLevel, as: 'userLevel'} ]})


		// if(user?.dataValues.userLevel.levelNumber >= 50){
		const users: User[] = await User.findAll({
			include: {
				model: UserLevel,
			},
			where: { username: { [Op.not]: [process.env.SU_USERNAME] } },
		})
		console.log('get users: ', users.map(n => n.toJSON()));

		res.json(users)
	}
	// }
	catch (e) {
		console.log('error in get users! ', e);

		res.status(400).json({ e })
	}
})

router.get('/currentUser', tokenExtractor, async (req, res) => {
	console.log('currentusercontroller');

	const user = await User.findByPk(req.decodedToken.id, { include: [{ model: UserLevel, as: 'userLevel' }] })

	res.json(user)
})

router.post('/', tokenExtractor, async (req, res) => {
	const body: UserNoIdType = { ...req.body }
	const saltRounds: number = 10
	const newUser = {
		...body,
		password: await bcrypt.hash(body.password, saltRounds),
		firstTime: true,
	}
	try {
		const user = await User.create(newUser)
		const userWithLevel = await User.findByPk(user.dataValues.id, {
			include: { model: UserLevel },
		})
		return res.json(userWithLevel)
	} catch (e) {
		return res.status(400).json({ e })
	}
})

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) await user.destroy()
		res.json(user)
	} catch (e) {
		res.status(204).end()
	}
})

router.put(
	'/pw/:id', tokenExtractor, async (req, res) => {
		// '/pw/:id', tokenExtractor, async (req: Request<{ id: number }, object, object>, res) => {
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
