import {
  IsString,
  MinLength,
  IsNumber,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(15)
  titulo: string;

  @IsString()
  area: string;

  @IsNumber()
  presupuesto: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsInt()
  liderId: number;
}
