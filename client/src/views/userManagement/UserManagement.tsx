import { UserList } from './UserList'
import { useState } from 'react'
import { Button, Box, Container } from '@mui/material'

import { AddUser } from './AddUser'
import { TopButtons } from 'views/components/SmallOnes'
// import { useSelector } from 'react-redux'
// import { UserWithTokenType } from '../../../../types'

export const UserManagement = () => {
	const [showAddUser, setShowAddUser] = useState(false)

	// const loggedUser = useSelector(
	// 	(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	// )
	return (
		<Container>
			<Box display={'flex'} flexDirection={'column'}>
				{showAddUser
					? (
						<AddUser setShowAddUser={setShowAddUser} />
					)
					: (
						<TopButtons
							buttons={
								[
									{ onClick: () => setShowAddUser(!showAddUser), label: 'create user' }
								]} />
					)
				}
				<UserList />
			</Box>
		</Container>
	)
}
