import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
  <button
    (click)="onClick.emit($event)"
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

  @Output()
  onClick = new EventEmitter<Event>()

  @Input()
  type: string = 'primary';

  @Input()
  disabled: boolean = false;

  @Input()
  paddingY: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get classes(): string[] {
    const paddingY = this.paddingY ? 'py-1' : '';
    return ['mr-2', `button-${this.type}`, paddingY];
  }

}
