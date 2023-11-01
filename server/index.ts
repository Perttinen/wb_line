import express from 'express'
import path from 'path'
import cors from 'cors'
const app = express()

import utils from './util/config'
import db from './util/db'

import loginRouter from './controllers/login'
import userRouter from './controllers/user'

const DIST_PATH = path.resolve(__dirname, '../client/build')

app.use(express.static(DIST_PATH))

app.use(cors())
app.use(express.json())

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
		app.listen(utils.PORT, () => {
			console.log(`Server running on port ${utils.PORT}`)
		})
	} catch (err) {
		console.error('Failed to start the server:', err)
	}
}

start().catch((err) => console.log('An error occurred:', err))