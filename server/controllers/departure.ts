import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'

// import { Dock, Route, Stop } from '../models'
// import { InitRouteType } from '../../types'
import { Dayjs } from 'dayjs'
import { Departure } from '../models'

dotenv.config()

const router = express.Router()

// router.get('/', (async (_req, res) => {
// 	const routes: Route[] = await Route.findAll({
// 		include: [
// 			{ model: Dock, as: 'startDock' },
// 			{ model: Dock, as: 'endDock' },
// 			{ model: Stop, as: 'stops', include: [{ model: Dock, as: 'dock' }] },
// 		],
// 	})
// 	res.json(routes)
// }) as RequestHandler)

router.post('/', (async (
	req: Request<object, object, { routeId: number; departureTime: Dayjs }>,
	res
) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { routeId, departureTime } = req.body
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	console.log(departureTime)

	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const newSchedule = await Departure.create({
			routeId: routeId,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			startTime: departureTime,
		})

		res.status(201).json(newSchedule)
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		res.status(500).json(error)
	}
}) as RequestHandler)

// router.delete('/:id', (async (req, res) => {
// 	try {
// 		const route = await Route.findByPk(req.params.id)
// 		if (route) {
// 			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// 			await Stop.destroy({ where: { routeId: route.dataValues.id } })
// 			await route.destroy()
// 		}
// 		res.json(route)
// 	} catch (e) {
// 		res.status(204).end()
// 	}
// }) as RequestHandler)

export default router
