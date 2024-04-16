import {
	Box,
	Button,
	CssBaseline,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { DepartureType, DockType, RouteType } from '../../../../types'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'

export const Timetable = () => {
	const navigate = useNavigate()
	const dock = useParams().dock

	// const time = useSelector((state: { time: number }) => state.time)
	const routes = useSelector((state: { routes: RouteType[] }) => state.routes)
	const departures = useSelector(
		(state: { departures: any[] }) => state.departures
	)
	// const timeString = new Date(time).toLocaleTimeString('fi-FI', {
	// 	timeStyle: 'short',
	// })

	const starts = [...new Set(routes.map((r) => r.startDock.name))]



	return (
		<div>
			<CssBaseline />
			{!dock ? (
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
						{starts.map((r) => (
							<TableRow key={r}>
								<TableCell align='center'>
									<Button onClick={() => navigate(`/timetable/${r}`)}>
										{r}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<Box>
					<Button onClick={() => navigate('/timetable')}>
						<ArrowCircleLeftOutlinedIcon />
					</Button>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align='center'>
									<Typography variant='h5' fontWeight={'bold'}>
										{dock}
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{departures.map(
								(d) =>
									d.route.startDock.name === dock && (
										<TableRow key={d.id}>
											<TableCell align='left'>
												<Typography sx={{ fontWeight: 'bold' }}>
													{d.route.endDock.name}
												</Typography>
												{d.route.stops.length > 0 && (
													<Typography>
														{`via:  `}
														{d.route.stops
															.map((s: { dock: DockType }) => s.dock.name)
															.toString()}
													</Typography>
												)}
											</TableCell>
											<TableCell
												sx={{
													verticalAlign: 'top',
													justifySelf: 'right',
												}}
											>
												<Typography sx={{ fontWeight: 'bold' }}>
													{d.startTime}
												</Typography>
											</TableCell>
										</TableRow>
									)
							)}
						</TableBody>
					</Table>
				</Box>
			)}
		</div>
	)
}
