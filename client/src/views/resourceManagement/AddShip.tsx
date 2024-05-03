import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { ShipNoIdType } from '../../../../types'
import { useContext } from 'react'
import { WebSocketContext } from '../../WebSocket'
import HighlightOff from '@mui/icons-material/HighlightOff'
import SaveAltIcon from '@mui/icons-material/SaveAlt'

import * as Yup from 'yup'

export const AddShip = ({
	setShowAddShip,
}: {
	setShowAddShip: (val: boolean) => void
}) => {
	const ws = useContext(WebSocketContext)

	const handleSubmit = async (values: ShipNoIdType) => {
		setShowAddShip(false)
		ws?.sendAddShip(values)
		formik.resetForm()
	}

	const shipSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Name must be 2-32 charecters!')
			.max(32, 'Name must be 2-32 charecters!')
			.required('Name is required!'),
	})

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: shipSchema,
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
					sx={{ mt: 3, mb: 2, color: '#1E8449', fontSize: '2rem' }}
				>
					<SaveAltIcon fontSize='inherit' />
				</Button>
				<Button
					onClick={() => {
						setShowAddShip(false)
						formik.resetForm()
					}}
					type='button'
					fullWidth
					sx={{ mt: 3, mb: 2, color: '#B03A2E', fontSize: '2rem' }}
				>
					<HighlightOff fontSize='inherit' />
				</Button>
			</Box>
		</Box>
	)
}
