import { Box, Button, CssBaseline, MenuItem, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Field, Form, Formik } from 'formik'
import dayjs, { Dayjs } from 'dayjs'
import { useSelector } from 'react-redux'
import { RouteType } from '../../../../types'
import scheduleService from '../../services/schedules'

export const Schedule = () => {
	const routes = useSelector((state: { routes: RouteType[] }) => state.routes)

	interface FormValues {
		departureTime: Dayjs
		routeId: number | ''
	}

	const initialValues: FormValues = {
		departureTime: dayjs(),
		routeId: '',
	}

	return (
		<div>
			<CssBaseline />
			<Box sx={{ marginTop: '1rem' }}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values, { setSubmitting }) => {
						scheduleService.create(values)
						console.log(values)
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
							<Field name='departureTime'>
								{() => (
									<DateTimePicker
										label='Departure Time'
										value={values.departureTime}
										onChange={(newValue) => {
											setFieldValue('departureTime', newValue)
										}}
									/>
								)}
							</Field>
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
							<Button
								variant='contained'
								color='primary'
								disabled={isSubmitting}
								onClick={submitForm}
							>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</div>
	)
}
