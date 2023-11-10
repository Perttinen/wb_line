import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableContainer from '@mui/material/TableContainer'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { UserLine } from '.'
import { User } from '../../../types'
import { useSelector } from 'react-redux'

export const UserList = () => {
	const users = useSelector((state: { users: User[] }) => state.users)

	return (
		<div>
			<Typography variant='h5'>Users:</Typography>
			<TableContainer component={Paper}>
				<Table aria-label='collapsible table'>
					<TableBody>
						{users.map((user) => (
							<UserLine key={user.id} user={user} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
