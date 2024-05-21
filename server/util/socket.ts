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

		socket.on('disconnect', () => {
			console.log(`User ${socket.id} disconnected`);

		})
		socket.on('event://send-add-user', (payload) => {
			socket.broadcast.emit('event://get-add-user', payload.data as object)
		})
		socket.on('event://send-add-dock', (payload) => {
			socket.broadcast.emit('event://get-add-dock', payload as object)
		})
		socket.on('event://send-remove-user', (payload) => {
			socket.broadcast.emit('event://get-remove-user', payload)
		})
		socket.on('event://send-remove-dock', (payload) => {
			socket.broadcast.emit('event://get-remove-dock', payload)
		})
		socket.on('event://send-add-ship', (payload) => {
			socket.broadcast.emit('event://get-add-ship', payload as object)
		})
		socket.on('event://send-remove-ship', (payload) => {
			socket.broadcast.emit('event://get-remove-ship', payload)
		})
		socket.on('event://send-add-departures', (payload) => {
			socket.broadcast.emit('event://get-add-departures', payload)
		})
		socket.on('event://send-remove-departures', (payload) => {
			socket.broadcast.emit('event://get-remove-departures', payload)
		})
	})
}

export default ioConnection
