import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'

import { RouteDocksType, RouteType, RouteWithAllType } from 'types'
import { AppDispatch } from 'store'
import { removeRoute } from 'reducers/routeReducer'
import { Fragment, useState } from 'react'
import { initializeDepartures } from 'reducers/departureReducer'

type MyAlertProps = {
	id: number
}

const MyAlert = (props: MyAlertProps) => {
	console.log(props.id);
	const [alert, setAlert] = useState(false)

	const dispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	const handleDelete = async (id: number) => {
		await dispatch(removeRoute(id))
		dispatch(initializeDepartures())
	}

	return (
		<>
			<Button variant='text'
				onClick={() => { setAlert(true) }}
			>
				delete
			</Button>
			<Dialog
				open={alert}
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Deleting route will also delete all routes scheduled starts from timetable!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='text' onClick={() => {
						console.log('this id: ', props.id)
						setAlert(false)
					}}>cancel</Button>
					<Button variant='text' onClick={() => {
						handleDelete(props.id)
						setAlert(false)
					}}>delete</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export const RouteList = () => {

	const navigate = useNavigate()

	const routes = useSelector((state: { routes: RouteWithAllType[] }) => state.routes)

	const sortedRoutes = [...routes].sort((a, b) => {
		const routeA = a.startDock.name.toUpperCase()
		const routeB = b.startDock.name.toUpperCase()
		return (
			routeA < routeB ? -1 :
				routeA > routeB ? 1 :
					0)
	})

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
		<>
			<Box >
				<Table  >
					<TableBody>
						{sortedRoutes.map((r) => {
							const routeDocks = getRouteDocks(r)
							return (
								<Fragment key={r.id}>
									<TableRow sx={{ verticalAlign: 'top' }}>
										<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
											{routeDocks.map((r, i) => <Typography key={i}>{r.name}</Typography>)}
										</TableCell>
										<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
											<Button variant='text' onClick={() => navigate('/schedule', { state: { routeId: r.id, docks: routeDocks } })} >
												schedule
											</Button>
										</TableCell>
										<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
											<MyAlert id={r.id} />
										</TableCell>
									</TableRow>
								</Fragment>
							)
						})}
					</TableBody>
				</Table>
			</Box>
		</>
	)
}