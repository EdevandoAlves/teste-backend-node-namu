import { z } from 'zod'

export const createParticipationSchema = z.object({
  user_name: z.string().min(3),

  activity_id: z.coerce.number(),

  notes: z.string().optional(),
})

export type createParticipationData = z.infer<typeof createParticipationSchema>
