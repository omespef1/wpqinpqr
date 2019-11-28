import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfforpoComponent } from './sfforpo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: SfforpoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatDatepickerModule
  ],
  declarations: [
    SfforpoComponent
  ]
})
export class SfforpoModule { }
