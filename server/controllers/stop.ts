import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'

import { Stop } from '../models'
import { StopNoIdType } from '../../types'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	const stops: Stop[] = await Stop.findAll()
	res.json(stops)
}) as RequestHandler)

router.post('/', (async (req: Request<object, object, StopNoIdType>, res) => {
	// const body: string = req.body
	console.log(req.body)

	try {
		const stop = await Stop.create(req.body)
		return res.json(stop)
	} catch (e) {
		return res.status(400).json({ e })
	}
}) as RequestHandler)

router.delete('/:id', (async (req, res) => {
	try {
		const stop = await Stop.findByPk(req.params.id)
		if (stop) await stop.destroy()
		res.json(stop)
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
