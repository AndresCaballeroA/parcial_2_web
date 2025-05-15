import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { ProjectsService } from '../projects/projects.service';
import { ProfessorsService } from '../professors/professors.service';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation) private readonly repo: Repository<Evaluation>,
    private readonly projectsSrv: ProjectsService,
    private readonly professorsSrv: ProfessorsService,
  ) {}

  async create(dto: CreateEvaluationDto) {
    const proyecto = await this.projectsSrv.findOne(dto.proyectoId);
    const profesor = await this.professorsSrv.findOne(dto.profesorId);

    if (proyecto.mentor?.id === profesor.id) {
      throw new BadRequestException('El mentor no puede evaluarse a sí mismo');
    }

    if (
      profesor.evaluaciones?.filter((e) => e.proyecto.id === proyecto.id)
        .length > 0
    ) {
      throw new BadRequestException('Profesor ya evaluó este proyecto');
    }

    const evaluation = this.repo.create({
      calificacion: dto.calificacion,
      comentario: dto.comentario,
      proyecto,
      profesor,
    });
    const saved = await this.repo.save(evaluation);

    // actualizar nota final del proyecto (promedio simple)
    const califs = await this.repo.find({
      where: { proyecto: { id: proyecto.id } },
    });
    const avg =
      califs.reduce((acc, e) => acc + Number(e.calificacion), 0) /
      califs.length;
    proyecto.notaFinal = Number(avg.toFixed(2));
    await this.projectsSrv['repo'].save(proyecto);
    return saved;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException('Evaluación no encontrada');
    });
  }
}
