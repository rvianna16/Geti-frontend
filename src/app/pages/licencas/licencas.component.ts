import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';

import { Licenca } from './models/licencas';
import { LicencasService } from './services/licencas.service';

@Component({
  selector: 'app-licencas',
  templateUrl: './licencas.component.html'
})

export class LicencasComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'chave', 'software', 'quantidade', 'disponivel', 'ativo', 'opcoes'];
  licencasDataSource: any = new MatTableDataSource();
  licencas: Licenca[] = [];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private licencasService: LicencasService,
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
    this.obterLicencas();
  }

  obterLicencas(){
    this.licencasService.obterLicencas().subscribe((res: Licenca[]) => {
      this.licencas = res;
      this.licencasDataSource = new MatTableDataSource(this.licencas);
      this.licencasDataSource.sort = this.sort;
    })
  }

  adicionarLicenca(){
    this.router.navigate(['licencas/novo']);
  }

  editarLicenca(licenca: Licenca){
    const navigationExtras: NavigationExtras = {
      state: {
        id: licenca.id
      }
    }
    this.router.navigate(['licencas/editar'], {state: navigationExtras});
  }

  excluirLicenca(licenca: Licenca){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir a licença ${licenca.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.licencasService.excluirLicenca(licenca.id).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Licença excluída com sucesso!');
            this.obterLicencas();
          },
          (error) => {
            if(error.status == 400){
              this.notificacoesService.notificarErro(error.error.errors[0]);
            }else {
              this.notificacoesService.notificarErro('Não foi possivel excluir a licença. Tente novamente mais tarde.');
            }
          });
      }
   });
  }
}

