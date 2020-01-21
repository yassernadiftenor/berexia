import { TestBed } from '@angular/core/testing';

import { UtilisateurServiceService } from './utilisateur-service.service';

describe('UtilisateurServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilisateurServiceService = TestBed.get(UtilisateurServiceService);
    expect(service).toBeTruthy();
  });
});
