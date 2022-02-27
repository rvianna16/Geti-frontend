import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradoresRoutingModule } from './colaboradores-routing.module';
import { ColaboradoresComponent } from './colaboradores.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColaboradoresService } from './service/colaboradores.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ColaboradoresComponent],
  imports: [
    CommonModule,
    ColaboradoresRoutingModule,
    AngularMaterialModule,
    SharedModule,
    HttpClientModule
  ],
})
export class ColaboradoresModule { }
