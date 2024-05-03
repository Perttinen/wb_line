import { Outlet } from 'react-router-dom'

import { AppBar } from 'views'

const App = () => {
	return (
		<div>
			<AppBar />
			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
