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
	Avatar,
	Alert,
	Snackbar,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState } from 'react'
import { Form, Formik } from 'formik'
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
			} else {
				const loggedUser = response
				if (loggedUser.firstTime === true) {
					setUser(loggedUser)
					setFirstTime(true)
				} else {
					dispatch(setLoggedUser(loggedUser))
					navigate('/home')
				}
			}
		} catch (e) {
			console.log(e);
		}

	}

	const initialValues = {
		username: '',
		password: '',
	}

	return (
		<div>
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

				<Formik
					initialValues={initialValues}
					onSubmit={async (values) => {
						handleSubmit(values)
					}}
					enableReinitialize={true}>
					{props => (
						<Form>
							<Box
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
									value={props.values.username}
									onChange={props.handleChange}
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
									value={props.values.password}
									onChange={props.handleChange}
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
						</Form>
					)}

				</Formik>


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
