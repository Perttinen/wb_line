/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import cors from 'cors'

import utils from './util/config'
import db from './util/db'
import loginRouter from './controllers/login'
import userRouter from './controllers/user'

const app = express()
app.use(cors())
app.use(express.json())

const DIST_PATH = path.resolve(__dirname, '../client/build')
app.use(express.static(DIST_PATH))

const start = async () => {
	try {
		await db.connectToDatabase()
		const expressServer = app.listen(utils.PORT, () => {
			console.log(`Server running on port ${utils.PORT}`)
		})
		const io = new Server(expressServer, {
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
	} catch (err) {
		console.error('Failed to start the server:', err)
	}
}

start().catch((err) => console.log('An error occurred:', err))

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
