import z from 'zod'

export const paginationQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
})

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
  activityId: z.coerce.number().int().positive()
})

export type PaginationQueryData = z.infer<typeof paginationQuerySchema>
