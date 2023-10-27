import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { UserList, Home, AddUser } from './components'

const App = () => {
	const padding = {
		padding: 5,
	}

	return (
		<Router>
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

			<Routes>
				<Route path='/adduser' element={<AddUser />} />
				<Route path='/users' element={<UserList />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
