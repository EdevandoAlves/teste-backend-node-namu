import { Request, Response, NextFunction } from 'express'
import { ActivityService } from '../services/activities.service'
import {
  idSchema,
  PaginationQueryData,
  paginationQuerySchema,
} from '../schemas/utils.schema'
import { createActivitiesData, createActivitiesSchema } from '../schemas/activities.schema'

const activityService = new ActivityService()

export async function listActivities(
  req: Request<{ id: number }, unknown, unknown, PaginationQueryData>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = idSchema.parse(req.params)
    const { limit, page } = paginationQuerySchema.parse(req.query)

    const activities = await activityService.listActivity(id, page, limit)
    return res.status(200).json(activities)
  } catch (err) {
    next(err)
  }
}

export async function createActivities(req: Request<{ id: number }, unknown, createActivitiesData>, res: Response, next: NextFunction) {
  try {
    const { id } = idSchema.parse(req.params)
    const body = createActivitiesSchema.parse(req.body)

    const activity = await activityService.createActivities(id, body)
    return res.status(200).json(activity)
  } catch (err) {
    next(err)
  }
}
