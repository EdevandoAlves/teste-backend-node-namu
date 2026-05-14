import { Router } from 'express'
import { createProgram, listProgram } from '../controllers/program.controller'

const programRouter = Router()

programRouter.get('/', listProgram)
programRouter.post('/', createProgram)

export { programRouter }
