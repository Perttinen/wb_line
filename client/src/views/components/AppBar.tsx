import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'
import { removeLoggedUser } from '../../reducers/loggedUserReducer'
import { useState } from 'react'
import {
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	AppBar as MuiAppBar,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { UserCard } from '..'
import { useInitializers } from '../../hooks'

import { UserWithTokenType } from '../../../../types'

export const AppBar = (
) => {
	useInitializers()

	const loggedUser = useSelector(
		(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	)




	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const [userCard, SetUserCard] = useState(false)

	const handleLogout = () => {
		window.localStorage.clear()
		dispatch(removeLoggedUser())
		navigate('/login')
	}

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const handleUserCard = () => {
		SetUserCard(true)
	}

	return (
		loggedUser.userLevel ?
			<div>
				<MuiAppBar position='static'>
					<Container maxWidth='xl'>
						<Toolbar disableGutters>
							<Typography
								variant='h6'
								noWrap
								component='a'
								href='#app-bar-with-responsive-menu'
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								WB-LINE
							</Typography>

							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleOpenNavMenu}
									color='inherit'
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id='menu-appbar'
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: 'block', md: 'none' },
									}}
								>
									<MenuItem
										onClick={() => {
											navigate('/')
											handleCloseNavMenu()
										}}
									>
										<Typography textAlign='center'>HOME</Typography>
									</MenuItem>
									{loggedUser.userLevel.levelName === 'admin' && (
										<MenuItem
											onClick={() => {
												navigate('/usermanagement')
												handleCloseNavMenu()
											}}
										>
											<Typography textAlign='center'>USERS</Typography>
										</MenuItem>
									)}

									<MenuItem
										onClick={() => {
											navigate('/resources')
											handleCloseNavMenu()
										}}
									>
										<Typography textAlign='center'>RESOURCES</Typography>
									</MenuItem>


									<MenuItem
										onClick={() => {
											navigate('/routes')
											handleCloseNavMenu()
										}}
									>
										<Typography textAlign='center'>ROUTES</Typography>
									</MenuItem>
									<MenuItem
										onClick={() => {
											navigate('/timetable')
											handleCloseNavMenu()
										}}
									>
										<Typography textAlign='center'>TIMETABLES</Typography>
									</MenuItem>
								</Menu>
							</Box>
							<Typography
								variant='h5'
								noWrap
								component='a'
								sx={{
									mr: 2,
									display: { xs: 'flex', md: 'none' },
									flexGrow: 1,
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								WB-LINE
							</Typography>
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
								<Button
									onClick={() => navigate('/')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									home
								</Button>
								{loggedUser.userLevel.levelName === 'admin' && (
									<Button
										onClick={() => navigate('/usermanagement')}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										users
									</Button>
								)}

								<Button
									onClick={() => navigate('/resources')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									resources
								</Button>


								<Button
									onClick={() => navigate('/routes')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									routes
								</Button>

								<Button
									onClick={() => navigate('/timetable')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									timetables
								</Button>
							</Box>
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title='Open user settings'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg'>
											{loggedUser.name.charAt(0)}
										</Avatar>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id='menu-applist'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem
										onClick={() => {
											handleCloseUserMenu()
											handleLogout()
										}}
									>
										<Typography textAlign='center'>logout</Typography>
									</MenuItem>
									<MenuItem
										onClick={() => {
											handleCloseUserMenu()
											handleUserCard()
										}}
									>
										<Typography textAlign='center'>user data</Typography>
									</MenuItem>
								</Menu>
							</Box>
						</Toolbar>
					</Container>
				</MuiAppBar>
				<UserCard userCard={userCard} setUserCard={SetUserCard} />
			</div>
			: <>loading..</>
	)
}
