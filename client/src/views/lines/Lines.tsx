import { CssBaseline } from '@mui/material'
import { useState } from 'react'
import { RoutePlanner } from 'views/lines/RoutePlanner'
import { RouteList } from 'views/lines/RouteList'
import { IconButton } from 'views/components/SmallOnes'

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
					<IconButton iconType='add' whenClicked={() => { setShowRoutePlanner(!showRoutePlanner) }} />
					// <Button
					// 	onClick={() => setShowRoutePlanner(!showRoutePlanner)}
					// 	fullWidth
					// 	sx={{ mt: 3, mb: 2, fontSize: '2rem' }}>
					// 	<AddCircleOutlineIcon fontSize='inherit' />
					// </Button>
				)
			}
			<RouteList />
		</div>
	)
}
