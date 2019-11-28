import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TrazabilidadComponent } from './trazabilidad.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelService } from 'src/app/services/pq/pqestad/excel.service';

const routes: Routes = [
  {
    path: '',
    component: TrazabilidadComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  declarations: [
    TrazabilidadComponent
  ],

  providers: [ExcelService]

})
export class TrazabilidadModule { }
