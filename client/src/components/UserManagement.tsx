import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserList } from './UserList'
import { UserNoId } from '../../../types'
import { WebSocketContext } from '../WebSocket'
import { useContext } from 'react'

export const UserManagement = () => {
	const ws = useContext(WebSocketContext)

	const createNewUser = async (values: UserNoId) => {
		ws?.sendAddUser(values)
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
