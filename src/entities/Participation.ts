import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Activity } from './Activity'

@Entity('participations')
export class Participation {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  user_name!: string

  @Column()
  activity_id!: number

  @ManyToOne(() => Activity, (activity) => activity.participations)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity

  @CreateDateColumn()
  completed_at!: Date

  @Column({ type: 'text', nullable: true })
  notes!: string
}
