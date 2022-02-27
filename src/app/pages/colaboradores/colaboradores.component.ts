import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Colaborador } from './models/colaborador';

const ELEMENT_DATA: Colaborador[] = [
  {nome: 'Rodrigo Vianna', email: "rodrigo.silva@teste.com.br"},
  {nome: 'ATeste', email: "teste@teste.com.br"},
  {nome: 'BTeste', email: "Beste@teste.com.br"},
];


@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
})

export class ColaboradoresComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'acoes'];
  colaboradoresDataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  test(event: any) {
    console.log(event)
  }

  @ViewChild(MatSort) sort!: MatSort;

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.colaboradoresDataSource.sort = this.sort;
  }
}
