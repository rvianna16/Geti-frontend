import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'colaboradores',
    canActivate: [AuthGuard],
    loadChildren: () => import('./colaboradores/colaboradores.module').then(m => m.ColaboradoresModule)
  },
  {
    path: 'equipamentos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./equipamentos/equipamentos.module').then(m => m.EquipamentosModule)
  },
  {
    path: 'licencas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./licencas/licencas.module').then(m => m.LicencasModule)
  },
  {
    path: 'softwares',
    canActivate: [AuthGuard],
    loadChildren: () => import('./softwares/softwares.module').then(m => m.SoftwaresModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class PagesRoutingModule { }
