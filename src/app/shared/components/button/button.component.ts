import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
  <button
    mat-raised-button
    [ngClass]="classes"
    [disabled]="disabled">
    <mat-icon *ngIf="icon" class="text-light mr-2">{{ icon }}</mat-icon>
     {{ label }}
    </button>`
})
export class ButtonComponent implements OnInit {
  @Input()
  label:string = 'Salvar'
  @Input()
  icon!: string;

  @Input()
  type: string = 'primary';

  @Input()
  disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get classes(): string[] {
    return ['mr-2', `button-${this.type}`];
  }

}
