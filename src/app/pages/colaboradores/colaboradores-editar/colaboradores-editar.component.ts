import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { Equipamento } from '../../equipamentos/models/equipamento';
import { Colaborador } from '../models/colaborador';
import { ColaboradoresService } from '../services/colaboradores.service';

@Component({
  selector: 'app-colaboradores-editar',
  templateUrl: './colaboradores-editar.component.html',
})

export class ColaboradoresEditarComponent implements OnInit {
  colaboradorId: string = '';
  colaborador!: Colaborador;
  colaboradorForm!: FormGroup;
  displayedColumns: string[] = ['patrimonio', 'tipoEquipamento', 'statusEquipamento', 'visualizar'];
  equipamentosDataSource = new MatTableDataSource<Equipamento>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private colaboradoresService: ColaboradoresService,
    private notificacoesService: NotificacoesService
    ) { }

  ngOnInit(): void {
    this.colaboradorId = history.state.state?.id;

    if(this.colaboradorId){
      this.inicializador();
    }else {
      this.voltar();
    }
  }

  inicializador(){
    this.obterDetalhesColaborador();
  }

  inicializarFormulario(){
    this.colaboradorForm = this.fb.group({
      nome: [this.colaborador.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: [this.colaborador.email, [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }

  obterDetalhesColaborador(){
    this.colaboradoresService.obterColaboradorEquipamentos(this.colaboradorId).subscribe((res) => {
      this.colaborador = res
      this.equipamentosDataSource = new MatTableDataSource(this.colaborador.equipamentos);
      this.inicializarFormulario();
    })
  }

  alterarColaborador(){
    const colaborador: Colaborador = {
      id: this.colaboradorId,
      nome: this.colaboradorForm.controls['nome'].value,
      email: this.colaboradorForm.controls['email'].value
    }
    this.colaboradoresService.alterarColaborador(this.colaboradorId, colaborador).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Colaborador alterado com sucesso!')
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel alterar o colaborador. Tente novamente mais tarde.');
        }
      }
    )
  }

  excluirColaborador(){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o colaborador ${this.colaborador.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.colaboradoresService.excluirColaborador(this.colaboradorId).subscribe(
          (sucess) => {
            this.notificacoesService.notificarSucesso('Colaborador excluído com sucesso!');
            this.voltar();
          },
          (error) => {
            if(error.status == 400){
              this.notificacoesService.notificarErro(error.error.errors[0]);
            }else {
              this.notificacoesService.notificarErro('Não foi possivel excluir o colaborador. Tente novamente mais tarde.');
            }
          });
      }
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

  visualizarEquipamento(equipamento: Equipamento){
    const navigationExtras: NavigationExtras = {
      state: {
        id: equipamento.id
      }
    }

    this.router.navigate(['equipamentos/editar'], {state: navigationExtras})
  }

  voltar(){
    this.router.navigate(['colaboradores']);
  }

}
