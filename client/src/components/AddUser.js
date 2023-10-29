import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import userService from '../services/users'

export const AddUser = () => {
	const createUser = async (values) => {
		const newUser = {
			name: values.name,
			username: values.username,
		}
		const user = await userService.create(newUser)
		console.log(user)
	}

	return (
		<div>
			<h3>Add user</h3>
			<Formik
				initialValues={{ username: '', name: '' }}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						createUser(values)
						// alert(JSON.stringify(values, null, 2))
						setSubmitting(false)
					}, 400)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='name' placeholder='name' />
						<ErrorMessage name='name' component='div' />
						<Field type='text' name='username' placeholder='username' />
						<ErrorMessage name='username' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
