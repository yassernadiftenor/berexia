import { TestBed } from '@angular/core/testing';

import { ExelService } from './exel.service';

describe('ExelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExelService = TestBed.get(ExelService);
    expect(service).toBeTruthy();
  });
});
