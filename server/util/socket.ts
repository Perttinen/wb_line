import http from 'node:http'
import { Server } from 'socket.io'

const ioConnection = (server: http.Server) => {
	const io = new Server(server, {
		cors: {
			origin:
				process.env.NODE_ENV === 'dev'
					? ['http://localhost:3000', 'http://127.0.0.1:3000']
					: false,
		},
	})

	io.on('connection', (socket) => {
		console.log(`User ${socket.id} connected`)
		setInterval(() => {
			socket.emit('time', new Date().valueOf())
		}, 10000)
		socket.on('event://send-message', (payload) => {
			const user = socket.id
			const mes = {
				id: user,
				msg: payload.data as string,
			}
			socket.broadcast.emit('event://get-message', mes)
		})
		socket.on('event://send-add-user', (payload) => {
			socket.broadcast.emit('event://get-add-user', payload.data as object)
		})
		socket.on('event://send-remove-user', (payload) => {
			socket.broadcast.emit('event://get-remove-user', payload)
		})
	})
}

export default ioConnection
