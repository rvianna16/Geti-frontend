import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';

import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { ModalNovoColaboradorComponent } from './modais/modal-novo-colaborador/modal-novo-colaborador.component';
import { Colaborador } from './models/colaborador';
import { ColaboradoresService } from './services/colaboradores.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
})

export class ColaboradoresComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'opcoes'];
  colaboradoresDataSource = new MatTableDataSource<Colaborador>();
  @ViewChild('table') table!: ElementRef;

  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private colaboradoresService: ColaboradoresService,
    private notificacoesService: NotificacoesService,
    public dialog: MatDialog
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

  obterColaboradores(filtro = ''){
    this.colaboradoresService.obterColaboradores(filtro).subscribe((res: Colaborador[]) => {
      this.colaboradoresDataSource = new MatTableDataSource(res);
      this.colaboradoresDataSource.sort = this.sort;
    })
  }

  adicionarColaborador(){
    const dialogRef = this.dialog.open(ModalNovoColaboradorComponent, {
      width: '680px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.obterColaboradores();
      }
    });
  }

  excluirColaborador(colaborador: Colaborador){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o colaborador ${colaborador.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.colaboradoresService.excluirColaborador(colaborador.id).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Colaborador exclu??do com sucesso!');
            this.obterColaboradores();
          },
          (error) => {
            if(error.status == 400){
              this.notificacoesService.notificarErro(error.error.errors[0]);
            }else {
              this.notificacoesService.notificarErro('N??o foi possivel excluir o colaborador. Tente novamente mais tarde.');
            }
          });
      }
   });
  }

  editarColaborador(colaborador: Colaborador){
    const navigationExtras: NavigationExtras = {
      state: {
        id: colaborador.id
      }
    }

    this.router.navigate(['colaboradores/editar'], {state: navigationExtras});
  }

  exportAsExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Colaboradores');

    /* save to file */
    XLSX.writeFile(wb, 'colaboradores.xlsx');
    }
}
