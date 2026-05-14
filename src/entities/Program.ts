import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Activity } from './Activity'

export enum ProgramCategory {
  MEDITACAO = 'meditação',
  EXERCICIO = 'exercício',
  NUTRICAO = 'nutrição',
}

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column('text')
  description!: string

  @Column({
    type: 'enum',
    enum: ProgramCategory,
  })
  category!: ProgramCategory

  @Column()
  duration_weeks!: number

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @OneToMany(() => Activity, (activity) => activity.program)
  activities!: Activity[]
}
