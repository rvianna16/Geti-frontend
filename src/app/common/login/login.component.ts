import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/security/auth.service';
import { NotificacoesService } from 'src/app/shared/services/notificacoes.service';
import { UsuarioService } from 'src/app/pages/usuarios/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private notificacoesService: NotificacoesService
  ) { }

  ngOnInit() {
    this.verificarUsuarioLogado();

    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }

  async verificarUsuarioLogado(){
    if(await this.authService.tokenIsValid()){
      this.router.navigate(['']);
    }
  }

  login(){
    this.usuarioService.login(this.loginForm.getRawValue()).subscribe((res) => {
      this.authService.setToken(res);
      this.router.navigate([''])
    },
    (error) => {
      if(error.status == 400){
        this.notificacoesService.notificarErro(error.error.errors[0]);
      }else {
        this.notificacoesService.notificarErro('Não foi possivel fazer o login. Tente novamente mais tarde.');
      }
    })
  }

}
