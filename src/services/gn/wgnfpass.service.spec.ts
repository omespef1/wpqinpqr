import { TestBed } from '@angular/core/testing';

import { WgnfpassService } from './wgnfpass.service';

describe('WgnfpassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WgnfpassService = TestBed.get(WgnfpassService);
    expect(service).toBeTruthy();
  });
});
