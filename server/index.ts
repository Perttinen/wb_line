import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import cors from 'cors'

const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
})
const DIST_PATH = path.resolve(__dirname, '../client/build')

app.use(express.static(DIST_PATH))

app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
	console.log('Client connected')

	socket.on('event://add-user', (msg) => {
		console.log('got', msg)

		// const payload = JSON.parse(msg);
		// if(chatLogs[payload.roomID]){
		// 	chatLogs[msg.roomID].push(payload.data);
		// }

		socket.broadcast.emit('event://get-message', msg)
	})

	socket.on('disconnect', () => {
		console.log('Client disconnected')
	})
})

import utils from './util/config'
import db from './util/db'

import loginRouter from './controllers/login'
import userRouter from './controllers/user'

app.use('/login', loginRouter)
app.use('/api/user', userRouter)

app.get('/*', function (_req, res) {
	res.sendFile(
		path.join(__dirname, '../client/build/index.html'),
		function (err) {
			if (err) {
				res.status(500).send(err)
			}
		}
	)
})

const start = async () => {
	try {
		await db.connectToDatabase()
		server.listen(utils.PORT, () => {
			console.log(`Server running on port ${utils.PORT}`)
		})
	} catch (err) {
		console.error('Failed to start the server:', err)
	}
}

start().catch((err) => console.log('An error occurred:', err))
