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
import { AddDock } from './AddDock'
import { useSelector } from 'react-redux'
import { DockType } from '../../../../types'
import { useContext } from 'react'
import { WebSocketContext } from '../../WebSocket'

export const Docks = ({ open }: { open: boolean }) => {
	const [showAddDock, setShowAddDock] = useState(false)
	const docks = useSelector((state: { docks: DockType[] }) => state.docks)
	const ws = useContext(WebSocketContext)

	const handleRemoveDock = (id: number) => {
		ws?.sendRemoveDock(id)
	}

	return (
		<>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							{showAddDock ? (
								<AddDock setShowAddDock={setShowAddDock} />
							) : (
								<Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
									<Button variant='contained' onClick={() => setShowAddDock(true)}>create dock</Button>
								</Box>

							)}
						</Box>
						<Table>
							<TableBody>
								{docks.map((d) => (
									<TableRow key={d.id}>
										<TableCell sx={{ fontSize: '1rem' }}>{d.name}</TableCell>
										<TableCell>
											<Button onClick={() => handleRemoveDock(d.id)}>
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
		</>
	)
}
