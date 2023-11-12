import { IconButton, TableCell, TableRow, Typography } from '@mui/material'
import { UserType } from '../../../../types'
import { useState, Fragment } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { UserProfile } from './UserProfile'

export const UserLine = (props: { user: UserType }) => {
	const { user } = props
	const [open, setOpen] = useState(false)

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
			<UserProfile open={open} user={user} />
		</Fragment>
	)
}
