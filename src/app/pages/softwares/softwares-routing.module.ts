import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoftwaresComponent } from './softwares.component';

const routes: Routes = [
  {
    path: '',
    component: SoftwaresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwaresRoutingModule { }
