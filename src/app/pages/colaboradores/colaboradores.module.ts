import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradoresRoutingModule } from './colaboradores-routing.module';
import { ColaboradoresComponent } from './colaboradores.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalNovoColaboradorComponent } from './modais/modal-novo-colaborador/modal-novo-colaborador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [ColaboradoresComponent, ModalNovoColaboradorComponent],
  imports: [
    CommonModule,
    ColaboradoresRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    HttpClientModule,
    NgxMaskModule.forChild()

  ],
})
export class ColaboradoresModule { }
