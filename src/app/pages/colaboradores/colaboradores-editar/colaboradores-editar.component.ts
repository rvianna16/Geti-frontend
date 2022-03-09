import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { Colaborador } from '../models/colaborador';
import { ColaboradoresService } from '../service/colaboradores.service';

@Component({
  selector: 'app-colaboradores-editar',
  templateUrl: './colaboradores-editar.component.html',
})

export class ColaboradoresEditarComponent implements OnInit {
  idColaborador: string = '';
  colaborador!: Colaborador;
  colaboradorForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private colaboradoresService: ColaboradoresService,
    private notificacoesService: NotificacoesService
    ) { }

  ngOnInit(): void {
    this.idColaborador = history.state.state?.id;

    if(this.idColaborador){
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
    this.colaboradoresService.obterColaboradorEquipamentos(this.idColaborador).subscribe((res) => {
      this.colaborador = res
      this.inicializarFormulario();
    })
  }

  salvarColaborador(){
    const colaborador: Colaborador = {
      id: this.idColaborador,
      nome: this.colaboradorForm.controls['nome'].value,
      email: this.colaboradorForm.controls['email'].value
    }
    this.colaboradoresService.alterarColaborador(this.idColaborador, colaborador).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Colaborador salvo com sucesso!')
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel salvar o colaborador. Tente novamente mais tarde.');
        }
      }
    )
  }

  excluirColaborador(){
    this.notificacoesService.addConfirmacao(`Tem certeza que deseja excluir o colaborador ${this.colaborador.nome} ?`).subscribe((estaConfirmado) => {
      if(estaConfirmado){
        this.colaboradoresService.removerColaborador(this.idColaborador).subscribe(
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

  voltar(){
    this.router.navigate(['colaboradores']);
  }

}
