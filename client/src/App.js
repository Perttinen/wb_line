import { Link, Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import { initializeUsers } from './reducers/userReducer'
import { useDispatch } from 'react-redux'

const App = () => {
	const padding = {
		padding: 5,
	}

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	return (
		<div>
			<div>
				<h1>Wb-Line</h1>
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
