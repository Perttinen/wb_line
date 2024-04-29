import express from 'express'
import { UserLevel } from '../models'
import dotenv from 'dotenv'

// import { tokenExtractor } from '../util/middleware'

dotenv.config()

const router = express.Router()

router.get('/', async (_req, res) => {
	try {
		const users: UserLevel[] = await UserLevel.findAll()
		res.json(users)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

export default router
