import {
	Box,
	Button,
	Collapse,
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import { AddShip } from './AddShip'
import { useSelector } from 'react-redux'
import { ShipType } from '../../../../types'
import { useContext } from 'react'
import { WebSocketContext } from '../../WebSocket'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

export const Ships = ({ open }: { open: boolean }) => {
	const [showAddShip, setShowAddShip] = useState(false)
	const ships = useSelector((state: { ships: ShipType[] }) => state.ships)
	const ws = useContext(WebSocketContext)

	const handleRemoveShip = (id: number) => {
		ws?.sendRemoveShip(id)
	}
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
								sx={{ fontSize: '2rem' }}
								onClick={() => setShowAddShip(true)}
							>
								<AddCircleOutlineIcon fontSize='inherit' />
							</Button>
						)}
					</Box>
					<Table>
						<TableBody>
							{ships.map((s) => (
								<TableRow key={s.id}>
									<TableCell sx={{ fontSize: '1.5rem' }}>{s.name}</TableCell>
									<TableCell>
										<Button sx={{ fontSize: '2rem' }} onClick={() => handleRemoveShip(s.id)}>
											<DeleteOutlinedIcon fontSize='inherit' />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Collapse>
			</TableCell>
		</TableRow>
	)
}
