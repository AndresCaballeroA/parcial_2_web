import { IsInt, IsString, Length, IsBoolean } from 'class-validator';

export class CreateProfessorDto {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;

  @IsString()
  departamento: string;

  @IsInt()
  @Length(5, 5)
  extension: number;

  @IsBoolean()
  esParEvaluador: boolean;
}
