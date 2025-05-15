import { IsInt, Min, Max, IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;

  @IsInt()
  @Min(4)
  semestre: number;

  @IsString()
  programa: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(5)
  promedio: number;
}
