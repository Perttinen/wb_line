import { useSelector } from 'react-redux'
import { UserWithTokenType } from '../../../../types'
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useState } from 'react'
import { Ships } from './Ships'
import { Docks } from './Docks'

export const ResourceManagement = () => {
	const [shipsOpen, setShipsOpen] = useState(false)
	const [docksOpen, setDocksOpen] = useState(false)

	const loggedUser = useSelector(
		(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	)

	return loggedUser.userLevel.levelNumber > 20 ? (
		<TableContainer component={Paper}>
			<Table aria-label='collapsible table'>
				<TableBody>
					<TableRow>
						<TableCell>
							<IconButton
								aria-label='expand row'
								size='small'
								onClick={() => setShipsOpen(!shipsOpen)}
							>
								{shipsOpen ? (
									<KeyboardArrowUpIcon />
								) : (
									<KeyboardArrowDownIcon />
								)}
							</IconButton>
						</TableCell>
						<TableCell>
							<Typography variant='h6'>Ships</Typography>
						</TableCell>
					</TableRow>
					<Ships open={shipsOpen} />

					<TableRow>
						<TableCell>
							<IconButton
								aria-label='expand row'
								size='small'
								onClick={() => setDocksOpen(!docksOpen)}
							>
								{docksOpen ? (
									<KeyboardArrowUpIcon />
								) : (
									<KeyboardArrowDownIcon />
								)}
							</IconButton>
						</TableCell>
						<TableCell>
							<Typography variant='h6'>Docks</Typography>
						</TableCell>
					</TableRow>
					<Docks open={docksOpen} />
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<h2>You shouldn't be here...!</h2>
	)
}
