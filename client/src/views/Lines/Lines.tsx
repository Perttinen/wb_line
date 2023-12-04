import { Button, CssBaseline } from '@mui/material'
import { useState } from 'react'
import { RoutePlanner } from './RoutePlanner'
import { RouteList } from './RouteList'

export const Lines = () => {
	const [showRoutePlanner, setShowRoutePlanner] = useState(false)
	return (
		<div>
			<CssBaseline />
			<Button
				onClick={() => setShowRoutePlanner(!showRoutePlanner)}
				fullWidth
				sx={{ mt: 3, mb: 2, fontSize: '1.2rem' }}
			>
				Create new route
			</Button>
			{showRoutePlanner && (
				<RoutePlanner
				// setShowRoutePlanner={setShowRoutePlanner}
				/>
			)}
			<RouteList />
		</div>
	)
}
