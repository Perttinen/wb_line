import {
	Box,
	Button,
	CssBaseline,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Field, Form, Formik } from 'formik'
import dayjs, { Dayjs } from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { DepartureType, RouteType } from '../../../../types'
import scheduleService from '../../services/schedules'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { AppDispatch } from '../../store'
import {
	appendDeparture,
	removeDeparture,
} from '../../reducers/departureReducer'

export const Schedule = () => {
	const routes = useSelector((state: { routes: RouteType[] }) => state.routes)
	const departures = useSelector(
		(state: { departures: DepartureType[] }) => state.departures
	)




	const scheduleDispatch: (
		...args: unknown[]
	) => Promise<DepartureType> | number = useDispatch<AppDispatch>()

	interface FormValues {
		startTime: Dayjs
		routeId: number | ''
	}

	const initialValues: FormValues = {
		startTime: dayjs(),
		routeId: '',
	}

	const datesAreSame = (d1: Date, d2: Date) => {
		if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) {
			return true
		}
		return false
	}

	const departuresToShow = (values: FormValues) => {

		let toShow =
			departures.filter(d => datesAreSame(new Date(values.startTime.toDate()), new Date(d.startTime)))
		if (values.routeId !== '') {
			const filtered = toShow.filter(d => d.route.id === values.routeId)
			return filtered
		}
		return toShow
	}


	return (
		<div>
			<CssBaseline />
			<Box sx={{ marginTop: '1rem' }}>
				<Formik
					initialValues={initialValues}
					onSubmit={async (values, { setSubmitting }) => {
						const valuesToDisp = await scheduleService.create(values)

						scheduleDispatch(appendDeparture(valuesToDisp))
						setSubmitting(false)
					}}
				>
					{({
						submitForm,
						isSubmitting,
						setFieldValue,
						values,
						handleBlur,
						handleChange,
					}) => (
						<Form>
							<TextField
								fullWidth
								select
								margin='normal'
								variant='outlined'
								required
								name='routeId'
								value={values.routeId}
								onChange={handleChange}
								onBlur={handleBlur}
								label='Route'
							>
								{routes.map((route) => (
									<MenuItem key={route.id} value={route.id}>
										{route.name}({route.id})
									</MenuItem>
								))}
							</TextField>
							<Field name='startTime'>
								{() => (
									<DateTimePicker
										label='Departure Time'
										value={values.startTime}
										onChange=
										{(newValue): void => {
											setFieldValue('startTime', newValue)


										}}
									/>
								)}
							</Field>

							<Button
								variant='contained'
								color='primary'
								disabled={isSubmitting}
								onClick={submitForm}
							>
								Submit
							</Button>
							<Button
								variant='contained'
								color='primary'
								disabled={isSubmitting}
								onClick={() => departuresToShow(values)}
							>
								Show
							</Button>
							{departures.length > 0 ?
								<Table>
									<TableBody>
										{departuresToShow(values).map(
											(d) => (
												<TableRow key={d.id}>
													<TableCell>
														<Typography>{`${new Date(d.startTime).toLocaleDateString()}`}</Typography>
													</TableCell>
													<TableCell>
														<Typography>{`${new Date(d.startTime).toLocaleTimeString([], { timeStyle: 'short' })}`}</Typography>
													</TableCell>
													<TableCell><Typography>{d.route.name}</Typography></TableCell>

													<TableCell>
														<Button
															onClick={() => {
																scheduleDispatch(removeDeparture(d.id))
																scheduleService.remove(d.id)
															}}
														>
															<DeleteOutlinedIcon />
														</Button>
													</TableCell>
												</TableRow>
											)
											// )
										)}
									</TableBody>
								</Table>
								: <Typography>Loading...</Typography>}
						</Form>
					)}
				</Formik>
			</Box>
		</div>
	)
}
