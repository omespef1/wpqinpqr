import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SarcaceaComponent } from './sarcacea.component';

const routes: Routes = [
  {
    path: '',
   component: SarcaceaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SarcaceaRoutingModule { }
