import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovoColaboradorComponent } from './modal-novo-colaborador.component';

describe('ModalNovoColaboradorComponent', () => {
  let component: ModalNovoColaboradorComponent;
  let fixture: ComponentFixture<ModalNovoColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNovoColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNovoColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
