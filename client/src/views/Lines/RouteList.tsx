import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DepartureBoardOutlinedIcon from '@mui/icons-material/DepartureBoardOutlined';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'

import { RouteDocksType, RouteType } from 'types'
import { AppDispatch } from 'store'
import { removeRoute } from 'reducers/routeReducer'

export const RouteList = () => {
	const navigate = useNavigate()
	const routes = useSelector((state: { routes: RouteType[] }) => state.routes)
	const dispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	const handleDelete = async (id: number) => {
		dispatch(removeRoute(id))
	}
	const getRouteDocks = (route: RouteType) => {
		let docks: RouteDocksType[] = []
		if (route) {
			docks.push({ id: route.startDock.id, name: route.startDock.name })
			if (route && route.stops) {
				for (let s of route.stops) {
					docks.push({ id: s.dock.id, name: s.dock.name })
					console.log(s.dock.name)
				}
			}
			docks.push({ id: route.endDock.id, name: route.endDock.name })
		}
		return docks
	}

	return routes ? (
		<Table>
			<TableBody>
				{routes.map((r) => {
					const routeDocks = getRouteDocks(r)
					return (
						<TableRow key={r.id} sx={{ verticalAlign: 'top' }}>
							<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
								{routeDocks.map(r => <Typography key={r.id}>{r.name}</Typography>)}
							</TableCell>
							<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
								<Button onClick={() => navigate('/schedule', { state: { routeId: r.id, docks: routeDocks } })}>
									<DepartureBoardOutlinedIcon />
								</Button>
							</TableCell>
							<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
								<Button onClick={() => handleDelete(r.id)}>
									<DeleteOutlinedIcon />
								</Button>
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	) : (
		<h3>loading</h3>
	)
}