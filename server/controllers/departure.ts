import express from 'express'
import { tokenExtractor } from '../util/middleware'
import { Departure, Dock, Route, Stop } from '../models'
import { Op } from 'sequelize'
// import { DepartureType } from '../../types'

const router = express.Router()

router.get('/', async (_req, res) => {
	try {
		const departures: Departure[] = await Departure.findAll({
			include: [
				{
					model: Route,
					as: 'route',
					include: [
						{ model: Dock, as: 'startDock' },
						{ model: Dock, as: 'endDock' },
						{
							model: Stop,
							as: 'stops',
							order: ['delayTimeMinutes'],
							include: [{ model: Dock, as: 'dock' }],
							attributes: { exclude: ['dockId', 'routeId'] },
						},
					],
					attributes: { exclude: ['startDockId', 'endDockId'] },
				},
			],
			attributes: { exclude: ['routeId'] },
		})
		res.json(departures)
	} catch (e) {
		res.status(500).json(e)
	}
})

router.get('/shortlist', async (_req, res) => {
	const fromDate = new Date()
	const toDate = new Date().setDate(fromDate.getDate() + 2)
	console.log(fromDate, toDate);

	const resDepartures = await Departure.findAll({
		order: ['startTime'],
		where: {
			startTime: { [Op.between]: [fromDate, toDate] }
		},
		include: [
			{
				model: Route,
				as: 'route',
				include: [
					{ model: Dock, as: 'startDock' },
					{ model: Dock, as: 'endDock' },
					{
						model: Stop,
						as: 'stops',
						order: ['delayTimeMinutes'],
						include: [{ model: Dock, as: 'dock' }],
						attributes: { exclude: ['dockId', 'routeId'] },
					},
				],
				attributes: { exclude: ['startDockId', 'endDockId'] },
			},
		],
		attributes: { exclude: ['routeId'] },

	})
	res.json(resDepartures)
})

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const newBulkSchedule = await Departure.bulkCreate(req.body)
		const idArr: number[] = []
		for (let d in newBulkSchedule) {
			idArr.push(newBulkSchedule[d].dataValues.id);
		}
		const resDepartures = await Departure.findAll({
			where: { id: idArr },
			include: [
				{
					model: Route,
					as: 'route',
					include: [
						{ model: Dock, as: 'startDock' },
						{ model: Dock, as: 'endDock' },
						{
							model: Stop,
							as: 'stops',
							include: [{ model: Dock, as: 'dock' }],
							attributes: { exclude: ['dockId', 'routeId'] },
						},
					],
					attributes: { exclude: ['startDockId', 'endDockId'] },
				},
			],
			attributes: { exclude: ['routeId'] },
		})
		res.status(201).json(resDepartures)
	} catch (error) {
		res.status(500).json(error)
	}
})

router.delete('/', tokenExtractor, async (req, res) => {
	try {
		console.log('body: ', req.body);

		await Departure.destroy({ where: { id: req.body } })
		res.status(204).json(req.body)
	} catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
})

export default router
