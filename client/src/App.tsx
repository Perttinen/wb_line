import { Outlet } from 'react-router-dom'

import { AppBar } from './views/components'

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
