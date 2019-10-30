import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { XbauliqComponent } from './xbauliq.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

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
    NgxPaginationModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    SharedModule,
    NgxSpinnerModule
  ],
  declarations: [
    XbauliqComponent
  ],
})
export class XbauliqModule { }
