import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-modal-novo-usuario',
  templateUrl: './modal-novo-usuario.component.html'
})

export class ModalNovoUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificacoesService: NotificacoesService,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<ModalNovoUsuarioComponent>,
  ) { }

  ngOnInit(): void {
    this.inicializador();
  }

  inicializador(){
    this.usuarioForm = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(50)]],
      senha: [null, Validators.required],
      confirmacaoSenha: [null, Validators.required]
    })
  }

  salvarUsuario(){
    const senha = this.usuarioForm.controls['senha'].value;
    const confirmacaoSenha = this.usuarioForm.controls['confirmacaoSenha'].value;

    if(senha !== confirmacaoSenha){
      this.notificacoesService.notificarErro("As senhas não coincidem. Por favor verifique.");
    }else {
      this.usuarioService.salvarUsuario(this.usuarioForm.getRawValue()).subscribe(
        (sucess) => {
          this.notificacoesService.notificarSucesso('Usuário salvo com sucesso!')
          this.dialogRef.close('Done!');
        },
        (error) => {
          if(error.status == 400){
            this.notificacoesService.notificarErro(error.error.errors[0]);
          }else {
            this.notificacoesService.notificarErro('Não foi possivel adicionar o usuário. Tente novamente mais tarde.');
          }
        }
      )
    }
  }

  fecharModal(){
    this.dialogRef.close();
  }
}
