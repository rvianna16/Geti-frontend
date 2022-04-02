import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { SoftwaresEditarComponent } from './softwares-editar/softwares-editar.component';
import { SoftwaresComponent } from './softwares.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: SoftwaresComponent
  },
  {
    path: 'editar',
    canActivate: [AuthGuard],
    component: SoftwaresEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwaresRoutingModule { }
