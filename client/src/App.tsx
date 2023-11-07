import { Link, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Login } from './components'
import { AppDispatch } from './store'
import { setLoggedUser } from './reducers/loggedUserReducer'

const App = () => {
	const padding = {
		padding: 5,
	}

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
				<h1>Wb-Line</h1>
				<h3>{timeString}</h3>
				<button onClick={() => dispatch(setLoggedUser(''))}>logout</button>
			</div>
			<div>
				<Link style={padding} to='/'>
					home
				</Link>
				<Link style={padding} to='/users'>
					userlist
				</Link>
				<Link style={padding} to='/usermanagement'>
					user management
				</Link>
			</div>
			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
