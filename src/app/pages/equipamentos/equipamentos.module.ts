import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipamentosRoutingModule } from './equipamentos-routing.module';
import { EquipamentosComponent } from './equipamentos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [EquipamentosComponent],
  imports: [
    CommonModule,
    EquipamentosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    NgxMaskModule.forChild()
  ]
})
export class EquipamentosModule { }
