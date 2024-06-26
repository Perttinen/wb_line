import React, { createContext, useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'

import { appendUser, dropUser } from './reducers/userReducer'
import { appendDock, dropDock } from './reducers/dockReducer'
import { appendShip, dropShip } from './reducers/shipReducer'
import { AppDispatch } from './store'
import { DepartureType, DockNoIdType, ShipNoIdType, User, UserNoIdType, initDepartureType } from '../../types'
import { userService, dockService, shipService, departureService } from 'services'
import { initializeRoutes } from 'reducers/routeReducer'
import { appendDeparture, dropDeparture, initializeDepartures } from 'reducers/departureReducer'
import { appendShortlist, dropShortlist } from 'reducers/shortlistReducer'
import { Snackbar } from '@mui/material'
import { AxiosError } from 'axios'

const WS_BASE =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/'

interface IContext {
	socket: Socket
	sendAddUser: (user: UserNoIdType) => void
	sendRemoveUser: (id: number) => void
	sendAddDock: (user: DockNoIdType) => void
	sendRemoveDock: (id: number) => void
	sendAddShip: (user: ShipNoIdType) => void
	sendRemoveShip: (id: number) => void
	sendAddDepartures: (departure: initDepartureType[]) => void
	sendRemoveDepartures: (departureIds: number[]) => void
	error: {} | null | unknown
}

const WebSocketContext = createContext<IContext | null>(null)

export { WebSocketContext }

interface WebSocketProviderProps {
	children: React.ReactNode
}

const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [error, setError] = useState<string | null>(null)
	const dispatch: (...args: unknown[]) => Promise<User> | number =
		useDispatch<AppDispatch>()

	const sendAddUser = async (user: UserNoIdType) => {
		const newUser = await userService.create(user)
		dispatch(appendUser(newUser.data))
		socket?.emit('event://send-add-user', newUser)
	}

	const sendRemoveUser = async (id: number) => {
		await userService.remove(id)
		dispatch(dropUser(id))
		socket?.emit('event://send-remove-user', id)
	}

	const sendAddDock = async (dock: DockNoIdType) => {
		const newDock = await dockService.create(dock)
		dispatch(appendDock(newDock))
		socket?.emit('event://send-add-dock', newDock)
	}

	const sendRemoveDock = async (id: number) => {
		await dockService.remove(id)
		dispatch(dropDock(id))
		dispatch(initializeRoutes())
		dispatch(initializeDepartures())
		socket?.emit('event://send-remove-dock', id)
	}

	const sendAddShip = async (ship: ShipNoIdType) => {
		try {
			const newShip = await shipService.create(ship)
			dispatch(appendShip(newShip))
			socket?.emit('event://send-add-ship', newShip)
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.errors[0].message)
			}
			console.log(e);
		}
	}

	const sendRemoveShip = async (id: number) => {
		await shipService.remove(id)
		dispatch(dropShip(id))
		socket?.emit('event://send-remove-ship', id)
	}

	const sendAddDepartures = async (departures: initDepartureType[]) => {
		const newDepartures: DepartureType[] = await departureService.create(departures)
		dispatch(appendShortlist(newDepartures))
		dispatch(appendDeparture(newDepartures))
		socket?.emit('event://send-add-departures', newDepartures)
	}

	const sendRemoveDepartures = async (departureIds: number[]) => {
		await departureService.remove(departureIds)
		dispatch(dropDeparture(departureIds))
		dispatch(dropShortlist(departureIds))
		socket?.emit('event://send-remove-departures', departureIds)
	}

	useEffect(() => {
		const newSocket = io(WS_BASE)
		setSocket(newSocket)

		newSocket.on('event://get-add-user', (user: any) => {
			dispatch(appendUser(user))
		})

		newSocket.on('event://get-add-dock', (dock: any) => {
			dispatch(appendDock(dock))
		})

		newSocket.on('event://get-remove-user', (id: number) => {
			dispatch(dropUser(id))
		})

		newSocket.on('event://get-remove-dock', (id: number) => {
			dispatch(dropDock(id))
			dispatch(initializeRoutes())
			dispatch(initializeDepartures())
		})

		newSocket.on('event://get-add-ship', (ship: any) => {
			dispatch(appendShip(ship))
		})

		newSocket.on('event://get-remove-ship', (id: number) => {
			dispatch(dropShip(id))
		})

		newSocket.on('event://get-add-departures', (departures: DepartureType[]) => {
			dispatch(appendDeparture(departures))
			dispatch(appendShortlist(departures))
		})

		newSocket.on('event://get-remove-departures', (departureIds: number[]) => {
			dispatch(dropDeparture(departureIds))
			dispatch(dropShortlist(departureIds))
		})

		return () => {
			newSocket.close()
		}
	}, [dispatch])



	return (
		<WebSocketContext.Provider
			value={
				socket
					? {
						socket,
						sendAddUser,
						sendRemoveUser,
						sendAddDock,
						sendRemoveDock,
						sendAddShip,
						sendRemoveShip,
						sendAddDepartures,
						sendRemoveDepartures,
						error
					}
					: null
			}
		>
			<Snackbar
				open={error !== null}
				autoHideDuration={6000}
				onClose={() => setError(null)}
				message={error}
			/>

			{children}
		</WebSocketContext.Provider>
	)
}

export default WebSocketProvider
