import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Program } from '../entities/Program'
import { Activity } from '../entities/Activity'
import { Participation } from '../entities/Participation'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3307,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'namu_wellness',

  synchronize: false,
  entities: [Program, Activity, Participation],
})
