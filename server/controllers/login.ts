import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
	res.send('Hello from login!')
})

export default router
