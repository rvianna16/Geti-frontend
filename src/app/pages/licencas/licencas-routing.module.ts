import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicencasEditarComponent } from './licencas-editar/licencas-editar.component';
import { LicencasComponent } from './licencas.component';

const routes: Routes = [
  {
    path: '',
    component: LicencasComponent
  },
  {
    path: 'novo',
    component: LicencasEditarComponent
  },
  {
    path: 'editar',
    component: LicencasEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicencasRoutingModule { }
