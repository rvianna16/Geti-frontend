import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { UsuarioService } from '../../services/usuario.service';

interface UsuarioModal {
  nome: string;
  id: string;
}

@Component({
  selector: 'app-modal-alterar-senha',
  templateUrl: './modal-alterar-senha.component.html'
})

export class ModalAlterarSenhaComponent implements OnInit {
  usuario!: UsuarioModal;
  usuarioForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private notificacoesService: NotificacoesService,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<ModalAlterarSenhaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.usuario = {
      id: this.data.id,
      nome: this.data.nome
    }
   this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.usuarioForm = this.fb.group({
      senha: [null, Validators.required],
      confirmacaoSenha: [null, Validators.required]
    })
  }

  alterarSenha(){
    this.usuarioService.alterarSenhaUsuario(this.usuario.id, this.usuarioForm.getRawValue()).subscribe(
      (sucess) => {
        this.notificacoesService.notificarSucesso('Senha alterada com sucesso!')
        this.dialogRef.close('Done!');
      },
      (error) => {
        if(error.status == 400){
          this.notificacoesService.notificarErro(error.error.errors[0]);
        }else {
          this.notificacoesService.notificarErro('Não foi possivel alterar a senha. Tente novamente mais tarde.');
        }
      }
    )
  }

  fecharModal(){
    this.dialogRef.close();
  }

}
