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
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export const Login = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const navigate = useNavigate()

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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const values: LoginUser = {
			username: data.get('username') as string,
			password: data.get('password') as string,
		}
		console.log(values)

		try {
			const loggedUser = await loginService.login(values)
			loggedUser.username && dispatch(setLoggedUser(loggedUser.username))
			navigate('/')
		} catch (e) {
			if (axios.isAxiosError(e) && e.response) {
				alert(e.response.data.error)
			} else {
				console.log(e)
			}
		}
	}
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
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='username'
						name='username'
						autoComplete='text'
						autoFocus
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
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</div>
	)
}
