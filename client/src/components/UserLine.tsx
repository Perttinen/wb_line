import {
	Box,
	Button,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'
import { User } from '../../../types'
import { useState, Fragment, useContext } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { WebSocketContext } from '../WebSocket'

export const UserLine = (props: { user: User }) => {
	const { user } = props
	const ws = useContext(WebSocketContext)
	const [open, setOpen] = useState(false)

	const handleDeleteUser = (id: string) => {
		console.log(id)

		ws?.sendRemoveUser(id)
	}

	return (
		<Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					<Typography variant='h6'>{user.name}</Typography>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
								{user.name}
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableBody>
									{Object.keys(user).map(
										(userkey) =>
											userkey !== 'password' &&
											userkey !== 'id' && (
												<TableRow key={userkey}>
													<TableCell>{userkey}</TableCell>
													<TableCell>
														{user[userkey as keyof typeof user]}
													</TableCell>
												</TableRow>
											)
									)}
									<TableRow>
										<TableCell>
											<Button
												sx={{ color: '#B03A2E' }}
												onClick={() => handleDeleteUser(user.id)}
											>
												delete user
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	)
}
