import { Outlet, useLocation } from 'react-router-dom'

import { Login, TimetableById } from './views'
import { AppBar } from './views/components'

const App = () => {
	const location = useLocation()
	return location.pathname.startsWith('/timetable') && !localStorage.getItem('token') ? (
		<TimetableById />
	) : !localStorage.getItem('token') ? (
		<Login />
	) : (
		<div>
			<AppBar />
			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
