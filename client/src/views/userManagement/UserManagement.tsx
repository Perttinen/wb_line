import { UserList } from './UserList'
import { useState } from 'react'
import { Button, Box, CssBaseline } from '@mui/material'

import { AddUser } from './AddUser'

export const UserManagement = () => {
	const [showAddUser, setShowAddUser] = useState(false)

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
						sx={{ mt: 3, mb: 2, fontSize: '1.2rem' }}
					>
						Create new user
					</Button>
				)}
				{showAddUser && <AddUser setShowAddUser={setShowAddUser} />}
			</Box>
			<UserList />
		</div>
	)
}
