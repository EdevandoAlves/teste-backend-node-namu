import express from 'express'
import { programRouter } from './routes/program.route'
import { errorHandler } from './middlewares/error-handler'

const app = express()

app.use(express.json())

app.use('/programs', programRouter)

app.use(errorHandler)

export { app }
