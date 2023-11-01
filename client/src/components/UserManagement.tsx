import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'

import { createUser } from '../reducers/userReducer'
import { UserList } from './UserList'
import { UserNoId, User } from '../../../types'
import { AppDispatch } from '../store'

export const UserManagement = () => {
	const dispatch: (...args: unknown[]) => Promise<User> =
		useDispatch<AppDispatch>()

	const createNewUser = async (values: UserNoId) => {
		dispatch(createUser(values))
	}

	return (
		<div>
			<h3>Add user</h3>
			<Formik
				initialValues={{ username: '', name: '', password: '' }}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						createNewUser(values)
						resetForm()
						setSubmitting(false)
					}, 400)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='name' placeholder='name' />
						<br />
						<ErrorMessage name='name' component='div' />
						<Field type='text' name='username' placeholder='username' />
						<br />
						<ErrorMessage name='username' component='div' />
						<Field type='password' name='password' placeholder='password' />
						<br />
						<ErrorMessage name='username' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
			<UserList delbutton={true} />
		</div>
	)
}
