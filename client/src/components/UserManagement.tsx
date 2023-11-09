import { UserList } from './UserList'
import { UserNoId } from '../../../types'
import { WebSocketContext } from '../WebSocket'
import { useContext, useState } from 'react'
import { TextField, Button, Box, CssBaseline } from '@mui/material'

export const UserManagement = () => {
	const ws = useContext(WebSocketContext)
	const [showAddUser, setShowAddUser] = useState(false)
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const values: UserNoId = {
			name: data.get('name') as string,
			username: data.get('username') as string,
			password: data.get('password') as string,
		}
		setShowAddUser(false)

		ws?.sendAddUser(values)
	}

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
						onSubmit={handleSubmit}
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
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='username'
							label='username'
							name='username'
							autoComplete='text'
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Initial Password'
							id='password'
							autoComplete='text'
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
			<UserList delbutton={true} />
		</div>
	)
}
