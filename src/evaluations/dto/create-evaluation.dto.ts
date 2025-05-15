import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class CreateEvaluationDto {
  @IsInt()
  proyectoId: number;

  @IsInt()
  profesorId: number;

  @Min(0)
  @Max(5)
  calificacion: number;

  @IsOptional()
  @IsString()
  comentario?: string;
}
