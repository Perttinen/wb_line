import express from 'express'

import { Departure, Dock, Route, Stop } from '../models'
import { tokenExtractor } from '../util/middleware'

const router = express.Router()

router.get('/', async (_req, res) => {
	try {
		const routes: Route[] = await Route.findAll({
			attributes: { exclude: ['endDockId', 'startDockId'] },
			include: [
				{ model: Dock, as: 'startDock' },
				{ model: Dock, as: 'endDock' },
				{ model: Stop, as: 'stops', include: [{ model: Dock, as: 'dock' }], attributes: { exclude: ['dockId', 'routeId'] } },
			],
			order: [
				[{ model: Stop, as: 'stops' }, 'delayTimeMinutes'],
			],
		})

		res.json(routes)
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

router.get('/:id', async (req, res) => {
	const route = await Route.findByPk(req.params.id, {
		attributes: { exclude: ['endDockId', 'startDockId'] },
		include: [
			{ model: Dock, as: 'startDock' },
			{ model: Dock, as: 'endDock' },
			{ model: Stop, as: 'stops', include: [{ model: Dock, as: 'dock' }], attributes: { exclude: ['dockId', 'routeId'] } },
		],
		order: [
			[{ model: Stop, as: 'stops' }, 'delayTimeMinutes'],
		],
	})
	return res.json(route)
})

router.post('/', async (req, res) => {

	console.log('controller');

	try {
		const routeToSave = {
			startDockId: req.body.startDockId,
			endDockId: req.body.endDockId,
		}
		const route = await Route.create(routeToSave)
		// if (req.body.stops.length > 0) {
		// 	for (const stop of req.body.stops) {
		// 		const toSave = {
		// 			delayTimeMinutes: stop.time,
		// 			dockId: stop.dock,
		// 			routeId: route.dataValues.id,
		// 		}
		// 		await Stop.create(toSave)
		// 	}
		// }
		// const resRoute = await Route.findByPk(route.dataValues.id, {
		// 	include: [
		// 		{ model: Dock, as: 'startDock' },
		// 		{ model: Dock, as: 'endDock' },
		// 		{ model: Stop, as: 'stops', include: [{ model: Dock, as: 'dock' }] },
		// 	],
		// })
		return res.json(route)
	} catch (e) {
		console.log(e)
		return res.status(500).json(e)
	}
})

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const route = await Route.findByPk(req.params.id)
		if (route) {
			await Stop.destroy({ where: { routeId: req.params.id } })
			await Departure.destroy({ where: { routeId: req.params.id } })
			await route.destroy();
		}
		res.json(route)
	} catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
})

export default router
