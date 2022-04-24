import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';

import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { ModalNovoSoftwareComponent } from './modais/modal-novo-software/modal-novo-software.component';
import { Software } from './models/software';
import { SoftwaresService } from './services/softwares.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-softwares',
  templateUrl: './softwares.component.html'
})

export class SoftwaresComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'opcoes'];
  softwaresDataSource = new MatTableDataSource<Software>();
  softwares: Software[] = [];
  @ViewChild('table') table!: ElementRef;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private softwaresService: SoftwaresService,
    private dialog: MatDialog,
    private notificacoesService: NotificacoesService
  ) { }

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
    this.obterSoftwares();
  }

  obterSoftwares(filtro = ''){
    this.softwaresService.obterSoftwares(filtro).subscribe((res: Software[]) => {
      this.softwares = res;
      this.softwaresDataSource = new MatTableDataSource(this.softwares);
      this.softwaresDataSource.sort = this.sort;
    });
  }

  adicionarSoftware(){
    const dialogRef = this.dialog.open(ModalNovoSoftwareComponent, {
      width: '680px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.obterSoftwares();
      }
    });
  }

  excluirSoftware(software: Software){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o software ${software.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.softwaresService.excluirSoftware(software.id).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Software excluído com sucesso!');
            this.obterSoftwares();
          },
          (error) => {
            if(error.status == 400){
              this.notificacoesService.notificarErro(error.error.errors[0]);
            }else {
              this.notificacoesService.notificarErro('Não foi possivel excluir o software. Tente novamente mais tarde.');
            }
          });
      }
   });
  }

  editarSoftware(software: Software) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: software.id
      }
    }
    this.router.navigate(['softwares/editar'], {state: navigationExtras})
  }

  exportAsExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Softwares');

    /* save to file */
    XLSX.writeFile(wb, 'softwares.xlsx');
    }
}
