import { Fragment } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useFormik } from 'formik'
import { ChangePasswordType, UserType } from '../../../../types'
import { Box } from '@mui/material'
import userService from '../../services/users'

export const ChangePassword = ({
	pwChangeDialog,
	setPwChangeDialog,
	user,
}: {
	pwChangeDialog: boolean
	setPwChangeDialog: (val: boolean) => void
	user: UserType
}) => {
	const handleClose = () => {
		setPwChangeDialog(false)
	}

	const handleSubmit = async (values: ChangePasswordType) => {
		console.log(values)
		console.log(await userService.update(user.id, values))
		handleClose()
	}

	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		// validationSchema: userSchema, // Our Yup schema
		onSubmit: handleSubmit,
		enableReinitialize: true,
	})

	return (
		<Fragment>
			<Dialog open={pwChangeDialog} onClose={handleClose}>
				<Box component='form' onSubmit={formik.handleSubmit}>
					<DialogTitle>Change Password</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin='dense'
							id='currentPassword'
							label='Current Password'
							type='text'
							fullWidth
							variant='standard'
							value={formik.values.currentPassword}
							onChange={formik.handleChange}
						/>
						<TextField
							margin='dense'
							id='newPassword'
							label='New Password'
							type='text'
							fullWidth
							variant='standard'
							value={formik.values.newPassword}
							onChange={formik.handleChange}
						/>
						<TextField
							margin='dense'
							id='confirmPassword'
							label='Confirm New Password'
							type='text'
							fullWidth
							variant='standard'
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit'>Save</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</Fragment>
	)
}
