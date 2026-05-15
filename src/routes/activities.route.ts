import { Router } from 'express'
import {
  createActivities,
  listActivities,
  updateActivities,
} from '../controllers/activities.controller'

const activitiesRouter = Router({ mergeParams: true })

activitiesRouter.get('/', listActivities)
activitiesRouter.post('/', createActivities)
activitiesRouter.patch('/:activityId', updateActivities)

export { activitiesRouter }
