/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfessorsService } from './professors.service';

describe('Service: Professors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorsService],
    });
  });

  it('should ...', inject([ProfessorsService], (service: ProfessorsService) => {
    expect(service).toBeTruthy();
  }));
});
