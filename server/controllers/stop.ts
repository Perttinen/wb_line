import express from 'express'

import { Stop } from '../models'

const router = express.Router()

router.get('/', async (_req, res) => {
	try {
		const stops: Stop[] = await Stop.findAll()
		res.json(stops)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

router.post('/', async (req, res) => {
	try {
		const stops = await Stop.bulkCreate(req.body)
		res.json(stops)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const stop = await Stop.findByPk(req.params.id)
		if (stop) await stop.destroy()
		res.json(stop)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

export default router
