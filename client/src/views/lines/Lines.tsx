import { Box, Button, Container } from '@mui/material'
import { useState } from 'react'
import { RoutePlanner } from 'views/lines/RoutePlanner'
import { RouteList } from 'views/lines/RouteList'

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
						<Box borderBottom={1} zIndex={1000} bgcolor={'white'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} height={'80px'} position={'sticky'} top={'65px'}>
							<Button variant='contained' onClick={() => { setShowRoutePlanner(!showRoutePlanner) }}>
								create route
							</Button>
						</Box>
					)
				}
				<RouteList />
			</Box>
		</Container>
	)
}
