import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwaresRoutingModule } from './softwares-routing.module';
import { SoftwaresComponent } from './softwares.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ModalNovoSoftwareComponent } from './modais/modal-novo-software/modal-novo-software.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SoftwaresComponent,
    ModalNovoSoftwareComponent
  ],
  imports: [
    CommonModule,
    SoftwaresRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class SoftwaresModule { }
