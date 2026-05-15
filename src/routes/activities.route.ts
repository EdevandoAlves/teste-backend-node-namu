import { Router } from 'express'
import { createActivities, listActivities } from '../controllers/activities.controller'

const activitiesRouter = Router({ mergeParams: true })

activitiesRouter.get('/', listActivities)
activitiesRouter.post('/', createActivities)

export { activitiesRouter }
