import { Program, ProgramCategory } from '../entities/Program'
import { CreateProgramData } from '../schemas/program.schema'
import { ProgramService } from '../services/program.service'
import { AppError } from '../errors/AppError'
import { Activity } from '../entities/Activity'
import { Participation } from '../entities/Participation'

const mockProgramRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
}

const mockActivityRepository = {
  count: jest.fn(),
}

const mockParticipationRepository = {
  createQueryBuilder: jest.fn(),
}

const mockQueryBuilder = {
  innerJoin: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  getCount: jest.fn(),
  getRawMany: jest.fn(),
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

      if (entity === Participation) {
        return mockParticipationRepository
      }
    },
  },
}))

describe('Program Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const service = new ProgramService()

  const data: CreateProgramData = {
    name: 'Program test',
    description: 'Description test',
    category: ProgramCategory.EXERCICIO,
    duration_weeks: 4,
  }

  it('should create a program', async () => {
    const createdProgram = {
      id: 1,
      ...data,
    }

    mockProgramRepository.create.mockReturnValue(createdProgram)

    mockProgramRepository.save.mockResolvedValue(createdProgram)

    const result = await service.createProgram(data)

    expect(mockProgramRepository.create).toHaveBeenCalledWith(data)
    expect(mockProgramRepository.save).toHaveBeenCalledWith(createdProgram)
    expect(result).toEqual(createdProgram)
  })

  it('should throw AppError when program already exists', async () => {
    mockProgramRepository.findOne.mockResolvedValue(data)

    await expect(service.createProgram(data)).rejects.toThrow(
      new AppError('Program already exists')
    )
    expect(mockProgramRepository.findOne).toHaveBeenCalledWith({
      where: {
        name: data.name,
      },
    })
  })

  it('should list programs', async () => {
    const pagination = {
      page: 1,
      limit: 10,
    }

    const programsMock = [
      {
        id: 1,
        name: 'Program test 1',
        description: 'Description test 1',
        category: ProgramCategory.EXERCICIO,
        duration_weeks: 2,
      },
      {
        id: 2,
        name: 'Program test 2',
        description: 'Description test 2',
        category: ProgramCategory.NUTRICAO,
        duration_weeks: 3,
      },
    ]

    const total = 2

    mockProgramRepository.findAndCount.mockResolvedValue([programsMock, total])

    const result = await service.listProgram(pagination.page, pagination.limit)

    expect(mockProgramRepository.findAndCount).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    })

    expect(result).toEqual({
      data: programsMock,
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(total / pagination.limit),
    })
  })

  it('should return program summary', async () => {
    mockActivityRepository.count.mockResolvedValue(4)

    mockParticipationRepository.createQueryBuilder.mockReturnValue(
      mockQueryBuilder
    )

    mockQueryBuilder.getCount.mockResolvedValue(20)

    mockQueryBuilder.getRawMany.mockResolvedValue([
      {
        user_name: 'user test 1',
        total: 7,
      },
      {
        user_name: 'user test 2',
        total: 4,
      },
    ])

    const result = await service.summary(1)

    expect(mockActivityRepository.count).toHaveBeenCalledWith({
      where: { program_id: 1 },
    })
    expect(mockParticipationRepository.createQueryBuilder).toHaveBeenCalledWith(
      'participation'
    )
    expect(result).toEqual({
      totalActivities: 4,
      totalParticipations: 20,
      topParticipants: [
        {
          user_name: 'user test 1',
          total: 7,
        },
        {
          user_name: 'user test 2',
          total: 4,
        },
      ],
    })
  })
})
