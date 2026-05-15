import express from 'express'
import { programRouter } from './routes/program.route'
import { errorHandler } from './middlewares/error-handler'
import { activitiesRouter } from './routes/activities.route'

const app = express()

app.use(express.json())

app.use('/programs', programRouter)
app.use('/programs/:id/activities', activitiesRouter)

app.use(errorHandler)
export { app }
