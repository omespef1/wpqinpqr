import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuconapComponent } from './suconap.component';

const routes: Routes = [
  {
    path: '',
    component: SuconapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuconapRoutingModule { }
