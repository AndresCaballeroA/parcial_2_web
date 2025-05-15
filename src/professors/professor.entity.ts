import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Evaluation } from '../evaluations/evaluation.entity';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column()
  extension: number;

  @Column()
  esParEvaluador: boolean;

  @OneToMany(() => Project, (p) => p.mentor)
  mentorias: Project[];

  @OneToMany(() => Evaluation, (e) => e.profesor)
  evaluaciones: Evaluation[];
}
