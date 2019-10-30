import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PqestadComponent } from './pqestad.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
// import { ChartsModule } from 'ng2-charts';

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
    SharedModule,
    // ChartsModule
  ],
  declarations: [
    PqestadComponent
  ],
})
export class PqestadModule { }
