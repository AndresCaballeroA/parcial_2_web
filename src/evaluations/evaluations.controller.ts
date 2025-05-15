import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';

@Controller('evaluaciones')
export class EvaluationsController {
  constructor(private readonly srv: EvaluationsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateEvaluationDto) {
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
}
