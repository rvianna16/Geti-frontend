import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-invalid-state',
  template: `<span *ngIf="error">{{ mensagem }}</span>`,
})
export class InvalidStateComponent implements OnInit {
  @Input()
  control!: FormControl;

  @Input()
  fieldName!: string;

  error: string = '';

  constructor() {

  }

  ngOnInit(){
    this.getError();

    this.control.valueChanges.subscribe((res) => {
      this.getError();
    })
  }

  getError(){
    this.error = '';

    for(let erro in this.control.errors){
      this.error = erro;
    }
  }

  get mensagem() {
    const VALIDATION_MESSAGES = {
      required: `${this.fieldName} deve ser preenchido`,
      minlength: `${this.fieldName} deve ter no mínimo ${Object.values(this.control.errors![this.error])[0]} caracteres`,
      maxlength: `${this.fieldName} deve ter no máximo ${Object.values(this.control.errors![this.error])[0]} caracteres`,
      email: `${this.fieldName} deve ser válido`,
      incorrect: `Selecione um ${this.fieldName} válido`
    }

    return (VALIDATION_MESSAGES as any)[this.error];
  }





}
