import {
	Alert,
	Box,
	Snackbar
} from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { DockType, RouteFormValuesType } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import { createRoute, initializeRoutes } from 'reducers/routeReducer'
import { AppDispatch } from 'store'
import { FormSelect, FormTextField, IconButton, FormGroupContainer, FormMainContainer, SaveAndCancelButtons } from 'views/components/SmallOnes'
import { useState } from 'react'

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
		<div>
			<FormMainContainer caption='NEW ROUTE'>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values) => {
						handleSubmit(values)
					}}>
					{props => (
						<Form autoComplete='off'>
							<FormGroupContainer caption='Start point'>
								<FormSelect options={docks} name='startDockId' label='dock' />
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
															<FormSelect options={docks} name={dock} label={fieldLabel} />
															<Box display={'flex'} flexDirection={'row'}>
																<FormTextField type='number' label='minutes from start' name={time} />
																<Box display={'flex'} flexDirection={'row'} alignContent={'center'} >
																	<IconButton iconType='trash' whenClicked={() => remove(index)} />
																</Box>
															</Box>
														</>
													</FormGroupContainer>
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
							<FormGroupContainer caption='End point'>
								<FormSelect options={docks} name='endDockId' label='dock' />
							</FormGroupContainer>
							<SaveAndCancelButtons onCancel={() => setShowRoutePlanner(false)} />
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
		</div >
	)
}




