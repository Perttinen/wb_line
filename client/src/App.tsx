import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Login } from './components'
import { AppDispatch } from './store'
import { removeLoggedUser, setLoggedUser } from './reducers/loggedUserReducer'
import { AppBar, Button, Toolbar } from '@mui/material'
import { UserWithTokenType } from '../../types'
import { useEffect } from 'react'

const App = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	useEffect(() => {
		console.log('effect')

		const loggedUserJSON = window.localStorage.getItem('loggedWbUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setLoggedUser(user))
		}
	}, [dispatch])

	const navigate = useNavigate()

	const time = useSelector((state: { time: number }) => state.time)
	const timeString = new Date(time).toLocaleTimeString('fi-FI', {
		timeStyle: 'short',
	})

	const loggedUser = useSelector(
		(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	)

	const handleLogout = () => {
		window.localStorage.clear()
		dispatch(removeLoggedUser())
	}

	return !loggedUser.username ? (
		<Login />
	) : (
		<div>
			<div>
				<AppBar position='static'>
					<Toolbar disableGutters>
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
					</Toolbar>
				</AppBar>
			</div>

			<p>
				{timeString} <Button onClick={handleLogout}>log out</Button>
			</p>

			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
