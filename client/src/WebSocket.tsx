import React, { createContext, useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'

import { initializeUsers } from './reducers/userReducer'
import { AppDispatch } from './store'
import { User } from '../../types'

const WS_BASE =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/'

interface IContext {
	socket: Socket
	sendMessage: (message: string) => void
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

	socket?.on('event://get-message', (payload) => {
		console.log(`user ${payload.id} says: ${payload.msg}`)
	})

	useEffect(() => {
		dispatch(initializeUsers())
		const newSocket = io(WS_BASE)
		setSocket(newSocket)

		newSocket.on('event://add-user', (msg: any) => {
			console.log(msg)
		})

		return () => {
			newSocket.close()
		}
	}, [dispatch])

	return (
		<WebSocketContext.Provider value={socket ? { socket, sendMessage } : null}>
			{children}
		</WebSocketContext.Provider>
	)
}

export default WebSocketProvider
