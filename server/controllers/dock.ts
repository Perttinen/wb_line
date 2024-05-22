import express from 'express'
import { Op } from 'sequelize'

import {
	Departure,
	Dock, Route,
	Stop,
} from '../models'

const router = express.Router()

router.get('/', async (_req, res, next) => {
	try {
		const docks: Dock[] = await Dock.findAll()
		res.json(docks)
	} catch (error) {
		next(error)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const dock = await Dock.create(req.body)
		res.json(dock)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const dock = await Dock.findByPk(req.params.id)
		if (dock) {
			const routeIds: number[] = []
			const routeIdsToDestroy: Route[] = await Route.findAll({
				where: {
					[Op.or]: {
						startDockId: dock.dataValues.id,
						endDockId: dock.dataValues.id,
					}
				},
				attributes: { exclude: ['startDockId', 'endDockId'] },
			})
			for (let i in routeIdsToDestroy) {
				routeIds.push(routeIdsToDestroy[i].dataValues.id)
			}
			if (routeIds.length > 0) {
				await Departure.destroy({
					where: {
						routeId: routeIds
					}
				})
			}
			await Stop.destroy({
				where:
				{
					[Op.or]: {
						dockId: dock.dataValues.id,
						routeId: routeIds,
					}
				}
			})
			await Route.destroy({
				where: {
					id: routeIds
				}
			})
			await dock.destroy()
			res.status(204).json(dock)
		}
	} catch (error) {
		next(error)
	}
})

export default router
