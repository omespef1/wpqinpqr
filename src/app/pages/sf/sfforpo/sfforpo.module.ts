import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfforpoComponent } from './sfforpo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
          MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';

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
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    SfforpoComponent,
    NewTableSearchComponent
  ],
  exports: [
    NewTableSearchComponent
  ]
})
export class SfforpoModule { }
