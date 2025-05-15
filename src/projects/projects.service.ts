import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { StudentsService } from '../students/students.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly repo: Repository<Project>,
    private readonly studentsSrv: StudentsService,
  ) {}

  async create(dto: CreateProjectDto) {
    const lider = await this.studentsSrv.findOne(dto.liderId);
    const project = this.repo.create({ ...dto, lider });
    return this.repo.save(project);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException('Proyecto no encontrado');
    });
  }

  async advance(id: number) {
    const project = await this.findOne(id);
    if (project.estado >= 4) {
      throw new BadRequestException('Proyecto ya finalizado');
    }
    project.estado++;
    return this.repo.save(project);
  }

  listStudents(id: number) {
    return this.repo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.lider', 'lider')
      .where('p.id = :id', { id })
      .select(['lider'])
      .getOneOrFail()
      .then((p) => [p.lider]);
  }
}
