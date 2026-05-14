import { z } from 'zod'
import { ProgramCategory } from '../entities/Program'

export const createProgramSchema = z.object({
  name: z.string().min(3),

  description: z.string(),

  category: z.enum([
    ProgramCategory.EXERCICIO,
    ProgramCategory.MEDITACAO,
    ProgramCategory.NUTRICAO,
  ]),

  duration_weeks: z.number().min(1),
})

export const queryFilterProgramSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional()
})

export type CreateProgramData = z.infer<typeof createProgramSchema>
export type queryFilterProgramData = z.infer<typeof queryFilterProgramSchema>

