import { Box } from '@mui/material'
import { useState } from 'react'
import { RoutePlanner } from 'views/lines/RoutePlanner'
import { RouteList } from 'views/lines/RouteList'
import { TextButton } from 'views/components/SmallOnes'

export const Lines = () => {
	const [showRoutePlanner, setShowRoutePlanner] = useState(false)
	return (
		<div>
			{showRoutePlanner
				? (
					<RoutePlanner setShowRoutePlanner={setShowRoutePlanner} />
				)
				: (<Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} height={'80px'} borderBottom={1}>
					<TextButton actionType='add' label='create route' whenClicked={() => { setShowRoutePlanner(!showRoutePlanner) }}></TextButton>
				</Box>
				)
			}
			<RouteList />
		</div>
	)
}
