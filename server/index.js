const express = require('express')
const cors = require('cors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')

app.use(cors())
app.use(express.json())

app.use('/login', loginRouter)
app.use('/api/user', userRouter)

const start = async () => {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

start()
