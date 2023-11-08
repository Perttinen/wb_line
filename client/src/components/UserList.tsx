import { useSelector } from 'react-redux'
import { User } from '../../../types'
import { WebSocketContext } from '../WebSocket'
import { useContext } from 'react'
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

	const ws = useContext(WebSocketContext)

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
										<TableCell>{u.id}</TableCell>
										{delbutton === true ? (
											<TableCell>
												<button onClick={() => ws?.sendRemoveUser(u.id)}>
													delete
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
