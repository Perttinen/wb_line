import express from 'express'

import { Ship } from '../models'
import { tokenExtractor } from '../util/middleware'

const router = express.Router()

router.get('/', async (_req, res) => {
	try {
		const ships: Ship[] = await Ship.findAll()
		res.json(ships)
	} catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
})

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const ship = await Ship.create(req.body)
		return res.json(ship)
	} catch (e) {
		console.log(e);
		return res.status(500).json(e)
	}
})

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const ship = await Ship.findByPk(req.params.id)
		if (ship) await ship.destroy()
		res.json(ship)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

export default router
