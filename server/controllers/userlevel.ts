import express, { RequestHandler } from 'express'
import { UserLevel } from '../models'
import dotenv from 'dotenv'

// import { tokenExtractor } from '../util/middleware'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	const users: UserLevel[] = await UserLevel.findAll()
	res.json(users)
}) as RequestHandler)

export default router
