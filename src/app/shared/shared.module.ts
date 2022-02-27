import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    SearchComponent,
    ButtonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    ButtonComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
