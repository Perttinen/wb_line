import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Login, Timetable } from './views'
import { AppDispatch } from './store'
import { removeLoggedUser, setLoggedUser } from './reducers/loggedUserReducer'
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { UserWithTokenType } from '../../types'
import { useEffect, useState } from 'react'

const App = () => {
	const location = useLocation()
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedWbUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setLoggedUser(user))
		}
	}, [dispatch])

	const navigate = useNavigate()

	const loggedUser = useSelector(
		(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	)

	const handleLogout = () => {
		window.localStorage.clear()
		dispatch(removeLoggedUser())
		navigate('/')
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

	return location.pathname === '/timetable' && !loggedUser.username ? (
		<Timetable />
	) : !loggedUser.username ? (
		<Login />
	) : (
		<div>
			<div>
				<AppBar position='static'>
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
									<MenuItem
										onClick={() => {
											navigate('/usermanagement')
											handleCloseNavMenu()
										}}
									>
										<Typography textAlign='center'>USER MANAGEMENT</Typography>
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
								// href="#app-bar-with-responsive-menu"
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
								<Button
									onClick={() => navigate('/usermanagement')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									user management
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
									id='menu-appbar'
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
								</Menu>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</div>

			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
