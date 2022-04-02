import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './components/search/search.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { InvalidStateComponent } from './components/invalid-state/invalid-state.component';
import { LoaderService } from './services/loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './services/loader/loader-interceptor';

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
    FormsModule,
  ],
  exports: [
    SearchComponent,
    ButtonComponent,
    LoaderComponent,
    NotificacaoComponent,
    InvalidStateComponent
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
})
export class SharedModule { }
