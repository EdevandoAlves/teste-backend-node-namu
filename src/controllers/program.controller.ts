import { Request, Response, NextFunction } from 'express'
import {
  CreateProgramData,
  createProgramSchema,
  UpdateProgramData,
  updateProgramSchema,
} from '../schemas/program.schema'
import {
  PaginationQueryData,
  paginationQuerySchema,
  idSchema,
} from '../schemas/utils.schema'
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
  req: Request<unknown, unknown, unknown, PaginationQueryData>,
  res: Response,
  next: NextFunction
) {
  try {
    const { limit, page } = paginationQuerySchema.parse(req.query)

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
    return res.status(204).send({ message: 'program successfully deleted' })
  } catch (err) {
    next(err)
  }
}

export async function summary(
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = idSchema.parse(req.params)

    const summary = await programService.summary(id)
    return res.status(200).send(summary)
  } catch (err) {
    next(err)
  }
}
