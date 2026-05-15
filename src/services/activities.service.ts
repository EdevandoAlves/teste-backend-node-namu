import { AppDataSource } from '../database/data-source'
import { Activity } from '../entities/Activity'
import { Program } from '../entities/Program'
import { AppError } from '../errors/AppError'
import { createActivitiesData } from '../schemas/activities.schema'

export class ActivityService {
  private activityRepo = AppDataSource.getRepository(Activity)
  private programRepo = AppDataSource.getRepository(Program)

  async listActivity(id: number, page?: number, limit?: number) {
    page = page ?? 1
    limit = limit ?? 10

    const existingProgram = await this.programRepo.findOne({ where: { id } })

    if (!existingProgram) {
      throw new AppError('program not found', 400)
    }

    const [activities, total] = await this.activityRepo.findAndCount({
      where: {
        program_id: id,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      data: activities,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async createActivities(id: number, body: createActivitiesData) {

    const existingProgram = await this.programRepo.findOne({ where: { id } })

    if (!existingProgram) {
      throw new AppError("Program not found", 404)
    }

    const activity = this.activityRepo.create({ program_id: id, ...body })
    await this.activityRepo.save(activity)

    return activity
  }
}
