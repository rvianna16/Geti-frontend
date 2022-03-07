import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { ColaboradoresService } from '../../service/colaboradores.service';

@Component({
  selector: 'app-modal-novo-colaborador',
  templateUrl: './modal-novo-colaborador.component.html',
})
export class ModalNovoColaboradorComponent implements OnInit {
  colaboradorForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalNovoColaboradorComponent>,
    private fb: FormBuilder,
    private colaboradoresService: ColaboradoresService,
    private notificacoesService: NotificacoesService
    ) { }

  ngOnInit(): void {
    this.inicializador();
  }

  inicializador() {
    this.colaboradorForm = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email]]
    })
  }

  salvarColaborador(){
    const colaborador = {
      nome: this.colaboradorForm.controls['nome'].value,
      email: this.colaboradorForm.controls['email'].value
    }

    this.colaboradoresService.salvarColaborador(colaborador).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Colaborador salvo com sucesso!')
        this.dialogRef.close('Done!');
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel adicionar o colaborador. Tente novamente mais tarde.');
        }
      }
    )
  }

  fecharModal(){
    this.dialogRef.close();
  }
}
