import {

	Button,
	TextField,
	MenuItem,
	Box,

} from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { DockType, RouteType } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import routeService from '../../services/route'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { appendRoute } from '../../reducers/routeReducer'
import { AppDispatch } from '../../store'

export const RoutePlanner = ({
	setShowRoutePlanner,
}: {
	setShowRoutePlanner: (val: boolean) => void
}) => {
	const docks = useSelector((state: { docks: DockType[] }) => state.docks)

	const routeDispatch: (...args: unknown[]) => Promise<RouteType> | number =
		useDispatch<AppDispatch>()

	const validationSchema = Yup.object().shape({
		start: Yup.object().shape({
			dock: Yup.string(),
		}),
		middle: Yup.array().of(
			Yup.object().shape({
				dock: Yup.number(),
				time: Yup.string(),
			})
		),
		end: Yup.object().shape({
			dock: Yup.string(),
		}),
	})

	interface FormValues {
		start: {
			dock: number | ''
		}
		middle: {
			dock: number | ''
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
				startDockId: values.start.dock,
				endDockId: values.end.dock,
				stops: values.middle,
			})
			routeDispatch(appendRoute(newRoute))
		}
		setShowRoutePlanner(false)
	}

	return (
		<div>
			<Formik<FormValues>
				initialValues={{
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
				{({ values, handleChange, handleBlur }) => (
					<Form noValidate autoComplete='off'>

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
															fullWidth
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
															fullWidth
															// sx={{ color: 'red' }}
															onClick={() => remove(index)}
														>
															<DeleteOutlinedIcon />
														</Button>
													</Box>
												</Box>
											)
										})}
									<Button
										fullWidth
										sx={{ fontSize: '1.2rem' }}
										type='button'
										onClick={() => push({ dock: '', time: '' })}
									>
										<AddCircleOutlineIcon />
									</Button>
								</div>
							)}
						</FieldArray>
						<TextField
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
						{/* <Divider style={{ marginTop: 20, marginBottom: 20 }} /> */}
						<Box display={'flex'} flexDirection={'row'}>
							<Button
								type='submit'
								fullWidth
								sx={{ mt: 3, mb: 2, color: '#1E8449', fontSize: '1.2rem' }}
							>
								save
							</Button>
							<Button
								type='reset'
								onClick={() => setShowRoutePlanner(false)}
								fullWidth
								sx={{ mt: 3, mb: 2, color: '#B03A2E', fontSize: '1.2rem' }}
							>
								cancel
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</div>
	)
}
