import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Program } from "./Program"
import { Participation } from "./Participation"

export enum DayOfWeek {
  SEGUNDA = "segunda",
  TERCA = "terça",
  QUARTA = "quarta",
  QUINTA = "quinta",
  SEXTA = "sexta",
  SABADO = "sábado",
  DOMINGO = "domingo"
}

@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  program_id!: number

  @ManyToOne(() => Program, (program) => program.activities)
  @JoinColumn({ name: "program_id" })
  program!: Program

  @Column()
  title!: string

  @Column("text")
  description!: string

  @Column({
    type: "enum",
    enum: DayOfWeek
  })
  day_of_week!: DayOfWeek

  @Column()
  duration_minutes!: number

  @OneToMany(() => Participation, (participation) => participation.activity)
  participations!: Participation[]
}
