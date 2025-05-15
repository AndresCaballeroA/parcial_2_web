import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor) private readonly repo: Repository<Professor>,
  ) {}

  create(dto: CreateProfessorDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException('Profesor no encontrado');
    });
  }

  async assignAsEvaluator(profId: number, projectId: number) {
    const prof = await this.findOne(profId);
    if (!prof.esParEvaluador) {
      throw new BadRequestException('Profesor no es par evaluador');
    }
    if (prof.evaluaciones?.length >= 3) {
      throw new BadRequestException('Profesor ya tiene 3 evaluaciones activas');
    }
    // la lógica real se implementa en EvaluationsService al crear evaluación
    return prof;
  }
}
