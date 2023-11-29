import { Box, Button, Collapse, TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { AddDock } from './AddDock'

export const Docks = ({ open }: { open: boolean }) => {
	const [showAddDock, setShowAddDock] = useState(false)
	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open} timeout='auto' unmountOnExit>
					<Box sx={{ margin: 1 }}>
						{showAddDock ? (
							<AddDock setShowAddDock={setShowAddDock} />
						) : (
							<Button
								fullWidth
								sx={{ fontSize: '1.2rem' }}
								onClick={() => setShowAddDock(true)}
							>
								add dock
							</Button>
						)}
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	)
}
