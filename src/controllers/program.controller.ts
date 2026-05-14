import { Request, Response, NextFunction } from 'express'
import {
  CreateProgramData,
  createProgramSchema,
  idSchema,
  QueryFilterProgramData,
  queryFilterProgramSchema,
  UpdateProgramData,
  updateProgramSchema,
} from '../schemas/program.schema'
import { ProgramService } from '../services/program.service'

const programService = new ProgramService()

export async function createProgram(
  req: Request<unknown, unknown, CreateProgramData, unknown>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = createProgramSchema.parse(req.body)

    const program = await programService.createProgram(body)

    return res.status(201).json(program)
  } catch (err) {
    next(err)
  }
}

export async function listProgram(
  req: Request<unknown, unknown, unknown, QueryFilterProgramData>,
  res: Response,
  next: NextFunction
) {
  try {
    const { limit, page } = queryFilterProgramSchema.parse(req.query)

    const programs = await programService.listProgram(page, limit)
    return res.status(200).json(programs)
  } catch (err) {
    next(err)
  }
}

export async function updateProgram(
  req: Request<{ id: number }, unknown, UpdateProgramData, unknown>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = idSchema.parse(req.params)
    const data = updateProgramSchema.parse(req.body)

    const updatedProgram = await programService.updateProgram(id, data)
    return res.status(200).send(updatedProgram)
  } catch (err) {
    next(err)
  }
}

export async function deleteProgram(
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = idSchema.parse(req.params)

    await programService.deleteProgram(id)
    return res.status(200).send({ message: 'program successfully deleted' })
  } catch (err) {
    next(err)
  }
}
