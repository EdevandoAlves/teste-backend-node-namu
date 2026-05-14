import { Request, Response, NextFunction } from 'express'
import { createProgramSchema } from '../schemas/program.schema'
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

