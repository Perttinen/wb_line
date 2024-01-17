import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'
import { tokenExtractor } from '../util/middleware'
// import { Dock, Route, Stop } from '../models'
// import { InitRouteType } from '../../types'
import { Dayjs } from 'dayjs'
import { Departure, Dock, Route, Stop } from '../models'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
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
	req: Request<object, object, { routeId: number; startTime: Dayjs }>,
	res
) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { routeId, startTime } = req.body
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	// console.log(departureTime)

	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const newSchedule = await Departure.create({
			routeId: routeId,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			startTime: startTime,
		})

		const resDeparture = await Departure.findOne({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			where: { id: newSchedule.dataValues.id },
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		// resDeparture &&
		// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		// 	(resDeparture.dataValues.startTime =
		// 		resDeparture &&
		// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		// 		resDeparture.dataValues.startTime.toLocaleString('fi-FI'))

	

		res.status(201).json(resDeparture)
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		res.status(500).json(error)
	}
}) as RequestHandler)

router.delete('/:id', tokenExtractor, (async (req, res) => {
	try {
		const departure = await Departure.findByPk(req.params.id)
		if (departure) {
			await departure.destroy()
		}
		res.json(departure)
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
