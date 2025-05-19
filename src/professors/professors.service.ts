import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ProfessorsService {
  constructor(@InjectRepository(Professor) private readonly repo: Repository<Professor>) {}

  
  async create(dto: CreateProfessorDto): Promise<Professor> {
    const ext = dto.extension?.toString() ?? '';
    if (ext.length !== 5) {
      throw new BadRequestException('La extensión debe tener 5 dígitos');
    }
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
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
    
    return prof;
  }
}
