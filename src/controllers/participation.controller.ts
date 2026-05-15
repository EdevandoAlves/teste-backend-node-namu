import { Request, Response, NextFunction } from 'express'
import { ParticipationService } from '../services/participation.service'
import {
  createParticipationData,
  createParticipationSchema,
} from '../schemas/participation.schema'

const participationService = new ParticipationService()

export async function createParticipation(
  req: Request<unknown, unknown, createParticipationData>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = createParticipationSchema.parse(req.body)

    const participation = await participationService.createParticipation(body)
    return res.status(201).json(participation)
  } catch (err) {
    next(err)
  }
}
