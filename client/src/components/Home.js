import { Link, Outlet } from 'react-router-dom'

export const Home = () => {
	const padding = {
		padding: 5,
	}

	return (
		<div>
			<div>
				<h3>Wb-Line</h3>
			</div>
			<div>
				<Link style={padding} to='/'>
					home
				</Link>
				<Link style={padding} to='/users'>
					userlist
				</Link>
				<Link style={padding} to='/adduser'>
					add user
				</Link>
			</div>
			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}
