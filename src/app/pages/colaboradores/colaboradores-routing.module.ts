import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { ColaboradoresEditarComponent } from './colaboradores-editar/colaboradores-editar.component';
import { ColaboradoresComponent } from './colaboradores.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ColaboradoresComponent
  },
  {
    path: 'editar',
    canActivate: [AuthGuard],
    component: ColaboradoresEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradoresRoutingModule { }
