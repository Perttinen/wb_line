import { Fragment, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useFormik } from 'formik'
import { ChangePasswordType, UserType } from '../../../../types'
import { Alert, Box, Snackbar } from '@mui/material'
import userService from '../../services/users'
import * as Yup from 'yup'
import axios from 'axios'

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

	const [errorMsg, setErrorMsg] = useState('')
	const [successMsg, setSuccessMsg] = useState('')

	const passwordSchema = Yup.object().shape({
		currentPassword: Yup.string()
			.min(2, 'Password must be 6-12 charecters!')
			.max(12, 'Password must be 6-12 charecters!')
			.required('Password is required!'),
		newPassword: Yup.string()
			.min(6, 'Password must be 6-12 charecters!')
			.max(12, 'Password must be 6-12 charecters!')
			.required('New password is required!'),
		confirmPassword: Yup.string()
			.required('Confirmation required!')
			.oneOf([Yup.ref('newPassword')], 'Passwords must match'),
	})

	const handleSubmit = async (values: ChangePasswordType) => {
		try {
			await userService.update(user.id, values)
			setSuccessMsg('Password updated')
		} catch (e) {
			if (axios.isAxiosError(e) && e.response) {
				setErrorMsg(e.response.data.error)
				formik.resetForm()
			} else {
				console.log(e)
				formik.resetForm()
			}
		}
	}

	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		validationSchema: passwordSchema,
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
							type='password'
							fullWidth
							variant='standard'
							value={formik.values.currentPassword}
							onChange={formik.handleChange}
							error={
								formik.touched.currentPassword &&
								Boolean(formik.errors.currentPassword)
							}
							helperText={
								formik.touched.currentPassword && formik.errors.currentPassword
							}
						/>
						<TextField
							margin='dense'
							id='newPassword'
							label='New Password'
							type='password'
							fullWidth
							variant='standard'
							value={formik.values.newPassword}
							onChange={formik.handleChange}
							error={
								formik.touched.newPassword && Boolean(formik.errors.newPassword)
							}
							helperText={
								formik.touched.newPassword && formik.errors.newPassword
							}
						/>
						<TextField
							margin='dense'
							id='confirmPassword'
							label='Confirm New Password'
							type='password'
							fullWidth
							variant='standard'
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							error={
								formik.touched.confirmPassword &&
								Boolean(formik.errors.confirmPassword)
							}
							helperText={
								formik.touched.confirmPassword && formik.errors.confirmPassword
							}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit'>Save</Button>
					</DialogActions>
				</Box>
				<Snackbar
					open={errorMsg !== ''}
					autoHideDuration={4000}
					onClose={() => setErrorMsg('')}
				>
					<Alert severity='error'>{errorMsg}</Alert>
				</Snackbar>
				<Snackbar
					open={successMsg !== ''}
					autoHideDuration={4000}
					onClose={() => {
						setSuccessMsg('')
						handleClose()
					}}
				>
					<Alert severity='success'>{successMsg}</Alert>
				</Snackbar>
			</Dialog>
		</Fragment>
	)
}
