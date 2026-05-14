import { Router } from 'express'
import { createProgram } from '../controllers/program.controller'

const programRouter = Router()

programRouter.post('/', createProgram)

export { programRouter }
