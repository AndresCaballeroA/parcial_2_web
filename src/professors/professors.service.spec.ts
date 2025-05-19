import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessorsService } from './professors.service';
import { Professor } from './professor.entity';
import { Repository } from 'typeorm';

describe('ProfessorsService', () => {
  let service: ProfessorsService;
  let repo: jest.Mocked<Repository<Professor>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorsService,
        {
          provide: getRepositoryToken(Professor),
          useValue: {
            create: jest.fn().mockImplementation((d) => d), 
            save: jest.fn().mockResolvedValue({ id: 1 }),
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfessorsService>(ProfessorsService);
    repo = module.get(getRepositoryToken(Professor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a professor (positive)', async () => {
    const dto = {
      cedula: 123,
      nombre: 'Ada',
      departamento: 'Sistemas',
      extension: 12345,
      esParEvaluador: true,
    };
    const result = await service.create(dto);
    expect(repo.save).toHaveBeenCalledWith(expect.objectContaining(dto));
    expect(result.id).toBe(1);
  });

  it('fails when extension is invalid (negative)', async () => {
    await expect(
      service.create({ ...{ nombre: 'Bob' }, extension: 12 } as any),
    ).rejects.toThrow();
  });
});
