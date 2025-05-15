import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private readonly repo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto) {
    if (dto.promedio < 3.2) {
      throw new BadRequestException('Promedio mínimo requerido: 3.2');
    }
    const exists = await this.repo.findOneBy({ cedula: dto.cedula });
    if (exists) throw new BadRequestException('Cédula duplicada');
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException('Estudiante no encontrado');
    });
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    if (student.proyectosLed?.length) {
      throw new BadRequestException('El estudiante lidera proyectos activos');
    }
    await this.repo.remove(student);
    return student;
  }
}
