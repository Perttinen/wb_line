import {
	Button,
	CssBaseline,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DepartureType, DockType } from '../../../../types'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppDispatch } from '../../store'
import { useEffect } from 'react'
import { initializeDepartures } from '../../reducers/departureReducer'

export const Timetable = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	useEffect(() => {
		if (location.pathname === '/public/timetable') {
			dispatch(initializeDepartures())
		}
	}, [dispatch])

	const departures = useSelector(
		(state: { departures: any[] }) => state.departures
	)

	const getDockList = (departures: DepartureType[]) => {
		const docks: DockType[] = []
		for (let i in departures) {
			!docks.find(d => d.id === departures[i].route.startDock.id) && docks.push(departures[i].route.startDock)
			for (let c in departures[i].route.stops) {
				!docks.find(d => d.id === departures[i].route.stops[c].dock.id) && docks.push(departures[i].route.stops[c].dock)
			}
		}
		return docks
	}

	return (
		<div>
			<CssBaseline />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='center'>
							<Typography variant='h5' fontWeight={'bold'}>
								timetables
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{getDockList(departures).map((d) => (
						<TableRow key={d.id}>
							<TableCell align='center'>
								<Button onClick={() => localStorage.getItem('token') ? navigate(`/timetablebyid/${d.id}`) : navigate(`/public/timetablebyid/${d.id}`)}>
									{d.name}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
