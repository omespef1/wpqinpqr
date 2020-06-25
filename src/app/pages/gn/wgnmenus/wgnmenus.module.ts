import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WgnmenusComponent } from './wgnmenus.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WgnmenusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WgnmenusComponent
  ]
})
export class WgnmenusModule {


 }
