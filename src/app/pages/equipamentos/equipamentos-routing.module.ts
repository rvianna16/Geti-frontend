import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { EquipamentosEditarComponent } from './equipamentos-editar/equipamentos-editar.component';
import { EquipamentosComponent } from './equipamentos.component';

const routes: Routes = [
  {
    path: '',
    component: EquipamentosComponent
  },
  {
    path: 'novo',
    canActivate: [AuthGuard],
    component: EquipamentosEditarComponent
  },
  {
    path: 'editar',
    canActivate: [AuthGuard],
    component: EquipamentosEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EquipamentosRoutingModule { }
