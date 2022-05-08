import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { RequireMatch } from 'src/app/shared/globals';

import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { Equipamento } from '../../equipamentos/models/equipamento';
import { Software } from '../../softwares/models/software';
import { SoftwaresService } from '../../softwares/services/softwares.service';
import { Licenca } from '../models/licencas';
import { LicencasService } from '../services/licencas.service';

@Component({
  selector: 'app-licencas-editar',
  templateUrl: './licencas-editar.component.html'
})

export class LicencasEditarComponent implements OnInit {
  licencaId: string = '';
  licenca!: Licenca;
  licencaForm!: FormGroup

  softwares: Software[] = [];
  softwaresFiltrados!: Observable<Software[]>;

  displayedColumns: string[] = ['patrimonio', 'tipoEquipamento', 'statusEquipamento'];
  equipamentosDataSource = new MatTableDataSource<Equipamento>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificacoesService: NotificacoesService,
    private licencasService: LicencasService,
    private softwaresService: SoftwaresService
  ) { }

  ngOnInit(): void {
    this.licencaId = history.state.state?.id

    if(this.router.url == '/licencas/editar' && !this.licencaId){
      this.voltar();
    }

    this.inicializador();
  }

  inicializador(){
    this.inicializarFormulario();
    this.obterSoftwares();

    if(this.licencaId){
      this.obterLicencaDetalhes();
    }
  }

  inicializarFormulario(){
    this.licencaForm = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      chave: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      dataExpiracao: [null],
      fornecedor: [null, Validators.maxLength(200)],
      quantidade: [0],
      disponivel: {value: 0, disabled: true},
      softwareId: [null, [Validators.required, RequireMatch]],
      ativo: [true],
      descricao: [null, Validators.maxLength(2000)]
    })
  }

  obterLicencaDetalhes(){
    this.licencasService.obterLicencaDetalhes(this.licencaId).subscribe((licenca: Licenca) => {
      this.licenca = licenca;
      this.licencaForm.patchValue(licenca)
      this.equipamentosDataSource = new MatTableDataSource(licenca.equipamentos);

      //Vínculo do Software ID-Nome para exibição do AutoComplete
      const software = {
        id: this.licenca.softwareId,
        nome: this.licenca.software
      }

      this.licencaForm.controls['softwareId'].patchValue(software)
    })
  }

  obterSoftwares(){
    this.softwaresService.obterSoftwares().subscribe((res: Software[]) => {
      this.softwares = res;
      this.setupAutoComplete();
    });
  }

  setupAutoComplete(){
    this.softwaresFiltrados = this.licencaForm.controls['softwareId'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nome)),
      map(nome => (nome ? this._filter(nome) : this.softwares.slice())),
    );
  }

  private _filter(nome: string): Software[] {
    const filterValue = nome.toLowerCase();

    return this.softwares.filter(software => software.nome.toLowerCase().includes(filterValue));
  }

  displayFn(software: Software): string {
    if(software){
      return software.nome
    }

    return ''
  }

  salvarLicenca(){
    this.licencasService.salvarLicenca(this.licencaObjeto).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Licença salva com sucesso!')
        this.voltar();
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel adicionar a licença. Tente novamente mais tarde.');
        }
      }
    )
  }

  alterarLicenca(){
    const licenca = this.licencaObjeto;
    licenca.Id = this.licencaId;

    this.licencasService.alterarLicenca(this.licencaId, licenca).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Licença alterada com sucesso!')
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel alterar a licença. Tente novamente mais tarde.');
        }
      }
    )
  }

  excluirLicenca(){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir a licença ${this.licenca.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.licencasService.excluirLicenca(this.licencaId).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Licença excluída com sucesso!');
            this.voltar();
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

  get licencaObjeto(){
    const licenca = this.licencaForm.getRawValue();
    licenca.softwareId = licenca.softwareId?.id;

    return licenca;
  }

  handleStatusEquipamento(equipamento: Equipamento) {
    if(equipamento.statusEquipamento == 'EmUso'){
      return 'Em Uso'
    }else if(equipamento.statusEquipamento == 'EmDescarte') {
      return 'Em Descarte'
    }
    return equipamento.statusEquipamento
  }

  voltar(){
    this.router.navigate(['licencas']);
  }
}
