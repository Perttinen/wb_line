import { Outlet } from 'react-router-dom'

import { AppBar } from 'views'

const Appi = () => {
	return (
		<div>
			<AppBar />
			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

export default Appi
