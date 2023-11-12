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
import { UserType } from '../../../types'
import { useState, Fragment, useContext } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { WebSocketContext } from '../WebSocket'

export const UserLine = (props: { user: UserType }) => {
	const { user } = props
	const ws = useContext(WebSocketContext)
	const [open, setOpen] = useState(false)

	const handleDeleteUser = (id: number) => {
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
									<TableRow>
										<TableCell>
											<Typography>name</Typography>
										</TableCell>
										<TableCell>{user.name}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography>username</Typography>
										</TableCell>
										<TableCell>{user.username}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography>user level</Typography>
										</TableCell>
										<TableCell>{user.userLevel.levelName}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell colSpan={2}>
											<Button
												fullWidth
												sx={{ color: '#B03A2E', fontSize: '1.2rem' }}
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
