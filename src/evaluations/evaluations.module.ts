import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';
import { Evaluation } from './evaluation.entity';
import { ProjectsModule } from '../projects/projects.module';
import { ProfessorsModule } from '../professors/professors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluation]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => ProfessorsModule),
  ],
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
})
export class EvaluationsModule {}
