import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AppDispatch } from '../store'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { LoginUser } from '../../../types'
import loginService from '../services/login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const navigate = useNavigate()

	const login = async (values: LoginUser) => {
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
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					await login(values)
					resetForm()
					setSubmitting(false)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='username' placeholder='username' />
						<br />
						<ErrorMessage name='username' component='div' />
						<Field type='password' name='password' placeholder='password' />
						<br />
						<ErrorMessage name='username' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Login
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
