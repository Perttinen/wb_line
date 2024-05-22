import express from 'express'

import { Ship } from '../models'


const router = express.Router()

router.get('/', async (_req, res, next) => {
	try {
		const ships: Ship[] = await Ship.findAll()
		res.json(ships)
	} catch (error) {
		next(error)
	}
})

router.post('/', async (req, res, next) => {
	const shipToAdd = req.body
	try {
		const ship = await Ship.create(shipToAdd)
		res.json(ship)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const ship = await Ship.findByPk(req.params.id)
		if (ship) await ship.destroy()
		res.json(ship)
	} catch (error) {
		next(error)
	}
})

export default router
