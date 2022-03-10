import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipamentosEditarComponent } from './equipamentos-editar/equipamentos-editar.component';
import { EquipamentosComponent } from './equipamentos.component';

const routes: Routes = [
  {
    path: '',
    component: EquipamentosComponent
  },
  {
    path: 'novo',
    component: EquipamentosEditarComponent
  },
  {
    path: 'editar',
    component: EquipamentosEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EquipamentosRoutingModule { }
