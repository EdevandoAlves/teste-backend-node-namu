import { Activity, DayOfWeek } from '../entities/Activity'
import { Program, ProgramCategory } from '../entities/Program'
import { AppError } from '../errors/AppError'
import { createActivitiesData } from '../schemas/activities.schema'
import { ActivityService } from '../services/activities.service'

const mockActivityRepository = {
  create: jest.fn(),
  save: jest.fn(),
}

const mockProgramRepository = {
  findOne: jest.fn(),
}

jest.mock('../database/data-source', () => ({
  AppDataSource: {
    getRepository: (entity: unknown) => {
      if (entity === Program) {
        return mockProgramRepository
      }

      if (entity === Activity) {
        return mockActivityRepository
      }
    },
  },
}))

describe('Activities Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const service = new ActivityService()

  const data: createActivitiesData = {
    title: 'Title test',
    description: 'Description test',
    day_of_week: DayOfWeek.SEGUNDA,
    duration_minutes: 10,
  }
  const createdActivity = {
    id: 1,
    program_id: 1,
    ...data,
  }

  it('should create an activity', async () => {
    const existingProgram = {
      id: 1,
      name: 'Program test 1',
      description: 'Description test 1',
      category: ProgramCategory.EXERCICIO,
      duration_weeks: 2,
    }

    mockProgramRepository.findOne.mockResolvedValue(existingProgram)

    mockActivityRepository.create.mockReturnValue(createdActivity)
    mockActivityRepository.save.mockResolvedValue(createdActivity)

    const result = await service.createActivities(1, data)

    expect(mockProgramRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    })
    expect(mockActivityRepository.create).toHaveBeenCalledWith({
      program_id: 1,
      ...data,
    })
    expect(mockActivityRepository.save).toHaveBeenCalledWith(createdActivity)
    expect(result).toEqual(createdActivity)
  })

  it('should throw AppError when program does not exist', async () => {
    mockProgramRepository.findOne.mockResolvedValue(undefined)

    await expect(service.createActivities(1, data)).rejects.toThrow(
      new AppError('Program not found')
    )

    expect(mockProgramRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    })
  })
})
