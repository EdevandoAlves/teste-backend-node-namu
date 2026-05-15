import { Router } from 'express'
import {
  createActivities,
  deleteActivities,
  listActivities,
  updateActivities,
} from '../controllers/activities.controller'

const activitiesRouter = Router({ mergeParams: true })

activitiesRouter.get('/', listActivities)
activitiesRouter.post('/', createActivities)
activitiesRouter.patch('/:activityId', updateActivities)
activitiesRouter.delete('/:activityId', deleteActivities)

export { activitiesRouter }
