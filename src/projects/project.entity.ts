import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Student } from '../students/student.entity';
import { Professor } from '../professors/professor.entity';
import { Evaluation } from '../evaluations/evaluation.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column('decimal')
  presupuesto: number;

  @Column({ type: 'date' })
  fechaInicio: string;

  @Column({ type: 'date' })
  fechaFin: string;

  @Column({ default: 0 })
  estado: number; // 0..4

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  notaFinal: number;

  @ManyToOne(() => Student, (s) => s.proyectosLed, { eager: true })
  lider: Student;

  @ManyToOne(() => Professor, (p) => p.mentorias, {
    eager: true,
    nullable: true,
  })
  mentor: Professor;

  @OneToMany(() => Evaluation, (e) => e.proyecto)
  evaluaciones: Evaluation[];
}
