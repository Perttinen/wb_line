import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { LoginUser } from '../../../types'
import loginService from '../services/login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
	TextField,
	Button,
	Typography,
	Box,
	CssBaseline,
	Avatar,
	Alert,
	Snackbar,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState } from 'react'
import { useFormik } from 'formik'

export const Login = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const navigate = useNavigate()

	const [errorMsg, setErrorMsg] = useState('')

	function Copyright(props: any) {
		return (
			<Typography
				variant='body2'
				color='text.secondary'
				align='center'
				{...props}
			>
				{'Copyright © '}
				Ilumas Alatiiv
				{'  '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		)
	}

	const handleSubmit = async (values: LoginUser) => {
		try {
			const loggedUser = await loginService.login(values)
			dispatch(setLoggedUser(loggedUser))
			window.localStorage.setItem('loggedWbUser', JSON.stringify(loggedUser))
			navigate('/')
		} catch (e) {
			formik.resetForm()
			if (axios.isAxiosError(e) && e.response) {
				setErrorMsg(e.response.data.error)
			} else {
				console.log(e)
			}
		}
	}

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		// validationSchema: userSchema, // Our Yup schema
		onSubmit: handleSubmit,
		enableReinitialize: true,
	})

	return (
		<div>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
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
						id='username'
						label='username'
						name='username'
						autoComplete='text'
						value={formik.values.username}
						onChange={formik.handleChange}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						value={formik.values.password}
						onChange={formik.handleChange}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						log in
					</Button>
				</Box>
				<Snackbar
					open={errorMsg !== ''}
					autoHideDuration={4000}
					onClose={() => setErrorMsg('')}
				>
					<Alert severity='error'>{errorMsg}</Alert>
				</Snackbar>
			</Box>

			<Copyright sx={{ mt: 8, mb: 4 }} />
		</div>
	)
}
