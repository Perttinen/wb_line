import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'
import { UserType } from '../../../types'

export const UserDataTable = ({ user }: { user: UserType }) => {
	return (
		<Box sx={{ margin: 1 }}>
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
				</TableBody>
			</Table>
		</Box>
	)
}
