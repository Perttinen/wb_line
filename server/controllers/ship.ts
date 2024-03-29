import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'

import { Ship } from '../models'
import { ShipNoIdType } from '../../types'
import { tokenExtractor } from '../util/middleware'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	const ships: Ship[] = await Ship.findAll()
	res.json(ships)
}) as RequestHandler)

router.post('/', tokenExtractor, (async (req: Request<object, object, ShipNoIdType>, res) => {


	try {
		const ship = await Ship.create(req.body)
		return res.json(ship)
	} catch (e) {
		return res.status(400).json({ e })
	}
}) as RequestHandler)

router.delete('/:id', tokenExtractor, (async (req, res) => {
	try {
		const ship = await Ship.findByPk(req.params.id)
		if (ship) await ship.destroy()
		res.json(ship)
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
