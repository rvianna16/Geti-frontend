import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'colaboradores',
    loadChildren: () => import('./colaboradores/colaboradores.module').then(m => m.ColaboradoresModule)
  },
  {
    path: 'equipamentos',
    loadChildren: () => import('./equipamentos/equipamentos.module').then(m => m.EquipamentosModule)
  },
  {
    path: 'licencas',
    loadChildren: () => import('./licencas/licencas.module').then(m => m.LicencasModule)
  },
  {
    path: 'softwares',
    loadChildren: () => import('./softwares/softwares.module').then(m => m.SoftwaresModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
