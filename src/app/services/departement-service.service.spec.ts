import { TestBed } from '@angular/core/testing';

import { DepartementServiceService } from './departement-service.service';

describe('DepartementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartementServiceService = TestBed.get(DepartementServiceService);
    expect(service).toBeTruthy();
  });
});
