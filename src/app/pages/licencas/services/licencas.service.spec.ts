import { TestBed } from '@angular/core/testing';

import { LicencasService } from './licencas.service';

describe('LicencasService', () => {
  let service: LicencasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicencasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
