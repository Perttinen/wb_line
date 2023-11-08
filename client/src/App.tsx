import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Login } from './components'
import { AppDispatch } from './store'
import { setLoggedUser } from './reducers/loggedUserReducer'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'

const App = () => {
	const navigate = useNavigate()

	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	const time = useSelector((state: { time: number }) => state.time)
	const timeString = new Date(time).toLocaleTimeString('fi-FI', {
		timeStyle: 'short',
	})

	const loggedUser = useSelector(
		(state: { loggedUser: string }) => state.loggedUser
	)

	return !loggedUser ? (
		<Login />
	) : (
		<div>
			<div>
				<AppBar position='static'>
					<Container maxWidth='xl'>
						<Toolbar disableGutters>
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
								<Button
									onClick={() => navigate('/')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									home
								</Button>
								<Button
									onClick={() => navigate('/users')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									users
								</Button>
								<Button
									onClick={() => navigate('/usermanagement')}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									user management
								</Button>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</div>

			<p>
				{timeString}{' '}
				<Button onClick={() => dispatch(setLoggedUser(''))}>log out</Button>
			</p>

			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
