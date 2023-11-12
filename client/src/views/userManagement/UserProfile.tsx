import { Box, Button, Collapse, TableCell, TableRow } from '@mui/material'

import { UserType } from '../../../../types'
import { useContext } from 'react'
import { WebSocketContext } from '../../WebSocket'
import { UserDataTable } from '../../components'

export const UserProfile = ({
	open,
	user,
}: {
	open: boolean
	user: UserType
}) => {
	const ws = useContext(WebSocketContext)

	const handleDeleteUser = (id: number) => {
		ws?.sendRemoveUser(id)
	}

	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open} timeout='auto' unmountOnExit>
					<UserDataTable user={user} />
					<Box sx={{ margin: 1 }}>
						<Button
							fullWidth
							sx={{ color: '#B03A2E', fontSize: '1.2rem' }}
							onClick={() => handleDeleteUser(user.id)}
						>
							delete user
						</Button>
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	)
}
