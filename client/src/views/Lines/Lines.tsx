import { Button, CssBaseline } from '@mui/material'
import { useState } from 'react'
import { RoutePlanner } from 'views/Lines/RoutePlanner'
import { RouteList } from 'views/Lines/RouteList'

export const Lines = () => {
	const [showRoutePlanner, setShowRoutePlanner] = useState(false)
	return (
		<div>
			<CssBaseline />
			{showRoutePlanner
				? (
					<RoutePlanner setShowRoutePlanner={setShowRoutePlanner} />
				)
				: (
					<Button
						onClick={() => setShowRoutePlanner(!showRoutePlanner)}
						fullWidth
						sx={{ mt: 3, mb: 2, fontSize: '1.2rem' }}>
						Create new route
					</Button>
				)
			}
			<RouteList />
		</div>
	)
}
