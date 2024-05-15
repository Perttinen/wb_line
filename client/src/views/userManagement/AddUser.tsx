import { Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

import { UserLevelType, UserNoIdType } from 'types'
import { WebSocketContext } from 'WebSocket'
import { FormGroupContainer, FormMainContainer, FormSelect, FormTextField, SaveAndCancelButtons } from 'views/components/SmallOnes'

export const AddUser = ({
	setShowAddUser,
}: {
	setShowAddUser: (val: boolean) => void
}) => {
	const ws = useContext(WebSocketContext)
	const levels = useSelector(
		(state: { userlevels: UserLevelType[] }) => state.userlevels
	)

	const handleSubmit = async (values: UserNoIdType) => {
		setShowAddUser(false)
		ws?.sendAddUser(values)
	}

	const userSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Name must be 2-32 charecters!')
			.max(32, 'Name must be 2-32 charecters!')
			.required('Name is required!'),
		username: Yup.string()
			.min(2, 'Username must be 2-16 charecters!')
			.max(16, 'Username must be 2-16 charecters!')
			.required('Username is required!'),
		password: Yup.string()
			.min(6, 'Password must be 6-12 charecters!')
			.max(12, 'Password must be 6-12 charecters!')
			.required('Password is required!'),
	})

	const initialValues = {
		name: '',
		username: '',
		password: '',
		user_level_id: 2,
		firstTime: true,
	}

	return (
		<FormMainContainer>
			<Formik
				initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={(values) => {
					handleSubmit(values)
				}
				}
				enableReinitialize={true}
			>
				{({ resetForm }) => (
					<Form>
						<FormGroupContainer>
							<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
								<FormTextField name='name' label='name' />
								<FormTextField name='username' label='username' />
								<FormTextField name='password' label='initial password' />
								<FormSelect options={levels} selectKey='levelName' selectValue='id' name='user_level_id' label='user level' />
								<SaveAndCancelButtons submitLabel='create' onCancel={() => {
									setShowAddUser(false)
									resetForm()
								}} />
							</Box>
						</FormGroupContainer>
					</Form>
				)}
			</Formik>
		</FormMainContainer>
	)
}
