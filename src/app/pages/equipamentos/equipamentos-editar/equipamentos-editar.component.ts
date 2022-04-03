import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Location } from '@angular/common';

import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { Colaborador } from '../../colaboradores/models/colaborador';
import { ColaboradoresService } from '../../colaboradores/services/colaboradores.service';
import { statusEquipamento } from '../data/status-equipamento';
import { tipoEquipamento } from '../data/tipo-equipamento';
import { Equipamento } from '../models/equipamento';
import { EquipamentosService } from '../services/equipamentos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalVincularLicencaComponent } from '../modais/modal-vincular-licenca/modal-vincular-licenca.component';
import { Licenca } from '../../licencas/models/licencas';
import { LicencasService } from '../../licencas/services/licencas.service';

@Component({
  selector: 'app-equipamentos-editar',
  templateUrl: './equipamentos-editar.component.html',
})

export class EquipamentosEditarComponent implements OnInit {
  equipamentoId: string = '';
  equipamento!: Equipamento;
  equipamentoForm!: FormGroup;
  tipoEquipamento: string[] = tipoEquipamento;
  statusEquipamento: any[] = statusEquipamento;

  colaboradores: Colaborador[] = [];
  colaboradoresFiltrados!: Observable<Colaborador[]>;

  displayedColumns: string[] = ['nome', 'chave', 'software', 'excluir'];
  licencasDataSource: any = new MatTableDataSource();

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private colaboradoreService: ColaboradoresService,
    private equipamentosService: EquipamentosService,
    private licencasService: LicencasService,
    private notificacoesService: NotificacoesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.equipamentoId = history.state.state?.id

    if(this.router.url == '/equipamentos/editar' && !this.equipamentoId){
      this.voltar();
    }

    this.inicializador();
  }

  inicializador(){
    this.inicializarFormulario();
    this.obterColaboradores();

    if(this.equipamentoId){
      this.obterEquipamentoDetalhes();
    }
  }

  inicializarFormulario(){
    this.equipamentoForm = this.fb.group({
      patrimonio: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      tipoEquipamento: [null, [Validators.required]],
      dataAquisicao: [null, [Validators.required]],
      notaFiscal: [null],
      statusEquipamento: [null, [Validators.required]],
      colaboradorId: [null, [Validators.required]],
      modelo: [null, [Validators.maxLength(30)]],
      processador: [null, [Validators.maxLength(100)]],
      armazenamento: [null, [Validators.maxLength(100)]],
      memoria: [null, Validators.maxLength(30)],
      ip: [null, [Validators.maxLength(30)]],
      descricao: [null, [Validators.maxLength(4000)]]
    })
  }

  obterEquipamentoDetalhes(){
    this.equipamentosService.obterEquipamentoDetalhes(this.equipamentoId).subscribe((equipamento: Equipamento) => {
      this.equipamento = equipamento;
      this.equipamentoForm.patchValue(equipamento);
      this.licencasDataSource = new MatTableDataSource(equipamento.licencas);

      //Vínculo do Colaborador ID-Nome para exibição do AutoComplete
      const colaborador = {
        id: this.equipamento.colaboradorId,
        nome: this.equipamento.nomeColaborador
      }

      this.equipamentoForm.controls['colaboradorId'].patchValue(colaborador)
    },
    (error) => {
      this.notificacoesService.notificarErro('Não foi possível carregar o equipamento, tente novamente mais tarde.')
      this.voltar();
    })
  }

  obterColaboradores(){
    this.colaboradoreService.obterColaboradores().subscribe((res: Colaborador[]) => {
      this.colaboradores = res;
      this.setupAutoComplete();
    });
  }

  setupAutoComplete(){
    this.colaboradoresFiltrados = this.equipamentoForm.controls['colaboradorId'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nome)),
      map(nome => (nome ? this._filter(nome) : this.colaboradores.slice())),
    );
  }

  private _filter(nome: string): Colaborador[] {
    const filterValue = nome.toLowerCase();

    return this.colaboradores.filter(colaborador => colaborador.nome.toLowerCase().includes(filterValue));
  }

  displayFn(colaborador: Colaborador): string {
    if(colaborador){
      return colaborador.nome
    }

    return ''
  }

  salvarEquipamento(){
    this.equipamentosService.salvarEquipamento(this.equipamentoObjeto).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Equipamento salvo com sucesso!')
        this.voltar();
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel adicionar o equipamento. Tente novamente mais tarde.');
        }
      }
    )
  }

  alterarEquipamento(){
    const equipamento = this.equipamentoObjeto;
    equipamento.Id = this.equipamentoId;

    this.equipamentosService.alterarEquipamento(this.equipamentoId, equipamento).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Equipamento alterado com sucesso!')
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel alterar o equipamento. Tente novamente mais tarde.');
        }
      }
    )
  }

  excluirEquipamento(){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o equipamento ${this.equipamento.patrimonio} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.equipamentosService.excluirEquipamento(this.equipamentoId).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Equipamento excluído com sucesso!');
            this.voltar();
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

  get equipamentoObjeto(){
    const equipamento = this.equipamentoForm.getRawValue();
    equipamento.colaboradorId = equipamento.colaboradorId?.id;

    return equipamento;
  }

  vincularLicenca(){
    const dialogRef = this.dialog.open(ModalVincularLicencaComponent, {
      width: '800px',
      data: this.equipamentoId
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.obterEquipamentoDetalhes();
      }
    });
  }

  desvincularLicenca(licenca: Licenca){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir a licença ${licenca.nome} do equipamento ${this.equipamento.patrimonio} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.licencasService.desvincularLicenca(licenca.id).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Licença excluída com sucesso!');
            this.obterEquipamentoDetalhes();
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

  voltar(){
    this.location.back();
  }
}
