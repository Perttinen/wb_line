import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Login, Timetable } from './views'

import { UserWithTokenType } from '../../types'

import { AppBar } from './views/components'
import { useInitializers } from './hooks'

const App = () => {
	const location = useLocation()

	useInitializers()

	const loggedUser = useSelector(
		(state: { loggedUser: UserWithTokenType }) => state.loggedUser
	)

	console.log('luser: ',loggedUser);
	

	return location.pathname.startsWith('/timetable') && !loggedUser.username ? (
		<Timetable />
	) : !loggedUser.username ? (
		<Login />
	) : (
		<div>
			<AppBar loggedUser={loggedUser} />
			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
