import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EemedsaComponent } from './eemedsa.component';

const routes: Routes = [
  {
    path: '',
    component: EemedsaComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    SharedModule,
    NgxSpinnerModule
  ],
  declarations: [
    EemedsaComponent
  ]
})
export class EemedsaModule { }
