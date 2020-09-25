import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuconsuComponent } from './suconsu.component';

const routes: Routes = [
  {
    path: '',
    component: SuconsuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuconsuRoutingModule { }
