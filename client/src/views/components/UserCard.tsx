import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { ChangePassword, UserDataTable } from '.'
import { useSelector } from 'react-redux'
import { UserType } from '../../../../types'
import { Box } from '@mui/material'
import { useState } from 'react'

export const UserCard = ({
	userCard,
	setUserCard,
}: {
	userCard: boolean
	setUserCard: (val: boolean) => void
}) => {
	const user = useSelector(
		(state: { loggedUser: UserType }) => state.loggedUser
	)
	const [pwChangeDialog, setPwChangeDialog] = useState(false)

	return (
		<div>
			{userCard && (
				<Card sx={{ minWidth: 275, marginBottom: '20px' }}>
					<CardContent>
						<UserDataTable user={user} />
					</CardContent>
					<Box display={'flex'} flexDirection={'row'}>
						<CardActions>
							<Button onClick={() => setUserCard(false)} size='small'>
								close
							</Button>
						</CardActions>
						<CardActions>
							<Button onClick={() => setPwChangeDialog(true)} size='small'>
								change password
							</Button>
						</CardActions>
					</Box>
					{pwChangeDialog && (
						<ChangePassword
							user={user}
							pwChangeDialog={pwChangeDialog}
							setPwChangeDialog={setPwChangeDialog}
						/>
					)}
				</Card>
			)}
		</div>
	)
}
