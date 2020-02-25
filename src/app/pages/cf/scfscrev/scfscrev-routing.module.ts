import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScfscrevComponent } from './scfscrev.component';

const routes: Routes = [
  {
    path: '',
    component: ScfscrevComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScfscrevRoutingModule { }
