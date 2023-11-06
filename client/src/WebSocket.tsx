import React, { createContext, useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'

import { initializeUsers, appendUser, dropUser } from './reducers/userReducer'
import { AppDispatch } from './store'
import { User, UserNoId } from '../../types'
import userService from './services/users'

const WS_BASE =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/'

interface IContext {
	socket: Socket
	sendMessage: (message: string) => void
	sendAddUser: (user: UserNoId) => void
	sendRemoveUser: (id: string) => void
}

const WebSocketContext = createContext<IContext | null>(null)

export { WebSocketContext }

interface WebSocketProviderProps {
	children: React.ReactNode
}

const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const dispatch: (...args: unknown[]) => Promise<User> =
		useDispatch<AppDispatch>()

	const sendMessage = (message: string) => {
		const payload = {
			data: message,
		}
		socket?.emit('event://send-message', payload)
	}

	const sendAddUser = async (user: UserNoId) => {
		const newUser = await userService.create(user)
		dispatch(appendUser(newUser.data))
		socket?.emit('event://send-add-user', newUser)
	}

	const sendRemoveUser = async (id: string) => {
		await userService.remove(id)
		dispatch(dropUser(id))
		socket?.emit('event://send-remove-user', id)
	}

	// socket?.on('event://get-message', (payload) => {
	// 	console.log(`user ${payload.id} says: ${payload.msg}`)
	// })

	useEffect(() => {
		dispatch(initializeUsers())
		const newSocket = io(WS_BASE)
		setSocket(newSocket)

		newSocket.on('event://get-message', (msg: any) => {
			console.log('get-message: ', msg)
		})

		newSocket.on('event://get-add-user', (user: any) => {
			dispatch(appendUser(user))
		})

		newSocket.on('event://get-remove-user', (id: string) => {
			console.log('get-remove-user: ', id)
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
