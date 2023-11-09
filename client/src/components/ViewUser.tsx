import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { User } from '../../../types'
import {
	Alert,
	Button,
	CssBaseline,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'
import { WebSocketContext } from '../WebSocket'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const ViewUser = () => {
	const ws = useContext(WebSocketContext)
	const navigate = useNavigate()
	const id: string = useParams().id as string
	const users = useSelector((state: { users: User[] }) => state.users)
	const user = users.find((u) => u.id.toString() === id)

	const handleDeleteUser = (id: string) => {
		ws?.sendRemoveUser(id)
		navigate('/usermanagement')
	}

	return user ? (
		<div>
			<CssBaseline />
			<Typography>User details:</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{Object.keys(user).map(
							(userkey) =>
								userkey !== 'password' &&
								userkey !== 'id' && (
									<TableRow key={userkey}>
										<TableCell>{userkey}</TableCell>
										<TableCell>{user[userkey as keyof typeof user]}</TableCell>
									</TableRow>
								)
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Button onClick={() => handleDeleteUser(user.id)}>Delete user</Button>
		</div>
	) : (
		<Alert severity='error'>something went wrong</Alert>
	)
}
