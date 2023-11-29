import React, { createContext, useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'

import { initializeUsers, appendUser, dropUser } from './reducers/userReducer'
import { setTime } from './reducers/timeReducer'
import { AppDispatch } from './store'
import { User, UserNoIdType } from '../../types'
import userService from './services/users'
import { initializeUserLevels } from './reducers/userLevelReducer'

const WS_BASE =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/'

interface IContext {
	socket: Socket
	sendMessage: (message: string) => void
	sendAddUser: (user: UserNoIdType) => void
	sendRemoveUser: (id: number) => void
}

const WebSocketContext = createContext<IContext | null>(null)

export { WebSocketContext }

interface WebSocketProviderProps {
	children: React.ReactNode
}

const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const dispatch: (...args: unknown[]) => Promise<User> | number =
		useDispatch<AppDispatch>()

	const sendMessage = (message: string) => {
		const payload = {
			data: message,
		}
		socket?.emit('event://send-message', payload)
	}

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

	useEffect(() => {
		const newSocket = io(WS_BASE)
		setSocket(newSocket)

		newSocket.on('time', (time) => {
			dispatch(setTime(time))
		})

		newSocket.on('event://get-message', (msg: any) => {
			console.log('get-message: ', msg)
		})

		newSocket.on('event://get-add-user', (user: any) => {
			dispatch(appendUser(user))
		})

		newSocket.on('event://get-remove-user', (id: number) => {
			dispatch(dropUser(id))
		})

		return () => {
			newSocket.close()
		}
	}, [dispatch])

	return (
		<WebSocketContext.Provider
			value={
				socket ? { socket, sendMessage, sendAddUser, sendRemoveUser } : null
			}
		>
			{children}
		</WebSocketContext.Provider>
	)
}

export default WebSocketProvider
