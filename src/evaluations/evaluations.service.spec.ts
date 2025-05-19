import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluationsService } from './evaluations.service';
import { Evaluation } from './evaluation.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { ProfessorsService } from '../professors/professors.service';

const mockProjectsService = {
  findOne: jest.fn().mockResolvedValue({ id: 1, notaFinal: null }),
  repo: { save: jest.fn() },
};

const mockProfessorsService = {
  findOne: jest.fn().mockResolvedValue({ id: 2, esParEvaluador: true }),
};

describe('EvaluationsService', () => {
  let service: EvaluationsService;

  beforeEach(async () => {
    
    const mockRepoSave = jest.fn().mockImplementation((e: Evaluation) => {
      if (e.calificacion > 5) throw new Error('Calificación fuera de rango');
      return { id: 1 };
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationsService,
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: ProfessorsService, useValue: mockProfessorsService },
        {
          provide: getRepositoryToken(Evaluation),
          useValue: {
            create: jest.fn((d) => d),
            save: mockRepoSave,
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationsService>(EvaluationsService);
  });

  it('crea evaluación válida (positivo)', async () => {
    const dto = {
      proyectoId: 1,
      profesorId: 2,
      calificacion: 4,
      comentario: 'Bien',
    };
    const res = await service.create(dto as any);
    expect(res.id).toBe(1);
  });

  it('rechaza calificación > 5 (negativo)', async () => {
    await expect(
      service.create({
        proyectoId: 1,
        profesorId: 2,
        calificacion: 6,
      } as any),
    ).rejects.toThrow(/Calificación fuera de rango/);
  });
});
