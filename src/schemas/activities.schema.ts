import { z } from "zod"
import { DayOfWeek } from "../entities/Activity"

export const createActivitiesSchema = z.object({
  title: z.string(),

  description: z.string(),

  day_of_week: z.enum([
    DayOfWeek.DOMINGO,
    DayOfWeek.SEGUNDA,
    DayOfWeek.TERCA,
    DayOfWeek.QUARTA,
    DayOfWeek.QUINTA,
    DayOfWeek.SEXTA,
    DayOfWeek.SABADO
  ]),

  duration_minutes: z.number().positive()
})

export type createActivitiesData = z.infer<typeof createActivitiesSchema>
