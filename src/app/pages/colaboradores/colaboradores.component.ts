import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { Colaborador } from './models/colaborador';
import { ColaboradoresService } from './service/colaboradores.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
})

export class ColaboradoresComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'acoes'];
  colaboradoresDataSource: any = new MatTableDataSource();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private colaboradoresService: ColaboradoresService,
    private notificacoesService: NotificacoesService
    ) {}


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
    this.obterColaboradores();
  }

  obterColaboradores(){
    this.colaboradoresService.obterColaboradores().subscribe((res: Colaborador[]) => {
      this.colaboradoresDataSource = new MatTableDataSource(res);
      this.colaboradoresDataSource.sort = this.sort;
    })
  }
}
