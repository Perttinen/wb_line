import express from 'express'
import { UserLevel } from '../models'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.get('/', async (_req, res, next) => {
	try {
		const users: UserLevel[] = await UserLevel.findAll()
		res.json(users)
	} catch (error) {
		next(error);
	}
})

export default router
