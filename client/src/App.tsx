import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const App = () => {
	const padding = {
		padding: 5,
	}

	const time = useSelector((state: { time: number }) => state.time)
	const timeString = new Date(time).toLocaleTimeString('fi-FI', {
		timeStyle: 'short',
	})

	return (
		<div>
			<div>
				<h1>Wb-Line</h1>
				<h3>{timeString}</h3>
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
