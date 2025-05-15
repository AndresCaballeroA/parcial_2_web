import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Professor } from '../professors/professor.entity';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 2, scale: 1 })
  calificacion: number;

  @Column({ nullable: true })
  comentario: string;

  @ManyToOne(() => Project, (p) => p.evaluaciones, { eager: true })
  proyecto: Project;

  @ManyToOne(() => Professor, (p) => p.evaluaciones, { eager: true })
  profesor: Professor;
}
