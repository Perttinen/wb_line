import express from 'express'
import path from 'path'
import cors from 'cors'

import utils from './util/config'
import db from './util/db'
import loginRouter from './controllers/login'
import userRouter from './controllers/user'
import userLevelRouter from './controllers/userlevel'
import dockRouter from './controllers/dock'
import shipRouter from './controllers/ship'
import ioConnection from './util/socket'

const app = express()
app.use(cors())
app.use(express.json())

const DIST_PATH = path.resolve(__dirname, '../client/build')
app.use(express.static(DIST_PATH))

app.use('/api/userlevel', userLevelRouter)
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/dock', dockRouter)
app.use('/api/ship', shipRouter)
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
		const expressServer = app.listen(utils.PORT, () => {
			console.log(`Server running on port ${utils.PORT}`)
		})
		ioConnection(expressServer)
	} catch (err) {
		console.error('Failed to start the server:', err)
	}
}

start().catch((err) => console.log('An error occurred:', err))
