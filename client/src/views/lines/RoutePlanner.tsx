import {

	Button,
	TextField,
	MenuItem,
	Box

} from '@mui/material'
import { ErrorMessage, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { DockType } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { createRoute, initializeRoutes } from 'reducers/routeReducer'
import { AppDispatch } from 'store'
import HighlightOff from '@mui/icons-material/HighlightOff'
import SaveAltIcon from '@mui/icons-material/SaveAlt'




export const RoutePlanner = ({
	setShowRoutePlanner,
}: {
	setShowRoutePlanner: (val: boolean) => void
}) => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()
	const docks = useSelector((state: { docks: DockType[] }) => state.docks).concat({ id: -1, name: '' })

	const validationSchema = Yup.object().shape({
		startDockId: Yup.number().min(0, 'Start point is required!').required('Start point is required!'),
		stops: Yup.array().of(
			Yup.object().shape({
				dockId: Yup.number().min(0, "Stop point can't be empty!").required("Stop point can't be empty!"),
				delayTimeMinutes: Yup.number().min(1, "Time can't be empty!").required("Time can't be empty!"),
			})
		),
		endDockId: Yup.number().min(0, 'End point is required!').required('End point is required!'),
	})

	interface FormValues {

		startDockId: number

		stops: {
			dockId: number,
			delayTimeMinutes: number
		}[]


		endDockId: number

	}



	const handleSubmit = async (values: FormValues) => {
		console.log();

		if (
			values.startDockId !== -1 &&
			values.endDockId !== -1
		) {
			dispatch(createRoute(values))
			dispatch(initializeRoutes)
		}

		setShowRoutePlanner(false)
	}


	return (
		<div>
			<Formik
				initialValues={{
					startDockId: -1,
					stops: [],
					endDockId: -1,
				}}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					console.log()
					handleSubmit(values)
				}}
			>
				{({ values, handleChange, handleBlur }) => (
					<Form autoComplete='off'>
						<TextField
							fullWidth
							select
							margin='normal'
							variant='outlined'
							name='startDockId'
							value={values.startDockId}
							onChange={handleChange}
							onBlur={handleBlur}
							label='Start point'
						>
							{docks.map((dock) => (
								<MenuItem key={dock.id} value={dock.id}>
									{dock.name}
								</MenuItem>
							))}
						</TextField>
						<ErrorMessage name="startDockId">
							{msg => <div style={{ color: 'red' }}>{msg}</div>}
						</ErrorMessage>
						<FieldArray name='stops'>
							{({ push, remove }) => (
								<div>
									{values.stops.length > 0 &&
										values.stops.map((p: {
											dockId: number
											delayTimeMinutes: number
										}, index) => {
											const dock = `stops[${index}].dockId`

											const time = `stops[${index}].delayTimeMinutes`

											const fieldLabel = `stop point ${index + 1}`

											return (
												<Box
													key={index}
													display={'flex'}
													flexDirection={'column'}
												>
													<TextField
														fullWidth
														select
														margin='normal'
														variant='outlined'
														label={fieldLabel}
														name={dock}
														// name={dock}
														value={p.dockId}
														required
														// id={dock}
														onChange={handleChange}
														onBlur={handleBlur}
													>
														{docks.map((dock) => (
															<MenuItem key={dock.id} value={dock.id}>
																{dock.name}
															</MenuItem>
														))}
													</TextField>
													<ErrorMessage name={dock}>
														{msg => <div style={{ color: 'red' }}>{msg}</div>}
													</ErrorMessage>

													<Box display={'flex'} flexDirection={'row'}>
														<Box display={'flex'} flexDirection={'column'}>
															<TextField
																sx={{ width: '20rem' }}
																margin='normal'
																variant='outlined'
																label='Time from start point (min)'
																name={time}
																value={p.delayTimeMinutes}
																type='number'
																required
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															<ErrorMessage name={time}>
																{msg => <div style={{ color: 'red' }}>{msg}</div>}
															</ErrorMessage>
														</Box>
														<Button
															onClick={() => remove(index)}
														>
															<DeleteOutlinedIcon />
														</Button>
													</Box>
												</Box>
											)
										})}
									<Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
										<Button
											sx={{ fontSize: '2rem' }}
											type='button'
											onClick={() => push({ dockId: '', delayTimeMinutes: '' })}
										>
											<AddCircleOutlineIcon fontSize='inherit' />
										</Button>
									</Box>
								</div>
							)}
						</FieldArray>
						<TextField
							fullWidth
							select
							margin='normal'
							variant='outlined'
							required
							name='endDockId'
							value={values.endDockId}
							onChange={handleChange}
							onBlur={handleBlur}
							label='End point'
						>
							{docks.map((dock) => (
								<MenuItem key={dock.id} value={dock.id}>
									{dock.name}
								</MenuItem>
							))}
						</TextField>
						<ErrorMessage name="endDockId">
							{msg => <div style={{ color: 'red' }}>{msg}</div>}
						</ErrorMessage>
						<Box display={'flex'} flexDirection={'row'}>
							<Button
								type='submit'
								fullWidth
								sx={{ mt: 3, mb: 2, color: '#1E8449', fontSize: '2rem' }}
							>
								<SaveAltIcon fontSize='inherit' />
							</Button>
							<Button
								type='reset'
								onClick={() => setShowRoutePlanner(false)}
								fullWidth
								sx={{ mt: 3, mb: 2, color: '#B03A2E', fontSize: '2rem' }}
							>
								<HighlightOff fontSize='inherit' />
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</div>
	)
}