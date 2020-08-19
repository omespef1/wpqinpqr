import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { SfconsuComponent } from './sfconsu.component';

const routes: Routes = [
  {
    path: '',
   component: SfconsuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SfconsuRoutingModule { }
