import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

describe('StudentsService', () => {
  let service: StudentsService;
  let repo: jest.Mocked<Repository<Student>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            create: jest.fn().mockImplementation((d) => d),
            save: jest.fn().mockResolvedValue({ id: 1 }),
            findOneBy: jest.fn().mockResolvedValue(null),
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repo = module.get(getRepositoryToken(Student));
  });

  it('should create a student (positive)', async () => {
    const dto = {
      cedula: 1,
      nombre: 'Alan',
      semestre: 5,
      promedio: 4,
      programa: 'ISI',
    };
    const res = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
    expect(res.id).toBe(1);
  });

  it('should reject average below 3.2 (negative)', async () => {
    await expect(
      service.create({ nombre: 'Bad', promedio: 2.5 } as any),
    ).rejects.toThrow();
  });
});
