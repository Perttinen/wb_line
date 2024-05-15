import { Box, Container } from '@mui/material'
import { useState } from 'react'

import { RoutePlanner } from 'views/lines/RoutePlanner'
import { RouteList } from 'views/lines/RouteList'
import { TopButtons } from 'views/components/SmallOnes'

export const Lines = () => {
	const [showRoutePlanner, setShowRoutePlanner] = useState(false)
	return (
		<Container>
			<Box display={'flex'} flexDirection={'column'}>
				{showRoutePlanner
					? (
						<RoutePlanner setShowRoutePlanner={setShowRoutePlanner} />
					)
					: (
						<TopButtons
							buttons={
								[
									{ onClick: () => setShowRoutePlanner(!showRoutePlanner), label: 'create route' }
								]} />
					)
				}
				<RouteList />
			</Box>
		</Container>
	)
}
