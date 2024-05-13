import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { setLoggedUser } from '../../reducers/loggedUserReducer'
import { LoginUser, UserType } from '../../../../types'
import { loginService } from 'services'
import { AxiosError } from 'axios'
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
import { ChangePassword } from '../components'


export const Login = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const navigate = useNavigate()

	const [errorMsg, setErrorMsg] = useState('')
	const [firstTime, setFirstTime] = useState(false)
	const [user, setUser] = useState({} as UserType)



	const handleSubmit = async (values: LoginUser) => {
		try {
			const response = await loginService.login(values)
			if (response instanceof AxiosError) {
				setErrorMsg(response.response?.data)
				formik.resetForm()
				console.log('error in submit: ', response.response?.data);
			} else {
				const loggedUser = response
				if (loggedUser.firstTime === true) {
					setUser(loggedUser)
					setFirstTime(true)
					formik.resetForm()

				} else {
					console.log('notfirst');
					dispatch(setLoggedUser(loggedUser))
					navigate('/home')
				}
			}
		} catch (e) {
			console.log(e);
		}

	}

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
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
				{firstTime && (
					<ChangePassword
						user={user}
						pwChangeDialog={firstTime}
						setPwChangeDialog={setFirstTime}
					/>
				)}
				<Snackbar
					open={errorMsg !== ''}
					autoHideDuration={4000}
					onClose={() => setErrorMsg('')}
				>
					<Alert severity='error'>{errorMsg}</Alert>
				</Snackbar>
			</Box>

			<Typography
				variant='body2'
				color='text.secondary'
				align='center'
				sx={{ mt: 8, mb: 4 }}
			>
				{'Copyright © '}
				Samuli Viitala
				{'  '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</div>
	)
}
