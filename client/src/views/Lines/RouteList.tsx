import { useEffect, useState } from 'react'
import routeService from '../../services/route'
import { RouteType } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'
import { AppDispatch } from '../../store'
import { removeRoute } from '../../reducers/routeReducer'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

export const RouteList = () => {
	// const [routes, setRoutes] = useState<RouteType[]>([])
	const routes = useSelector((state: { routes: RouteType[] }) => state.routes)

	const dispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	const handleDelete = async (id: number) => {
		await routeService.remove(id)
		dispatch(removeRoute(id))
	}

	return routes ? (
		<Table>
			<TableBody>
				{routes.map((r) => (
					<TableRow key={r.id} sx={{ verticalAlign: 'top' }}>
						<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
							<Typography>{r.name}</Typography>
							<Typography>{r.startDock.name}</Typography>
							<Typography>{r.endDock.name}</Typography>
						</TableCell>

						<TableCell sx={{ paddingRight: '2px', paddingLeft: '4px' }}>
							{r.stops.length > 0 && <Typography>via:</Typography>}
							{r.stops &&
								r.stops.length > 0 &&
								r.stops.map((s) => (
									<Typography key={s.id}>{s.dock.name}</Typography>
								))}
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
