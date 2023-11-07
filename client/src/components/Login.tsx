import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AppDispatch } from '../store'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { User, LoginUser } from '../../../types'

export const Login = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()
	const users = useSelector((state: { users: User[] }) => state.users)

	const loginUser = (values: LoginUser) => {
		console.log(users)
		console.log(values)
		users.find(
			(u) => u.username === values.username && u.password === values.password
		) && dispatch(setLoggedUser(values.username))
	}

	return (
		<div>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						loginUser(values)
						resetForm()
						setSubmitting(false)
					}, 400)
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
