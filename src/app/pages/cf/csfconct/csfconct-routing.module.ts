import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CsfconctComponent } from './csfconct.component';

const routes: Routes = [
  {
    path: '',
   component: CsfconctComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsfconctRoutingModule { }
