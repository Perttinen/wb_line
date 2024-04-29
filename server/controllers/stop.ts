import express from 'express'

import { tokenExtractor } from '../util/middleware'
import { Stop } from '../models'

const router = express.Router()

router.get('/', tokenExtractor, async (_req, res) => {
	try {
		const stops: Stop[] = await Stop.findAll()
		res.json(stops)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const stop = await Stop.create(req.body)
		res.json(stop)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

router.delete('/:id', tokenExtractor, async (req, res) => {
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
