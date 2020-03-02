import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfforpoComponent } from './sfforpo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
          MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
// import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';

import { NgxPaginationModule } from 'ngx-pagination';
import * as $ from 'jquery';

const routes: Routes = [
  {
    path: '',
    component: SfforpoComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    SharedModule    
  ],
  declarations: [
    SfforpoComponent,
    // NewTableSearchComponent
  ],
  exports: [
    // SharedModule
    // NewTableSearchComponent
  ]
})
export class SfforpoModule { }
