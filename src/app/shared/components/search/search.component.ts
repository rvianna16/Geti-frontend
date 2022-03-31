import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
  <mat-form-field appearance="outline" class="w-full">
    <mat-label>{{ label }}</mat-label>
    <input matInput [(ngModel)]="valorInput" (input)="buscar()">
    <mat-icon matSuffix class="text-primary">search</mat-icon>
  </mat-form-field>
  `,
})
export class SearchComponent implements OnInit {
  @Input() label:string = 'Buscar'
  valorInput: string = '';
  @Output() onSearch = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  buscar(){
    this.onSearch.emit(this.valorInput);
  }
}
