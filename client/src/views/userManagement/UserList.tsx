import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

import { UserLine } from './UserLine'
import { UserType } from '../../../../types'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

export const UserList = () => {
	const users = useSelector((state: { users: UserType[] }) => state.users)


	return (
		<Box paddingX={'2px'}>
			<TableContainer component={Paper} >
				<Table aria-label='collapsible table' >
					<TableBody>
						{users.map((user) => (
							<UserLine key={user.id} user={user} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
