import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Program } from '../entities/Program'
import { Activity } from '../entities/Activity'
import { Participation } from '../entities/Participation'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT)!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  charset: 'utf8mb4',

  synchronize: false,
  entities: [Program, Activity, Participation],
})
