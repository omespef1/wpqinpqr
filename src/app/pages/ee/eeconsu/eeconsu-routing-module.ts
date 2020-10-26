import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EeconsuComponent } from './eeconsu.component';

const routes: Routes = [
  {
    path: '',
   component: EeconsuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EeconsuRoutingModule { }
