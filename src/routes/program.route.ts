import { Router } from 'express'
import {
  createProgram,
  deleteProgram,
  listProgram,
  summary,
  updateProgram,
} from '../controllers/program.controller'

const programRouter = Router()

programRouter.get('/', listProgram)
programRouter.get('/:id/summary', summary)
programRouter.post('/', createProgram)
programRouter.patch('/:id', updateProgram)
programRouter.delete('/:id', deleteProgram)

export { programRouter }
