import express from 'express'
import { Op } from 'sequelize'

import {
	Departure,
	Dock, Route,
	Stop,
} from '../models'

const router = express.Router()

router.get('/', async (_req, res) => {
	try {
		const docks: Dock[] = await Dock.findAll()
		res.json(docks)
	} catch (e) {
		res.status(500).json(e)
	}
})

router.post('/', async (req, res) => {
	try {
		const dock = await Dock.create(req.body)
		return res.json(dock)
	} catch (e) {
		return res.status(500).json(e)
	}
})

router.delete('/:id', async (req, res) => {
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
	} catch (e) {
		console.log(e);
		res.status(500).json(e)
	}
})

export default router
