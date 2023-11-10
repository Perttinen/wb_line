import { UserList } from './UserList'
import { UserNoId } from '../../../types'
import { WebSocketContext } from '../WebSocket'
import { useContext, useState } from 'react'
import { TextField, Button, Box, CssBaseline } from '@mui/material'
import { useFormik } from 'formik'

export const UserManagement = () => {
	const ws = useContext(WebSocketContext)
	const [showAddUser, setShowAddUser] = useState(false)

	const handleSubmit = async (values: UserNoId) => {
		setShowAddUser(false)
		ws?.sendAddUser(values)
	}

	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			password: '',
		},
		// validationSchema: userSchema, // Our Yup schema
		onSubmit: handleSubmit,
		enableReinitialize: true,
	})

	return (
		<div>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{!showAddUser && (
					<Button
						onClick={() => setShowAddUser(true)}
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Create new user
					</Button>
				)}
				{showAddUser && (
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
							name='name'
							label='name'
							id='name'
							autoComplete='text'
							value={formik.values.name}
							onChange={formik.handleChange}
						/>
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
							label='Initial Password'
							id='password'
							autoComplete='text'
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						<Box display={'flex'} flexDirection={'row'}>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2, backgroundColor: '#1E8449' }}
							>
								Add User
							</Button>
							<Button
								onClick={() => setShowAddUser(false)}
								type='button'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2, backgroundColor: '#B03A2E' }}
							>
								Cancel
							</Button>
						</Box>
					</Box>
				)}
			</Box>
			<UserList />
		</div>
	)
}
