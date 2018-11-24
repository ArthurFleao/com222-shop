import { TestBed } from '@angular/core/testing';

import { LivrosServiceService } from './livros-service.service';

describe('LivrosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivrosServiceService = TestBed.get(LivrosServiceService);
    expect(service).toBeTruthy();
  });
});
