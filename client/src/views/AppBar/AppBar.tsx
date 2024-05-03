import { useSelector } from 'react-redux'
import { useState } from 'react'
import {
	Container,
	AppBar as MuiAppBar,
	Toolbar,
} from '@mui/material'
import { UserCard } from 'views/components'
import { useInitializers } from 'hooks'
import { UserWithTokenType } from 'types'
import { UserMenu } from './UserMenu'
import { NavMenuXs } from './NavMenuXs'
import { NavBarMd } from './NavBarMd'
import { CompanyNameMd, CompanyNameXs } from './CompanyName'

export const AppBar = (
) => {
	useInitializers()
	const [userCard, setUserCard] = useState(false)
	const loggedUser = useSelector(
		(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	)

	return (
		loggedUser.userLevel ?
			<div>
				<MuiAppBar position='static'>
					<Container maxWidth='xl'>
						<Toolbar disableGutters>
							<CompanyNameMd />
							<NavMenuXs loggedUser={loggedUser} />
							<CompanyNameXs />
							<NavBarMd loggedUser={loggedUser} />
							<UserMenu setUserCard={setUserCard} loggedUser={loggedUser} />
						</Toolbar>
					</Container>
				</MuiAppBar>
				<UserCard userCard={userCard} setUserCard={setUserCard} />
			</div>
			: <>loading..</>
	)
}
