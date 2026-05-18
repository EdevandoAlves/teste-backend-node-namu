import { ProgramCategory } from '../entities/Program'
import { CreateProgramData } from '../schemas/program.schema'
import { ProgramService } from '../services/program.service'
import { AppError } from '../errors/AppError'

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
}

jest.mock('../database/data-source', () => ({
  AppDataSource: {
    getRepository: () => mockRepository,
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

    mockRepository.create.mockReturnValue(createdProgram)

    mockRepository.save.mockResolvedValue(createdProgram)

    const result = await service.createProgram(data)

    expect(mockRepository.create).toHaveBeenCalledWith(data)
    expect(mockRepository.save).toHaveBeenCalledWith(createdProgram)
    expect(result).toEqual(createdProgram)
  })

  it('should throw AppError when program already exists', async () => {
    mockRepository.findOne.mockResolvedValue(data)

    await expect(service.createProgram(data)).rejects.toThrow(
      new AppError('Program already exists')
    )
    expect(mockRepository.findOne).toHaveBeenCalledWith({
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

    mockRepository.findAndCount.mockResolvedValue([programsMock, total])

    const result = await service.listProgram(pagination.page, pagination.limit)

    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
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
})
