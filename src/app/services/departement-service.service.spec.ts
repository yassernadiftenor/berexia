import { TestBed } from '@angular/core/testing';

import { EmployeeServiceService } from './departement-service.service';

describe('DepartementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeServiceService = TestBed.get(EmployeeServiceService);
    expect(service).toBeTruthy();
  });
});
