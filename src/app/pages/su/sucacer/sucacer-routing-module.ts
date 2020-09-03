import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SucacerComponent } from './sucacer.component';

const routes: Routes = [
  {
    path: '',
   component: SucacerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucacerRoutingModule { }
