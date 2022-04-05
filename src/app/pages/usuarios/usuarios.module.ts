import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ModalNovoUsuarioComponent } from './modais/modal-novo-usuario/modal-novo-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalAlterarSenhaComponent } from './modais/modal-alterar-senha/modal-alterar-senha.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    ModalNovoUsuarioComponent,
    ModalAlterarSenhaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
