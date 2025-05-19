import { Exclude } from 'class-transformer';
import { Student } from '../student.entity';

export class StudentDto extends Student {
  @Exclude()
  proyectosLed: any = undefined;
}
