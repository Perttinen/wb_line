import { Box, Button, Collapse, TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { AddShip } from './AddShip'

export const Ships = ({ open }: { open: boolean }) => {
	const [showAddShip, setShowAddShip] = useState(false)
	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open} timeout='auto' unmountOnExit>
					<Box sx={{ margin: 1 }}>
						{showAddShip ? (
							<AddShip setShowAddShip={setShowAddShip} />
						) : (
							<Button
								fullWidth
								sx={{ fontSize: '1.2rem' }}
								onClick={() => setShowAddShip(true)}
							>
								add ship
							</Button>
						)}
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	)
}
