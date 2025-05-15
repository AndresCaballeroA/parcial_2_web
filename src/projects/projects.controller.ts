import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('proyectos')
export class ProjectsController {
  constructor(private readonly srv: ProjectsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateProjectDto) {
    return this.srv.create(dto);
  }

  @Get()
  findAll() {
    return this.srv.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.srv.findOne(id);
  }

  @Put(':id/avanzar')
  advance(@Param('id', ParseIntPipe) id: number) {
    return this.srv.advance(id);
  }

  @Get(':id/estudiantes')
  listStudents(@Param('id', ParseIntPipe) id: number) {
    return this.srv.listStudents(id);
  }
}
