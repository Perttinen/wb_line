import { useState } from 'react'
import Button from '@mui/material/Button'

import { Form, Formik } from 'formik'
import { Alert, Box, Modal, Snackbar } from '@mui/material'
import * as Yup from 'yup'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

import { changeCurrentPassword } from 'reducers/userReducer'
import { userService } from 'services'
import { ChangePasswordType, ConfirmedPasswordsType, UserType } from 'types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { FormTextField } from './SmallOnes'

export const ChangePassword = ({
	pwChangeDialog,
	setPwChangeDialog,
	user,
}: {
	pwChangeDialog: boolean
	setPwChangeDialog: (val: boolean) => void
	user: UserType
}) => {

	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const handleClose = () => {
		setPwChangeDialog(false)
	}

	const [errorMsg, setErrorMsg] = useState('')
	const [successMsg, setSuccessMsg] = useState('')

	const navigate = useNavigate()

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

	const location = useLocation()

	const handleSubmit = async (values: ConfirmedPasswordsType) => {
		console.log('submitting')

		const userToChange: ChangePasswordType = { ...values, userId: user.id }
		try {
			const user = await userService.update(userToChange)
			dispatch(changeCurrentPassword(user))
			setSuccessMsg('Password updated')
			location.pathname.startsWith('/login') && navigate('/home')
		} catch (e) {
			if (axios.isAxiosError(e)) {
				setErrorMsg(e.response?.data)
			} else {
				console.log(e);
			}
		}
	}

	const initialValues: ConfirmedPasswordsType = {
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	}
	return (
		<Modal open={pwChangeDialog} sx={{ position: 'absolute', left: '10%', top: '20%', width: '90%' }}>
			<Box sx={{ backgroundColor: 'white', width: '70%', border: 1, padding: '10px', borderRadius: '5px' }}>
				<Formik
					initialValues={initialValues}
					validationSchema={passwordSchema}
					onSubmit={async (values) => {
						console.log('formik submit');
						handleSubmit(values)
					}}
				>
					<Form tabIndex={-1}>
						<FormTextField name='currentPassword' label='current password' type='password' />
						<FormTextField name='newPassword' label='new password' type='password' />
						<FormTextField name='confirmPassword' label='new password again' type='password' />
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit'>Save</Button>
					</Form>
				</Formik>
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
			</Box>
		</Modal>
	)
}
