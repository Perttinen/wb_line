import express, { RequestHandler, Request } from 'express'
import dotenv from 'dotenv'

import { Dock, Route } from '../models'
import { RouteNoIdType } from '../../types'

dotenv.config()

const router = express.Router()

router.get('/', (async (_req, res) => {
	const routes: Route[] = await Route.findAll({
		include: [
			{ model: Dock, as: 'startDock' },
			{ model: Dock, as: 'endDock' },
		],
	})
	res.json(routes)
}) as RequestHandler)

router.post('/', (async (req: Request<object, object, RouteNoIdType>, res) => {
	// const body: string = req.body
	console.log(req.body)

	try {
		const route = await Route.create(req.body)
		console.log(route.toJSON().id)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const resRoute = await Route.findByPk(route.dataValues.id, {
			include: [
				{ model: Dock, as: 'startDock' },
				{ model: Dock, as: 'endDock' },
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
		if (route) await route.destroy()
		res.json(route)
	} catch (e) {
		res.status(204).end()
	}
}) as RequestHandler)

export default router
