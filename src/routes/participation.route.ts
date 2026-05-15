import { Router } from 'express'
import { createParticipation } from '../controllers/participation.controller'

const participationRouter = Router()

participationRouter.post('/', createParticipation)

export { participationRouter }
