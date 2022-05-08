import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicencasRoutingModule } from './licencas-routing.module';
import { LicencasComponent } from './licencas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { LicencasEditarComponent } from './licencas-editar/licencas-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    LicencasComponent,
    LicencasEditarComponent
  ],
  imports: [
    CommonModule,
    LicencasRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class LicencasModule { }
