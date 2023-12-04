import { useEffect, useState } from 'react'
import routeService from '../../services/route'
import { RouteType } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { AppDispatch } from '../../store'
import { removeRoute } from '../../reducers/routeReducer'

export const RouteList = () => {
	// const [routes, setRoutes] = useState<RouteType[]>([])
	const routes = useSelector((state: { routes: RouteType[] }) => state.routes)

	const dispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	// useEffect(() => {
	// 	routeService.getAll().then((r) => setRoutes(r))
	// }, [])

	console.log(routes)

	const handleDelete = async (id: number) => {
		await routeService.remove(id)
		dispatch(removeRoute(id))
	}

	return routes ? (
		routes.map((r) => (
			<p key={r.id}>
				{r.name} {r.startDock.name}-{r.endDock.name}{' '}
				<Button onClick={() => handleDelete(r.id)}>delete</Button>
			</p>
		))
	) : (
		<h3>loading</h3>
	)
}
