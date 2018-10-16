import { TestBed } from '@angular/core/testing';

import { ComunicationsService } from './comunications.service';

describe('ComunicationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComunicationsService = TestBed.get(ComunicationsService);
    expect(service).toBeTruthy();
  });
});
