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
import { TextButton } from 'views/components/SmallOnes';
import { useState } from 'react'

export const RouteList = () => {

	const [alert, setAlert] = useState(-1)

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
		<>
			<Dialog
				open={alert !== -1}
				onClose={() => setAlert(-1)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
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
					<TextButton actionType='cancel' label='cancel' whenClicked={() => setAlert(-1)} />
					<TextButton actionType='trash' label='delete' whenClicked={() => {
						handleDelete(alert)
						setAlert(-1)
					}} />
				</DialogActions>
			</Dialog>
			<Box >
				<Table  >
					<TableBody>
						{routes.map((r) => {
							const routeDocks = getRouteDocks(r)
							return (

								<TableRow key={r.id} sx={{ verticalAlign: 'top' }}>
									<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
										{routeDocks.map((r, i) => <Typography key={i}>{r.name}</Typography>)}
									</TableCell>
									<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
										<Button variant='text' onClick={() => navigate('/schedule', { state: { routeId: r.id, docks: routeDocks } })} >
											schedule
										</Button>
									</TableCell>
									<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
										<Button variant='text' onClick={() => { setAlert(r.id) }} >
											delete
										</Button>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</Box>
		</>
	)
}