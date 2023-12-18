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

	console.log(departures)

	const scheduleDispatch: (
		...args: unknown[]
	) => Promise<DepartureType> | number = useDispatch<AppDispatch>()

	interface FormValues {
		startTime: Dayjs | null
		routeId: number | ''
	}

	const initialValues: FormValues = {
		startTime: null,
		routeId: '',
	}

	return (
		<div>
			<CssBaseline />
			<Box sx={{ marginTop: '1rem' }}>
				<Formik
					initialValues={initialValues}
					onSubmit={async (values, { setSubmitting }) => {
						const valuesToDisp = await scheduleService.create(values)
						console.log('vtd', valuesToDisp)
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
										onChange={(newValue) => {
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
							<Table>
								<TableBody>
									{departures.map(
										(d) => (
											<TableRow key={d.id}>
												<TableCell>
													<Typography>{`${d.startTime.substring(0, 16)} ${
														d.route.name
													}`}</Typography>
												</TableCell>
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
						</Form>
					)}
				</Formik>
			</Box>
		</div>
	)
}
