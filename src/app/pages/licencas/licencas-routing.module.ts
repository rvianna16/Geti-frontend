import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { LicencasEditarComponent } from './licencas-editar/licencas-editar.component';
import { LicencasComponent } from './licencas.component';

const routes: Routes = [
  {
    path: '',
    component: LicencasComponent
  },
  {
    path: 'novo',
    canActivate: [AuthGuard],
    component: LicencasEditarComponent
  },
  {
    path: 'editar',
    canActivate: [AuthGuard],
    component: LicencasEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicencasRoutingModule { }
