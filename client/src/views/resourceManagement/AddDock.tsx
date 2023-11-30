import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { DockNoIdType } from '../../../../types'
import { useContext } from 'react'
import { WebSocketContext } from '../../WebSocket'

import * as Yup from 'yup'

export const AddDock = ({
	setShowAddDock,
}: {
	setShowAddDock: (val: boolean) => void
}) => {
	const ws = useContext(WebSocketContext)

	const handleSubmit = async (values: DockNoIdType) => {
		setShowAddDock(false)
		ws?.sendAddDock(values)
		formik.resetForm()
	}

	const dockSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Name must be 2-32 charecters!')
			.max(32, 'Name must be 2-32 charecters!')
			.required('Name is required!'),
	})

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: dockSchema,
		onSubmit: handleSubmit,
		enableReinitialize: true,
	})

	return (
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
			<Box display={'flex'} flexDirection={'row'}>
				<Button
					type='submit'
					fullWidth
					sx={{ mt: 3, mb: 2, color: '#1E8449', fontSize: '1.2rem' }}
				>
					Add Dock
				</Button>
				<Button
					onClick={() => {
						setShowAddDock(false)
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
	)
}
