import {
	Box,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
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


type MyAlertProps = {
	id: number
}

const DeleteButtonWithAlert = (props: MyAlertProps) => {
	const ws = useContext(WebSocketContext)
	const [alert, setAlert] = useState(false)

	const handleDelete = async (id: number) => {
		ws?.sendRemoveDock(id)
	}

	return (
		<>
			<Button variant='text'
				onClick={() => { setAlert(true) }}
			>
				delete
			</Button>
			<Dialog
				open={alert}
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Deleting dock will also delete all related routes and timetables!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='text' onClick={() => {

						setAlert(false)
					}}>cancel</Button>
					<Button variant='text' onClick={() => {
						handleDelete(props.id)
						setAlert(false)
					}}>delete</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export const Docks = ({ open }: { open: boolean }) => {
	const [showAddDock, setShowAddDock] = useState(false)
	const docks = useSelector((state: { docks: DockType[] }) => state.docks)

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
											<DeleteButtonWithAlert id={d.id} />
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
