import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeUsers } from './reducers/userReducer'
import { AppDispatch } from './store'
import { User } from './types'

const App: React.FC = () => {
	const padding = {
		padding: 5,
	}

	const dispatch: (...args: unknown[]) => Promise<User> =
		useDispatch<AppDispatch>()

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
