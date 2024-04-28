import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'
import { tokenExtractor } from '../util/middleware'
import { Dayjs } from 'dayjs'
import { Departure, Dock, Route, Stop } from '../models'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	console.log('getting timetable');

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
}) as RequestHandler)

router.post('/', tokenExtractor, (async (
	req: Request<object, object, { routeId: number; startTime: Dayjs }[]>,
	res
) => {
	const starts = req.body
	try {
		const newBulkSchedule = await Departure.bulkCreate(starts)
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
}) as RequestHandler)

router.delete('/', tokenExtractor, (async (req, res) => {
	try {
		console.log(req.body);
		await Departure.destroy({ where: { id: req.body } })
		res.status(204)
	} catch (e) {
		res.status(520).json(e)
	}
}) as RequestHandler)

export default router
