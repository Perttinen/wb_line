import express from 'express'

import { Departure, Dock, Route, Stop } from '../models'

const router = express.Router()

router.get('/', async (_req, res, next) => {
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
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async (req, res, next) => {

	const id = req.params.id
	try {

		const route = await Route.findByPk(id, {
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
		res.json(route)
	} catch (error) {
		next(error)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const routeToSave = {
			startDockId: req.body.startDockId,
			endDockId: req.body.endDockId,
		}
		const route = await Route.create(routeToSave)
		res.json(route)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const route = await Route.findByPk(req.params.id)
		if (route) {
			await Stop.destroy({ where: { routeId: req.params.id } })
			await Departure.destroy({ where: { routeId: req.params.id } })
			await route.destroy();
		}
		res.json(route)
	} catch (error) {
		next(error)
	}
})

export default router
