import { Outlet, useLocation } from 'react-router-dom'


import { Login, Timetable } from './views'



import { AppBar } from './views/components'
import { useInitializers } from './hooks'



const App = () => {
	useInitializers()
	const location = useLocation()

	return location.pathname.startsWith('/timetable') && !localStorage.getItem('token') ? (
		<Timetable />
	) : !localStorage.getItem('token') ? (
		<Login />
	) : (
		<div>
			<AppBar
			/>
			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
