import {
	Alert,
	Box,
	Button,
	Snackbar
} from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { DockType, RouteFormValuesType } from 'types'
import { createRoute, initializeRoutes } from 'reducers/routeReducer'
import { AppDispatch } from 'store'
import { FormSelect, FormTextField, FormGroupContainer, FormMainContainer, SaveAndCancelButtons } from 'views/components/SmallOnes'

type PropsType = {
	setShowRoutePlanner: (val: boolean) => void
}

export const RoutePlanner = ({ setShowRoutePlanner }: PropsType) => {

	const [errorMsg, setErrorMsg] = useState('')

	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const docks = useSelector((state: { docks: DockType[] }) => state.docks)

	const validationSchema = Yup.object().shape({
		startDockId: Yup.number().min(0, 'Start point is required!').required('Start point is required!'),
		stops: Yup.array().of(
			Yup.object().shape({
				dockId: Yup.number().min(0, "Stop point can't be empty!").required("Stop point can't be empty!"),
				delayTimeMinutes: Yup.number().min(1, "values 1-3000").max(3000, "values 1-3000").required("Time can't be empty!"),
			})
		),
		endDockId: Yup.number().min(0, 'End point is required!').required('End point is required!'),
	})

	const docksAreUnique = (values: RouteFormValuesType) => {
		let ids: number[] = []
		ids.push(values.startDockId)
		ids.push(values.endDockId)
		for (let i in values.stops) {
			ids.push(values.stops[i].dockId)
		}
		const distinctIds = [...new Set(ids)]
		return ids.length === distinctIds.length
	}

	const handleSubmit = async (values: RouteFormValuesType) => {
		if (docksAreUnique(values)) {
			dispatch(createRoute(values))
			dispatch(initializeRoutes)
			setShowRoutePlanner(false)
		} else {
			setErrorMsg('All docks should be unique!')
		}
	}

	const initialValues: RouteFormValuesType = {
		startDockId: docks[0].id,
		stops: [],
		endDockId: docks[0].id,
	}

	return (
		<Box >
			<FormMainContainer>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values) => {
						handleSubmit(values)
					}}>
					{props => (
						<Form autoComplete='off'>
							<FormGroupContainer caption='Start point'>
								<FormSelect options={docks} name='startDockId' label='dock' selectKey='name' selectValue='id' />
							</FormGroupContainer>

							<FieldArray name='stops'>
								{({ push, remove }) => (
									<div>
										{props.values.stops.length > 0 &&
											props.values.stops.map((_p, index) => {
												const dock = `stops[${index}].dockId`
												const time = `stops[${index}].delayTimeMinutes`
												const fieldLabel = `dock`
												return (
													<FormGroupContainer key={index} caption={`Stop point ${index + 1}`}>
														<>
															<FormSelect options={docks} name={dock} label={fieldLabel} selectKey='name' selectValue='id' />
															{/* <FormSelect options={docks} name={dock} label={fieldLabel} /> */}
															<Box display={'flex'} flexDirection={'row'} alignItems={'flex-end'} justifyContent={'space-between'}>
																<FormTextField type='number' label='minutes from start' name={time} />
																{/* <Box display={'flex'} flexDirection={'row'} alignContent={'center'} > */}
																<Button onClick={() => remove(index)} variant='text' sx={{ overflow: 'clip', marginBottom: '8px', alignSelf: 'center', whiteSpace: 'nowrap' }} >
																	delete
																</Button>
																{/* </Box> */}
															</Box>
														</>
													</FormGroupContainer>
												)
											})}
										<Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
											<Button onClick={() => push({ dockId: docks[0].id, delayTimeMinutes: 1 })} variant='text'>
												add stop point
											</Button>
										</Box>
									</div>
								)}
							</FieldArray>
							<FormGroupContainer caption='End point'>
								<FormSelect options={docks} name='endDockId' label='dock' selectKey='name' selectValue='id' />
							</FormGroupContainer>
							<SaveAndCancelButtons submitLabel='create' onCancel={() => setShowRoutePlanner(false)} />
						</Form>
					)}
				</Formik>
			</FormMainContainer>
			<Snackbar
				open={errorMsg !== ''}
				autoHideDuration={4000}
				onClose={() => setErrorMsg('')}
			>
				<Alert severity='error'>{errorMsg}</Alert>
			</Snackbar>
		</Box >
	)
}




