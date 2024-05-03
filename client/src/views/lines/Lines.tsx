import { Button, CssBaseline } from '@mui/material'
import { useState } from 'react'
import { RoutePlanner } from 'views/Lines/RoutePlanner'
import { RouteList } from 'views/Lines/RouteList'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

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
						sx={{ mt: 3, mb: 2, fontSize: '2rem' }}>
						<AddCircleOutlineIcon fontSize='inherit' />
					</Button>
				)
			}
			<RouteList />
		</div>
	)
}
