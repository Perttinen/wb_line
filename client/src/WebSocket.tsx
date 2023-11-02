import React, { createContext, useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
// import { WS_BASE } from './config';
import { useDispatch } from 'react-redux'
// import { updateChatLog } from './actions'

const WS_BASE =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/'

interface IContext {
	socket: Socket
	sendMessage: (roomId: string, message: string) => void
}

const WebSocketContext = createContext<IContext | null>(null)

export { WebSocketContext }

interface WebSocketProviderProps {
	children: React.ReactNode
}

const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const dispatch = useDispatch()

	const sendMessage = (roomId: string, message: string) => {
		const payload = {
			roomId,
			data: message,
		}
		socket?.emit('event://add-user', JSON.stringify(payload))
		// dispatch(updateChatLog(payload))
	}

	useEffect(() => {
		const newSocket = io(WS_BASE)
		setSocket(newSocket)

		newSocket.on('event://add-user', (msg: any) => {
			console.log(msg)

			// const payload = JSON.parse(msg)
			// dispatch(updateChatLog(payload))
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
