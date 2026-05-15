import { DeepPartial } from 'typeorm'
import { AppDataSource } from '../database/data-source'
import { Activity } from '../entities/Activity'
import { Participation } from '../entities/Participation'
import { AppError } from '../errors/AppError'
import { createParticipationData } from '../schemas/participation.schema'

export class ParticipationService {
  private participationRepo = AppDataSource.getRepository(Participation)
  private activityRepo = AppDataSource.getRepository(Activity)

  async createParticipation(body: createParticipationData) {
    const activity = await this.activityRepo.findOne({
      where: {
        id: body.activity_id,
      },
    })

    if (!activity) {
      throw new AppError('Activity not found', 404)
    }

    const participation = this.participationRepo.create({
      user_name: body.user_name,
      activity_id: body.activity_id,
      notes: body.notes,
    } as DeepPartial<Participation>)
    await this.participationRepo.save(participation)

    return participation
  }
}
