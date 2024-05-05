import {
	TextField,
	Box,
	Typography
} from '@mui/material'
import { FieldArray, Form, Formik, getIn } from 'formik'
import * as Yup from 'yup'
import { DockType } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import { createRoute, initializeRoutes } from 'reducers/routeReducer'
import { AppDispatch } from 'store'
import { DockSelect } from './DockSelect'
import { IconButton } from 'views/components/SmallOnes'

export const RoutePlanner = ({
	setShowRoutePlanner,
}: {
	setShowRoutePlanner: (val: boolean) => void
}) => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()
	const docks = useSelector((state: { docks: DockType[] }) => state.docks)

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

	type StoppiType = {
		dockId: number,
		delayTimeMinutes: number
	}

	type FormValues = {
		startDockId: number
		stops: StoppiType[]
		endDockId: number
	}

	const handleSubmit = async (values: FormValues) => {
		console.log();
		if (
			typeof values.startDockId === 'number' &&
			typeof values.endDockId === 'number'
		) {
			dispatch(createRoute(values))
			dispatch(initializeRoutes)
		}

		setShowRoutePlanner(false)
	}

	const initialValues: FormValues = {
		startDockId: docks[0].id,
		stops: [],
		endDockId: docks[0].id,
	}

	return (
		<div>
			<Box sx={{ backgroundColor: '#f5f5f5', padding: '10px', border: 1, borderRadius: '5px', marginTop: '10px' }}>
				<Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
					<Typography fontSize={'1.2rem'}>New Route</Typography>
				</Box>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values) => {
						handleSubmit(values)
					}}
				>
					{props => (
						<Form autoComplete='off'>

							<Box display={'flex'} flexDirection={'column'} sx={{ backgroundColor: 'white', borderBlockColor: 'black', borderWidth: '2px', border: 1, padding: '10px', borderRadius: '5px' }}>
								<Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
									<Typography fontSize={'1rem'}>Start point</Typography>
								</Box>
								<DockSelect formikProps={props} docks={docks} name='startDockId' label='Start point' />
							</Box>
							<FieldArray name='stops'>
								{({ push, remove }) => (
									<div>
										{props.values.stops.length > 0 &&
											props.values.stops.map((p: StoppiType, index) => {
												const dock = `stops[${index}].dockId`
												const time = `stops[${index}].delayTimeMinutes`
												const fieldLabel = `stop point ${index + 1}`
												return (
													<Box
														key={index}
														display={'flex'}
														flexDirection={'column'}
														sx={{ borderBlockColor: 'black', borderWidth: '2px', border: 1, padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
													>
														<Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
															<Typography fontSize={'1rem'}>{`Stop point ${index + 1}`}</Typography>
														</Box>
														<DockSelect formikProps={props} docks={docks} name={dock} label={fieldLabel} />
														<Box display={'flex'} flexDirection={'row'}>
															{/* <Box display={'flex'} flexDirection={'column'}> */}
															<TextField
																sx={{ width: '50%' }}
																margin='normal'
																variant='outlined'
																label='Time from start point (min)'
																name={time}
																value={p.delayTimeMinutes}
																type='number'
																required
																onChange={props.handleChange}
																onBlur={props.handleBlur}
																error={Boolean(getIn(props.touched, time)) && Boolean(getIn(props.errors, time))}
																helperText={Boolean(getIn(props.touched, time)) && getIn(props.errors, time)}
															/>
															{/* </Box> */}
															<IconButton iconType='trash' whenClicked={() => remove(index)} />
														</Box>
													</Box>
												)
											})}
										<Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
											<IconButton
												whenClicked={() => push({ dockId: docks[0].id, delayTimeMinutes: 1 })}
												iconType='add' />
										</Box>
									</div>
								)}
							</FieldArray>
							<Box display={'flex'} flexDirection={'column'} sx={{ backgroundColor: 'white', borderBlockColor: 'black', borderWidth: '2px', border: 1, padding: '10px', borderRadius: '5px' }}>
								<Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
									<Typography fontSize={'1rem'}>End point</Typography>
								</Box>
								<DockSelect formikProps={props} docks={docks} name='endDockId' label='End point' />
							</Box>
							<Box display={'flex'} flexDirection={'row'}>
								<IconButton buttonType='submit' iconType='save' />
								<IconButton buttonType='reset' iconType='cancel' whenClicked={() => setShowRoutePlanner(false)} />
							</Box>

						</Form>
					)}
				</Formik>
			</Box>
		</div >
	)
}