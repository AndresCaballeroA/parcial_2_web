import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';

const mockStudentsService = {
  findOne: jest.fn().mockResolvedValue({ id: 1, nombre: 'Ada' }),
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo: jest.Mocked<Repository<Project>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: StudentsService, useValue: mockStudentsService },
        {
          provide: getRepositoryToken(Project),
          useValue: {
            create: jest.fn((d) => d),
            save: jest.fn().mockImplementation((p: Project) => {
              if (p.presupuesto <= 0) throw new Error('Presupuesto inválido');
              return { id: 1, estado: 0 };
            }),
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn().mockResolvedValue({ id: 1, estado: 0 }),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repo = module.get(getRepositoryToken(Project));
  });

  it('crea proyecto válido (positivo)', async () => {
    const dto = {
      titulo: 'Proyecto de IA muy interesante',
      area: 'IA',
      presupuesto: 1000,
      fechaInicio: '2025-01-01',
      fechaFin: '2025-02-01',
      liderId: 1,
    };
    const res = await service.create(dto as any);
    expect(repo.save).toHaveBeenCalled();
    expect(res.id).toBe(1);
  });

  it('rechaza presupuesto 0 (negativo)', async () => {
    await expect(
      service.create({ presupuesto: 0 } as any),
    ).rejects.toThrow(/Presupuesto inválido/);
  });
});
