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
							<Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
								<Button variant='contained' onClick={() => setShowAddShip(true)}>create ship</Button>
							</Box>
						)}
					</Box>
					<Table>
						<TableBody>
							{ships.map((s) => (
								<TableRow key={s.id}>
									<TableCell sx={{ fontSize: '1rem' }}>{s.name}</TableCell>
									<TableCell>
										<Button onClick={() => handleRemoveShip(s.id)}>
											delete
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
