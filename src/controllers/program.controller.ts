import { Request, Response, NextFunction } from 'express'
import { createProgramSchema, queryFilterProgramData, queryFilterProgramSchema } from '../schemas/program.schema'
import { ProgramService } from '../services/program.service'

const programService = new ProgramService()

export async function createProgram(
  req: Request,
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

export async function listProgram(req: Request<{}, {}, {}, queryFilterProgramData>, res: Response, next: NextFunction) {
  try {
    const { limit, page } = queryFilterProgramSchema.parse(req.query);

    const programs = await programService.listProgram(page, limit)
    return res.status(200).json(programs)
  } catch (err) {
    next(err)
  }
}

