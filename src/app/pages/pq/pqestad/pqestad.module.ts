import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PqestadComponent } from './pqestad.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PqestadComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    SharedModule
  ],
  declarations: [
    PqestadComponent
  ],
})
export class PqestadModule { }
