import { useDispatch } from 'react-redux'
// import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
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
	ThemeProvider,
	Container,
	CssBaseline,
	createTheme,
	Avatar,
	FormControlLabel,
	Checkbox,
	Grid,
	Link,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export const Login = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const navigate = useNavigate()

	const defaultTheme = createTheme()

	function Copyright(props: any) {
		return (
			<Typography
				variant='body2'
				color='text.secondary'
				align='center'
				{...props}
			>
				{'Copyright © '}
				<Link color='inherit' href='https://mui.com/'>
					Samuli Viitala
				</Link>{' '}
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
			<ThemeProvider theme={defaultTheme}>
				<Container component='main' maxWidth='xs'>
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
							onSubmit={handleSubmit}
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
							{/* <FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Remember me'
							/> */}
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>
							{/* <Grid container>
								<Grid item xs>
									<Link href='#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href='#' variant='body2'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid> */}
						</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Container>
			</ThemeProvider>
		</div>
	)

	// OLD CODE WITH FORMIK!!
	// const handleSubmit = (values: LoginUser) => {
	// 	console.log(values)

	// try {
	// 	const loggedUser = await loginService.login(values)
	// 	loggedUser.username && dispatch(setLoggedUser(loggedUser.username))
	// 	navigate('/')
	// } catch (e) {
	// 	if (axios.isAxiosError(e) && e.response) {
	// 		alert(e.response.data.error)
	// 	} else {
	// 		console.log(e)
	// 	}
	// }

	// return (
	// 	<div>
	// 		<Formik
	// 			initialValues={{ username: '', password: '' }}
	// 			onSubmit={(values, { setSubmitting, resetForm }) => {
	// 				login(values)
	// 				resetForm()
	// 				setSubmitting(false)
	// 			}}
	// 		>
	// 			{({ isSubmitting }) => (
	// 				<Form>
	// 					<TextField type='text' name='username' placeholder='username' />
	// 					<ErrorMessage name='username' component='div' />
	// 					<br />

	// 					<Field type='password' name='password' placeholder='password' />
	// 					<ErrorMessage name='username' component='div' />
	// 					<br />

	// 					<Button type='submit' disabled={isSubmitting}>
	// 						Login
	// 					</Button>
	// 				</Form>
	// 			)}
	// 		</Formik>
	// 	</div>
	// )
}
