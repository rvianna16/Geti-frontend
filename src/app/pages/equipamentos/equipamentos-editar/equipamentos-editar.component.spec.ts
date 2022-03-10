import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentosEditarComponent } from './equipamentos-editar.component';

describe('EquipamentosEditarComponent', () => {
  let component: EquipamentosEditarComponent;
  let fixture: ComponentFixture<EquipamentosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentosEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
