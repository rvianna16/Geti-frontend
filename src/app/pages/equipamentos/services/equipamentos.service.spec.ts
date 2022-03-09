import { TestBed } from '@angular/core/testing';

import { EquipamentosService } from './equipamentos.service';

describe('EquipamentosService', () => {
  let service: EquipamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
