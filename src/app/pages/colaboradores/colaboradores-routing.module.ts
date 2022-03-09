import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradoresEditarComponent } from './colaboradores-editar/colaboradores-editar.component';
import { ColaboradoresComponent } from './colaboradores.component';

const routes: Routes = [
  {
    path: '',
    component: ColaboradoresComponent
  },
  {
    path: 'editar',
    component: ColaboradoresEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradoresRoutingModule { }
