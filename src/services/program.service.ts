import { AppDataSource } from '../database/data-source'
import { Program } from '../entities/Program'
import { CreateProgramData, UpdateProgramData } from '../schemas/program.schema'
import { AppError } from '../errors/AppError'
import { Not } from 'typeorm'

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
      take: limit,
    })

    return {
      data: programs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async updateProgram(id: number, data: UpdateProgramData) {
    const program = await this.programRepo.findOne({
      where: { id },
    })

    if (!program) {
      throw new AppError('Program not found', 404)
    }

    if (data.name) {
      const existingProgram = await this.programRepo.findOne({
        where: {
          name: data.name,
          id: Not(id),
        },
      })

      if (existingProgram) {
        throw new AppError('Program already exists', 400)
      }
    }

    Object.assign(program, data)

    return this.programRepo.save(program)
  }

  async deleteProgram(id: number) {
    const program = await this.programRepo.findOne({
      where: { id },
    })

    if (!program) {
      throw new AppError('Program not found', 404)
    }

    return await this.programRepo.delete(id)
  }

  async summary() {}
}
