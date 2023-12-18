import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'

import { Dock, Route, Stop } from '../models'
import { InitRouteType } from '../../types'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	const routes: Route[] = await Route.findAll({
		include: [
			{ model: Dock, as: 'startDock' },
			{ model: Dock, as: 'endDock' },
			{ model: Stop, as: 'stops', include: [{ model: Dock, as: 'dock' }] },
		],
	})
	res.json(routes)
}) as RequestHandler)

router.post('/', (async (req: Request<object, object, InitRouteType>, res) => {
	try {
		const routeToSave = {
			startDockId: req.body.startDockId,
			endDockId: req.body.endDockId,
			name: req.body.name,
		}
		const route = await Route.create(routeToSave)
		if (req.body.stops.length > 0) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			for (const stop of req.body.stops) {
				const toSave = {
					delayTimeMinutes: stop.time,
					dockId: stop.dock,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					routeId: route.dataValues.id,
				}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				await Stop.create(toSave)
			}
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const resRoute = await Route.findByPk(route.dataValues.id, {
			include: [
				{ model: Dock, as: 'startDock' },
				{ model: Dock, as: 'endDock' },
				{ model: Stop, as: 'stops', include: [{ model: Dock, as: 'dock' }] },
			],
		})
		return res.json(resRoute)
	} catch (e) {
		return res.status(400).json({ e })
	}
}) as RequestHandler)

router.delete('/:id', (async (req, res) => {
	try {
		const route = await Route.findByPk(req.params.id)
		if (route) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			// await Stop.destroy({ where: { routeId: route.dataValues.id } })
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			// await Departure.destroy({ where: { routeId: route.dataValues.id } })
			await route.destroy()
		}
		res.json(route)
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
