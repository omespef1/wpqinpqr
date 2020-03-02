import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScfscrevRoutingModule } from './scfscrev-routing.module';
import { ScfscrevComponent } from './scfscrev.component';
import { FormsModule } from "@angular/forms";
import { MatInputModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { NgxPaginationModule } from "ngx-pagination";
import { NewTableSearchComponent } from "src/app/components/tools/new-table-search/new-table-search.component";




@NgModule({
  imports: [
    CommonModule,
    ScfscrevRoutingModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
   declarations: [ScfscrevComponent, NewTableSearchComponent]
})
export class ScfscrevModule { }
