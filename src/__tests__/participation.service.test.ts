import { Activity, DayOfWeek } from '../entities/Activity'
import { Participation } from '../entities/Participation'
import { AppError } from '../errors/AppError'
import { ParticipationService } from '../services/participation.service'

const mockParticipationRepository = {
  create: jest.fn(),
  save: jest.fn(),
}

const mockActivityRepository = {
  findOne: jest.fn(),
}

jest.mock('../database/data-source', () => ({
  AppDataSource: {
    getRepository: (entity: unknown) => {
      if (entity === Participation) {
        return mockParticipationRepository
      }

      if (entity === Activity) {
        return mockActivityRepository
      }
    },
  },
}))

describe('Participation Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const service = new ParticipationService()

  const data = {
    user_name: 'user test',
    activity_id: 1,
    notes: 'test note',
  }

  const createdParticipation = {
    id: 1,
    completed_at: new Date(),
    ...data,
  }

  it('should create a participation', async () => {
    const existingActivity = {
      id: 1,
      program_id: 1,
      title: 'title test',
      description: 'description test',
      day_of_week: DayOfWeek.SEGUNDA,
      duration_minutes: 20,
    }

    mockActivityRepository.findOne.mockResolvedValue(existingActivity)

    mockParticipationRepository.create.mockReturnValue(createdParticipation)
    mockParticipationRepository.save.mockResolvedValue(createdParticipation)

    const result = await service.createParticipation(data)

    expect(mockActivityRepository.findOne).toHaveBeenCalledWith({
      where: { id: data.activity_id },
    })
    expect(mockParticipationRepository.create).toHaveBeenCalledWith(data)
    expect(mockParticipationRepository.save).toHaveBeenCalledWith(
      createdParticipation
    )

    expect(result).toEqual(createdParticipation)
  })

  it('should throw AppError when activity does not exist', async () => {
    mockActivityRepository.findOne.mockResolvedValue(undefined)

    await expect(service.createParticipation(data)).rejects.toThrow(
      new AppError('Activity not found')
    )

    expect(mockActivityRepository.findOne).toHaveBeenCalledWith({
      where: { id: data.activity_id },
    })
  })
})
