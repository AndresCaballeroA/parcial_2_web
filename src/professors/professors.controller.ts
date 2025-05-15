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
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Controller('profesores')
export class ProfessorsController {
  constructor(private readonly srv: ProfessorsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateProfessorDto) {
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

  @Put(':id/asignar-evaluador/:proyectoId')
  assign(
    @Param('id', ParseIntPipe) id: number,
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
  ) {
    return this.srv.assignAsEvaluator(id, proyectoId);
  }
}
