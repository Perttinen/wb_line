import { useSelector } from 'react-redux'
import { User } from '../../../types'
import { useNavigate } from 'react-router-dom'
// import { WebSocketContext } from '../WebSocket'
// import { useContext } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	CssBaseline,
	Typography,
} from '@mui/material'

export const UserList = ({ delbutton }: { delbutton: boolean }) => {
	const users = useSelector((state: { users: User[] }) => state.users)

	// const ws = useContext(WebSocketContext)

	const navigate = useNavigate()
	const handleViewUser = (id: string) => {
		console.log(`/userdata/${id}`)

		navigate(`/userdata/${id}`)
		console.log(id)
	}

	return (
		<div>
			{!users ? (
				'Loading...'
			) : (
				<div>
					<CssBaseline />
					<Typography>Users:</Typography>
					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								{/* <ul> */}
								{users.map((u) => (
									<TableRow key={u.id}>
										<TableCell>{u.name}</TableCell>

										{delbutton === true ? (
											<TableCell>
												<button onClick={() => handleViewUser(u.id)}>
													{/* <button onClick={() => ws?.sendRemoveUser(u.id)}> */}
													Show
												</button>
											</TableCell>
										) : null}
									</TableRow>
								))}
								{/* </ul> */}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
			{/* </h4> */}
		</div>
	)
}
