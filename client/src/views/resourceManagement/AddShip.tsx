import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { shipNoIdType } from '../../../../types'
// import { useContext } from 'react'
// import { WebSocketContext } from '../../WebSocket'

import * as Yup from 'yup'

export const AddShip = ({
	setShowAddShip,
}: {
	setShowAddShip: (val: boolean) => void
}) => {
	// const ws = useContext(WebSocketContext)

	const handleSubmit = async (values: shipNoIdType) => {
		console.log(values)
		setShowAddShip(false)
		// ws?.sendAddUser(values)
		formik.resetForm()
	}

	const userSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Name must be 2-32 charecters!')
			.max(32, 'Name must be 2-32 charecters!')
			.required('Name is required!'),
	})

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: userSchema,
		onSubmit: handleSubmit,
		enableReinitialize: true,
	})

	return (
		<>
			<Box
				component='form'
				onSubmit={formik.handleSubmit}
				noValidate
				sx={{ mt: 1 }}
			>
				<TextField
					margin='normal'
					required
					fullWidth
					name='name'
					label='name'
					id='name'
					autoComplete='text'
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>
				{/* <TextField
					margin='normal'
					required
					fullWidth
					id='username'
					label='username'
					name='username'
					autoComplete='text'
					value={formik.values.username}
					onChange={formik.handleChange}
					error={formik.touched.username && Boolean(formik.errors.username)}
					helperText={formik.touched.username && formik.errors.username}
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					name='password'
					label='Initial Password'
					id='password'
					autoComplete='text'
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<TextField
					select
					margin='normal'
					required
					fullWidth
					name='user_level_id'
					value={formik.values.user_level_id}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					label='user level'
				>
					{levels.map((level) => (
						<MenuItem key={level.id} value={level.id}>
							{level.levelName}
						</MenuItem>
					))}
				</TextField> */}
				<Box display={'flex'} flexDirection={'row'}>
					<Button
						type='submit'
						fullWidth
						sx={{ mt: 3, mb: 2, color: '#1E8449', fontSize: '1.2rem' }}
					>
						Add Ship
					</Button>
					<Button
						onClick={() => {
							setShowAddShip(false)
							formik.resetForm()
						}}
						type='button'
						fullWidth
						sx={{ mt: 3, mb: 2, color: '#B03A2E', fontSize: '1.2rem' }}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</>
	)
}
