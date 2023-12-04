import {
	Divider,
	Button,
	TextField,
	MenuItem,
	Box,
	Typography,
} from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { DockType, RouteType } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import routeService from '../../services/route'
import { appendRoute } from '../../reducers/routeReducer'
import { AppDispatch } from '../../store'

export const RoutePlanner = () => {
	const docks = useSelector((state: { docks: DockType[] }) => state.docks)

	const dispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	const validationSchema = Yup.object().shape({
		start: Yup.object().shape({
			dock: Yup.string(),
		}),
		middle: Yup.array().of(
			Yup.object().shape({
				dock: Yup.string(),
				time: Yup.string(),
			})
		),
		end: Yup.object().shape({
			dock: Yup.string(),
		}),
	})

	interface FormValues {
		name: string
		start: {
			dock: number | ''
		}
		middle: {
			dock: string
			time: number
		}[]
		end: {
			dock: number | ''
		}
	}

	const handleSubmit = async (values: FormValues) => {
		if (
			typeof values.start.dock === 'number' &&
			typeof values.end.dock === 'number'
		) {
			const newRoute = await routeService.create({
				name: values.name,
				startDockId: values.start.dock,
				endDockId: values.end.dock,
			})
			dispatch(appendRoute(newRoute))
			console.log(values)
			console.log(newRoute)
		}
	}

	return (
		<div>
			<Formik<FormValues>
				initialValues={{
					name: '',
					start: {
						dock: '',
					},
					middle: [],
					end: {
						dock: '',
					},
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, touched, errors, handleChange, handleBlur, isValid }) => (
					<Form noValidate autoComplete='off'>
						<TextField
							fullWidth
							margin='normal'
							variant='outlined'
							required
							name='name'
							value={values.name}
							onChange={handleChange}
							onBlur={handleBlur}
							label='name'
						></TextField>
						<TextField
							fullWidth
							select
							margin='normal'
							variant='outlined'
							required
							name='start.dock'
							value={values.start.dock}
							onChange={handleChange}
							onBlur={handleBlur}
							label='Start point'
						>
							{docks.map((dock) => (
								<MenuItem key={dock.id} value={dock.id}>
									{dock.name}({dock.id})
								</MenuItem>
							))}
						</TextField>
						<FieldArray name='middle'>
							{({ push, remove }) => (
								<div>
									{values.middle &&
										values.middle.map((p, index) => {
											const dock = `middle[${index}].dock`

											const time = `middle[${index}].time`

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
														value={p.dock}
														required
														onChange={handleChange}
														onBlur={handleBlur}
													>
														{/* <MenuItem> </MenuItem> */}
														{docks.map((dock) => (
															<MenuItem key={dock.id} value={dock.id}>
																{dock.name}({dock.id})
															</MenuItem>
														))}
													</TextField>
													<Box display={'flex'} flexDirection={'row'}>
														<TextField
															sx={{ width: '60%' }}
															margin='normal'
															variant='outlined'
															label='Time from start point (min)'
															name={time}
															value={p.time}
															type='number'
															required
															onChange={handleChange}
															onBlur={handleBlur}
														/>
														<Button
															sx={{ color: 'red' }}
															onClick={() => remove(index)}
														>
															Remove
															<br /> stop {index + 1}
														</Button>
													</Box>
												</Box>
											)
										})}
									<Button
										fullWidth
										type='button'
										onClick={() => push({ dock: '', time: '' })}
									>
										Add Stop Point
									</Button>
								</div>
							)}
						</FieldArray>
						<TextField
							// sx={{ width: '70%' }}
							fullWidth
							select
							margin='normal'
							variant='outlined'
							required
							name='end.dock'
							value={values.end.dock}
							onChange={handleChange}
							onBlur={handleBlur}
							label='End point'
						>
							{docks.map((dock) => (
								<MenuItem key={dock.id} value={dock.id}>
									{dock.name}({dock.id})
								</MenuItem>
							))}
						</TextField>
						<Divider style={{ marginTop: 20, marginBottom: 20 }} />
						<Button
							type='submit'

							// disabled={!isValid || values.people.length === 0}
						>
							<Typography color='green' fontWeight='bold'>
								save route
							</Typography>
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
