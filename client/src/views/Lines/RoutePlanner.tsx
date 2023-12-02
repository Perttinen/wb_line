import {
	Divider,
	Button,
	TextField,
	MenuItem,
	Box,
	Typography,
} from '@mui/material'
import { FieldArray, Form, Formik, getIn } from 'formik'
import * as Yup from 'yup'
import { DockType } from '../../../../types'
import { useSelector } from 'react-redux'

export const RoutePlanner = () => {
	const docks = useSelector((state: { docks: DockType[] }) => state.docks)

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
		start: {
			dock: string
		}
		middle: {
			dock: string
			time: number
		}[]
		end: {
			dock: string
		}
	}

	const handleSubmit = (values: FormValues) => {
		let arr = [[values.start.dock, 0]]
		for (const i of values.middle) {
			arr.push([i.dock, i.time])
		}
		arr.push([values.end.dock, 0])
		console.log(arr)

		console.log(values)
	}

	return (
		<div>
			<Formik<FormValues>
				initialValues={{
					start: {
						dock: '',
					},
					middle: [
						// {
						// 	dock: '',
						// 	time: '',
						// },
					],
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
