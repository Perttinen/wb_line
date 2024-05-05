import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'

import { RouteDocksType, RouteType, RouteWithAllType } from 'types'
import { AppDispatch } from 'store'
import { removeRoute } from 'reducers/routeReducer'
import { IconButton } from 'views/components/SmallOnes';

export const RouteList = () => {

	const navigate = useNavigate()

	const routes = useSelector((state: { routes: RouteWithAllType[] }) => state.routes)
	console.log(routes);

	const dispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	const handleDelete = async (id: number) => {
		dispatch(removeRoute(id))
	}

	const getRouteDocks = (route: RouteWithAllType) => {

		let docks: RouteDocksType[] = []
		if (route) {
			docks.push({ id: route.startDock.id, name: route.startDock.name })
			if (route && route.stops) {
				for (let s of route.stops) {
					docks.push({ id: s.dock.id, name: s.dock.name })
				}
			}
			docks.push({ id: route.endDock.id, name: route.endDock.name })
		}
		return docks
	}

	return (
		<Table>
			<TableBody>
				{routes.map((r) => {
					const routeDocks = getRouteDocks(r)
					return (
						<TableRow key={r.id} sx={{ verticalAlign: 'top' }}>
							<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
								{routeDocks.map((r, i) => <Typography key={i}>{r.name}</Typography>)}
							</TableCell>
							<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
								<IconButton iconType='schedule' whenClicked={() => navigate('/schedule', { state: { routeId: r.id, docks: routeDocks } })} />
							</TableCell>
							<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
								<IconButton whenClicked={() => handleDelete(r.id)} iconType='trash' />
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}