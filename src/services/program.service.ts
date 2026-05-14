import { AppDataSource } from '../database/data-source'
import { Program } from '../entities/Program'
import { CreateProgramData } from '../schemas/program.schema'
import { AppError } from '../errors/AppError'

export class ProgramService {
  private programRepo = AppDataSource.getRepository(Program)

  async createProgram(data: CreateProgramData) {
    const existingProgram = await this.programRepo.findOne({
      where: {
        name: data.name,
      },
    })

    if (existingProgram) {
      throw new AppError('Program already exists', 400)
    }

    const program = this.programRepo.create(data)
    await this.programRepo.save(program)

    return program
  }

  async listProgram(page?: number, limit?: number) {
    page = page ?? 1
    limit = limit ?? 10

    const [programs, total] = await this.programRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    })

    return {
      data: programs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}
