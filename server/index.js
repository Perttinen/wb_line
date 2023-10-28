const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')

const DIST_PATH = path.resolve(__dirname, '../client/build')

app.use(express.static(DIST_PATH))

app.use(cors())
app.use(express.json())

app.use('/login', loginRouter)
app.use('/api/user', userRouter)

app.get('/*', function (req, res) {
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
	await connectToDatabase()
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

start()
