import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'

import { Dock, Route, Stop } from '../models'
import { DockNoIdType } from '../../types'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	const docks: Dock[] = await Dock.findAll()
	res.json(docks)
}) as RequestHandler)

router.post('/', (async (req: Request<object, object, DockNoIdType>, res) => {
	// const body: string = req.body
	console.log(req.body)

	try {
		const dock = await Dock.create(req.body)
		return res.json(dock)
	} catch (e) {
		return res.status(400).json({ e })
	}
}) as RequestHandler)

router.delete('/:id', (async (req, res) => {
	try {
		const dock = await Dock.findByPk(req.params.id)

		if (dock) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			await Stop.destroy({ where: { dockId: dock.dataValues.id } })

			await Route.destroy({
				where: {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					startDockId: dock.dataValues.id,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					endDockId: dock.dataValues.id,
				},
			})
			await dock.destroy()

			res.json(dock)
		}
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
