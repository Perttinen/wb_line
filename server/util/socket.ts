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
	})
}

export default ioConnection
