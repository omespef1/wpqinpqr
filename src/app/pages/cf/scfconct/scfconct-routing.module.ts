import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { ScfconctComponent } from './scfconct.component';

const routes: Routes = [
  {
    path: '',
   component: ScfconctComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScfconctRoutingModule { }
