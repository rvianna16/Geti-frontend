import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { InvalidStateComponent } from './components/invalid-state/invalid-state.component';

@NgModule({
  declarations: [
    SearchComponent,
    ButtonComponent,
    LoaderComponent,
    NotificacaoComponent,
    ConfirmComponent,
    InvalidStateComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    ButtonComponent,
    LoaderComponent,
    NotificacaoComponent,
    InvalidStateComponent
  ]
})
export class SharedModule { }
