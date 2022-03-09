import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresEditarComponent } from './colaboradores-editar.component';

describe('ColaboradoresEditarComponent', () => {
  let component: ColaboradoresEditarComponent;
  let fixture: ComponentFixture<ColaboradoresEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradoresEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradoresEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
