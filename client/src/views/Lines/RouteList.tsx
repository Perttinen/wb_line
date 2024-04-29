import routeService from '../../services/route'
import { RouteDocksType, RouteType } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'
import { AppDispatch } from '../../store'
import { removeRoute } from '../../reducers/routeReducer'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DepartureBoardOutlinedIcon from '@mui/icons-material/DepartureBoardOutlined';
import { useNavigate } from 'react-router-dom'


export const RouteList = () => {
	const routes = useSelector((state: { routes: RouteType[] }) => state.routes)

	const newRoutes = routes.map(r => {
		const sortedStops = [...r.stops].sort((a, b) => a.delayTimeMinutes - b.delayTimeMinutes)
		r = { ...r, stops: sortedStops }
		return r
	})

	console.log(newRoutes);


	const dispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	const handleDelete = async (id: number) => {
		await routeService.remove(id)
		dispatch(removeRoute(id))
	}

	const navigate = useNavigate()

	const getRouteDocks = (id: number): any[] => {
		const route = newRoutes.find(r => r.id === id)
		let docks: RouteDocksType[] = []
		if (route) {
			docks.push({ id: route.startDock.id, name: route.startDock.name })
			if (route && route.stops) {
				route.stops.sort((a, b) => a.delayTimeMinutes - b.delayTimeMinutes)
				for (let s of route?.stops) {
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
				{newRoutes.map((r) => (
					<TableRow key={r.id} sx={{ verticalAlign: 'top' }}>
						<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
							{getRouteDocks(r.id).map(r => <Typography key={r.id}>{r.name}</Typography>)}
						</TableCell>

						<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>

							<Button onClick={() => navigate('/schedule', { state: { routeId: r.id, docks: getRouteDocks(r.id) } })}>
								<DepartureBoardOutlinedIcon />
							</Button>

						</TableCell>

						<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
							<Button onClick={() => handleDelete(r.id)}>
								<DeleteOutlinedIcon />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	) : (
		<h3>loading</h3>
	)
}
