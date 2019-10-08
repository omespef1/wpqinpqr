import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { XbauliqComponent } from './xbauliq.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: XbauliqComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    RouterModule.forChild(routes),
  ],
  declarations: [
    XbauliqComponent
  ]
})
export class XbauliqModule { }
