import express from 'express'

import { Stop } from '../models'

const router = express.Router()

router.get('/', async (_req, res, next) => {
	try {
		const stops: Stop[] = await Stop.findAll()
		res.json(stops)
	} catch (error) {
		next(error)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const stops = await Stop.bulkCreate(req.body)
		res.json(stops)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const stop = await Stop.findByPk(req.params.id)
		if (stop) await stop.destroy()
		res.json(stop)
	} catch (error) {
		next(error)
	}
})

export default router
