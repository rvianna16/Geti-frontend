import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { Equipamento } from './models/equipamento';

import { EquipamentosService } from './services/equipamentos.service';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html'
})

export class EquipamentosComponent implements OnInit {
  displayedColumns: string[] = ['patrimonio', 'nomeColaborador', 'tipoEquipamento', 'dataAquisicao', 'statusEquipamento', 'opcoes'];
  equipamentosDataSource = new MatTableDataSource<Equipamento>();
  equipamentos: Equipamento[] = [];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private equipamentosService: EquipamentosService,
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
    this.obterEquipamentos();
  }

  obterEquipamentos(filtro = ''){
    this.equipamentosService.obterEquipamentos(filtro).subscribe((res: Equipamento[]) => {
      this.equipamentos = res;
      this.equipamentosDataSource = new MatTableDataSource(this.equipamentos);
      this.equipamentosDataSource.sort = this.sort;
    });
  }

  handleStatusEquipamento(equipamento: Equipamento) {
    if(equipamento.statusEquipamento == 'EmUso'){
      return 'Em Uso'
    }else if(equipamento.statusEquipamento == 'EmDescarte') {
      return 'Em Descarte'
    }
    return equipamento.statusEquipamento
  }

  adicionarEquipamento(){
    this.router.navigate(['equipamentos/novo']);
  }

  editarEquipamento(equipamento: Equipamento){
    const navigationExtras: NavigationExtras = {
      state: {
        id: equipamento.id
      }
    }
    this.router.navigate(['equipamentos/editar'], {state: navigationExtras});
  }

  excluirEquipamento(equipamento: Equipamento){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o equipamento ${equipamento.patrimonio} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.equipamentosService.excluirEquipamento(equipamento.id).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Equipamento excluído com sucesso!');
            this.obterEquipamentos();
          },
          (error) => {
            if(error.status == 400){
              this.notificacoesService.notificarErro(error.error.errors[0]);
            }else {
              this.notificacoesService.notificarErro('Não foi possivel excluir o equipamento. Tente novamente mais tarde.');
            }
          });
      }
   });
  }
}
