import express from 'express'
import { programRouter } from './routes/program.route'
import { errorHandler } from './middlewares/error-handler'
import { activitiesRouter } from './routes/activities.route'
import { participationRouter } from './routes/participation.route'

const app = express()

app.use(express.json())

app.use('/programs', programRouter)
app.use('/programs/:id/activities', activitiesRouter)
app.use('/participations', participationRouter)

app.use(errorHandler)

export { app }
