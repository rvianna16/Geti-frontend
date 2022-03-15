import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoftwaresEditarComponent } from './softwares-editar/softwares-editar.component';
import { SoftwaresComponent } from './softwares.component';

const routes: Routes = [
  {
    path: '',
    component: SoftwaresComponent
  },
  {
    path: 'editar',
    component: SoftwaresEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwaresRoutingModule { }
