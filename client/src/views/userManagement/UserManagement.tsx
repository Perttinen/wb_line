import { UserList } from './UserList'
import { useState } from 'react'
import { Button, Box, CssBaseline } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'


import { AddUser } from './AddUser'
import { useSelector } from 'react-redux'
import { UserWithTokenType } from '../../../../types'

export const UserManagement = () => {
	const [showAddUser, setShowAddUser] = useState(false)

	const loggedUser = useSelector(
		(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	)

	return (
		loggedUser.userLevel ?
			(
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

								sx={{ fontSize: '2rem', marginTop: '2rem' }}
								type='button'
								onClick={() => setShowAddUser(true)}
							>
								<AddCircleOutlineIcon fontSize='inherit' />
							</Button>
						)}
						{showAddUser && <AddUser setShowAddUser={setShowAddUser} />}
					</Box>
					<UserList />
				</div>
			) : null
	)
}
